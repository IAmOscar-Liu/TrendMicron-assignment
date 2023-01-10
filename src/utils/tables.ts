import { CenturyType, MonthType } from "./types";

export const centuriesTable: Record<CenturyType, number> = {
  1700: 4,
  1800: 2,
  1900: 0,
  2000: 6,
  2100: 4,
};

export const monthsTable: Record<MonthType, { common: number, leap?: number }> = {
  1: { common: 0, leap: 6 },
  2: { common: 3, leap: 2 },
  3: { common: 3 },
  4: { common: 6 },
  5: { common: 1 },
  6: { common: 4 },
  7: { common: 6 },
  8: { common: 2 },
  9: { common: 5 },
  10: { common: 0 },
  11: { common: 3 },
  12: { common: 5 },
};
