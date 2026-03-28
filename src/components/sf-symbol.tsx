"use client";

import type { ComponentPropsWithoutRef } from "react";
import { SFArrowUpRight as DualtoneArrowUpRight } from "sf-symbols-lib/dualtone/SFArrowUpRight";
import { SFArrowRight as DualtoneArrowRight } from "sf-symbols-lib/dualtone/SFArrowRight";
import { SFCalendarCircleFill as DualtoneCalendarCircleFill } from "sf-symbols-lib/dualtone/SFCalendarCircleFill";
import { SFChartBarFill as DualtoneChartBarFill } from "sf-symbols-lib/dualtone/SFChartBarFill";
import { SFGearshapeFill as DualtoneGearshapeFill } from "sf-symbols-lib/dualtone/SFGearshapeFill";
import { SFHouseFill as DualtoneHouseFill } from "sf-symbols-lib/dualtone/SFHouseFill";
import { SFMoonStars as DualtoneMoonStars } from "sf-symbols-lib/dualtone/SFMoonStars";
import { SFPerson2Fill as DualtonePerson2Fill } from "sf-symbols-lib/dualtone/SFPerson2Fill";
import { SFRectanglePortraitAndArrowRight as DualtoneRectanglePortraitAndArrowRight } from "sf-symbols-lib/dualtone/SFRectanglePortraitAndArrowRight";
import { SFSparkles as DualtoneSparkles } from "sf-symbols-lib/dualtone/SFSparkles";
import { SFSquareGrid2x2Fill as DualtoneSquareGrid2x2Fill } from "sf-symbols-lib/dualtone/SFSquareGrid2x2Fill";
import { SFSunMax as DualtoneSunMax } from "sf-symbols-lib/dualtone/SFSunMax";
import { SFXmark as DualtoneXmark } from "sf-symbols-lib/dualtone/SFXmark";
import { SFArrowUpRight as MonochromeArrowUpRight } from "sf-symbols-lib/monochrome/SFArrowUpRight";
import { SFArrowRight as MonochromeArrowRight } from "sf-symbols-lib/monochrome/SFArrowRight";
import { SFCalendarCircleFill as MonochromeCalendarCircleFill } from "sf-symbols-lib/monochrome/SFCalendarCircleFill";
import { SFChartBarFill as MonochromeChartBarFill } from "sf-symbols-lib/monochrome/SFChartBarFill";
import { SFGearshapeFill as MonochromeGearshapeFill } from "sf-symbols-lib/monochrome/SFGearshapeFill";
import { SFHouseFill as MonochromeHouseFill } from "sf-symbols-lib/monochrome/SFHouseFill";
import { SFMoonStars as MonochromeMoonStars } from "sf-symbols-lib/monochrome/SFMoonStars";
import { SFPerson2Fill as MonochromePerson2Fill } from "sf-symbols-lib/monochrome/SFPerson2Fill";
import { SFRectanglePortraitAndArrowRight as MonochromeRectanglePortraitAndArrowRight } from "sf-symbols-lib/monochrome/SFRectanglePortraitAndArrowRight";
import { SFSparkles as MonochromeSparkles } from "sf-symbols-lib/monochrome/SFSparkles";
import { SFSquareGrid2x2Fill as MonochromeSquareGrid2x2Fill } from "sf-symbols-lib/monochrome/SFSquareGrid2x2Fill";
import { SFSunMax as MonochromeSunMax } from "sf-symbols-lib/monochrome/SFSunMax";
import { SFXmark as MonochromeXmark } from "sf-symbols-lib/monochrome/SFXmark";

const dualtoneSymbols = {
  "arrow-right": DualtoneArrowRight,
  "arrow-up-right": DualtoneArrowUpRight,
  "calendar-circle-fill": DualtoneCalendarCircleFill,
  "chart-bar-fill": DualtoneChartBarFill,
  "gearshape-fill": DualtoneGearshapeFill,
  "house-fill": DualtoneHouseFill,
  "moon-stars": DualtoneMoonStars,
  "person-2-fill": DualtonePerson2Fill,
  "rectangle-portrait-and-arrow-right": DualtoneRectanglePortraitAndArrowRight,
  sparkles: DualtoneSparkles,
  "square-grid-2x2-fill": DualtoneSquareGrid2x2Fill,
  "sun-max": DualtoneSunMax,
  xmark: DualtoneXmark,
} as const;

const monochromeSymbols = {
  "arrow-right": MonochromeArrowRight,
  "arrow-up-right": MonochromeArrowUpRight,
  "calendar-circle-fill": MonochromeCalendarCircleFill,
  "chart-bar-fill": MonochromeChartBarFill,
  "gearshape-fill": MonochromeGearshapeFill,
  "house-fill": MonochromeHouseFill,
  "moon-stars": MonochromeMoonStars,
  "person-2-fill": MonochromePerson2Fill,
  "rectangle-portrait-and-arrow-right": MonochromeRectanglePortraitAndArrowRight,
  sparkles: MonochromeSparkles,
  "square-grid-2x2-fill": MonochromeSquareGrid2x2Fill,
  "sun-max": MonochromeSunMax,
  xmark: MonochromeXmark,
} as const;

export type SfSymbolName = keyof typeof dualtoneSymbols;
export type SfSymbolVariant = "dualtone" | "monochrome";

type SharedIconProps = ComponentPropsWithoutRef<typeof DualtoneSparkles>;

export type SfSymbolProps = SharedIconProps & {
  name: SfSymbolName;
  variant?: SfSymbolVariant;
};

export function SfSymbol({
  name,
  variant = "monochrome",
  ...props
}: SfSymbolProps) {
  const Icon = variant === "dualtone" ? dualtoneSymbols[name] : monochromeSymbols[name];
  const ariaLabel = props["aria-label"];
  const ariaHidden = props["aria-hidden"] ?? (ariaLabel ? undefined : true);

  return <Icon {...props} aria-hidden={ariaHidden} aria-label={ariaLabel} />;
}
