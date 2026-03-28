import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseEnv } from "node:util";

const args = process.argv.slice(2);
const envFile = resolve(process.cwd(), ".env.local");
const raw = readFileSync(envFile, "utf8");
const entries = Object.entries(parseEnv(raw));
const vercelBin = resolve(
  process.cwd(),
  "node_modules/vercel/dist/vc.js",
);

function hasFlag(flag) {
  return args.includes(`--${flag}`);
}

function readFlagValue(flag, fallback) {
  const match = args.find((arg) => arg.startsWith(`--${flag}=`));

  if (!match) {
    return fallback;
  }

  return match.slice(flag.length + 3);
}

function readCsvFlag(flag, fallback) {
  const value = readFlagValue(flag, null);

  if (value === null) {
    return fallback;
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function runVercel(commandArgs, capture = false) {
  return execFileSync(process.execPath, [vercelBin, ...commandArgs], {
    stdio: capture
      ? ["ignore", "pipe", "pipe"]
      : "inherit",
    env: process.env,
  });
}

function listEnvNames(target) {
  const output = runVercel(["env", "ls", target], true).toString();
  const names = new Set();

  for (const line of output.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s+Encrypted\s+/);

    if (match) {
      names.add(match[1]);
    }
  }

  return names;
}

function buildEnvAddArgs(key, target, value) {
  const commandArgs = ["env", "add", key, target];

  if (target === "preview") {
    // Vercel CLI 50.x still expects a positional preview branch in non-interactive mode.
    // An empty branch argument means "all preview branches".
    commandArgs.push("");
  }

  commandArgs.push("--yes", "--force", "--value", value);
  return commandArgs;
}

const selectedKeys = new Set(readCsvFlag("keys", []));
const syncTargets = readCsvFlag("targets", ["development"]);
const verifyTargets = readCsvFlag("verify", ["preview", "production"]);
const pullTarget = readFlagValue("pull", "development");
const shouldPull = !hasFlag("no-pull");
const filteredEntries = entries.filter(([key]) => {
  if (key.startsWith("VERCEL_")) {
    return false;
  }

  return selectedKeys.size === 0 || selectedKeys.has(key);
});

if (entries.length === 0) {
  console.log("No environment variables found in .env.local");
  process.exit(0);
}

if (filteredEntries.length === 0) {
  console.log("No matching environment variables found for sync.");
  process.exit(0);
}

for (const [key, value] of filteredEntries) {
  for (const target of syncTargets) {
    console.log(`syncing ${key} -> ${target}`);
    runVercel(buildEnvAddArgs(key, target, value));
  }
}

if (verifyTargets.length > 0) {
  const missingByTarget = new Map(
    verifyTargets.map((target) => [target, []]),
  );

  for (const target of verifyTargets) {
    const names = listEnvNames(target);

    for (const [key] of filteredEntries) {
      if (!names.has(key)) {
        missingByTarget.get(target).push(key);
      }
    }
  }

  const missingTargets = [...missingByTarget.entries()].filter(
    ([, names]) => names.length > 0,
  );

  if (missingTargets.length > 0) {
    console.log("warning: some keys were not present in remote environments");

    for (const [target, names] of missingTargets) {
      console.log(`missing in ${target}: ${names.join(", ")}`);
    }
  }
}

if (shouldPull) {
  console.log(`pulling ${pullTarget} env back into .env.local`);
  runVercel(["env", "pull", ".env.local", "--environment", pullTarget, "--yes"]);
}
