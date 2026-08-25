export const SETUP_GOALS = ["PRODUCTIVITY", "STUDY", "HEALTHY_HABITS", "MORE_FREE_TIME", "LIFE_ORGANIZATION"] as const;
export const ROUTINE_PERIODS = ["MORNING", "AFTERNOON", "EVENING", "ALL_DAY"] as const;
export const AVAILABLE_TIME_VALUES = ["UNDER_30_MINUTES", "FROM_30_TO_60_MINUTES", "FROM_1_TO_2_HOURS", "OVER_2_HOURS"] as const;

export type SetupGoalValue = (typeof SETUP_GOALS)[number];
export type RoutinePeriodValue = (typeof ROUTINE_PERIODS)[number];
export type AvailableTimeValue = (typeof AVAILABLE_TIME_VALUES)[number];
