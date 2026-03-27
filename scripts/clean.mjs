import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const paths = [
  ".next",
  "out",
  "build",
  "coverage",
  "tsconfig.tsbuildinfo",
  "dev-server.log",
  "dev-server.err.log",
];

for (const target of paths) {
  await rm(resolve(process.cwd(), target), {
    force: true,
    recursive: true,
    maxRetries: 2,
  });
  console.log(`removed ${target}`);
}
