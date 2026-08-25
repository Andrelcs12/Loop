import { IsIn, IsInt, IsOptional, Max, Min } from "class-validator";

import { AVAILABLE_TIME_VALUES, ROUTINE_PERIODS, SETUP_GOALS, type AvailableTimeValue, type RoutinePeriodValue, type SetupGoalValue } from "./setup-values";

export class UpdateSetupDto {
  @IsOptional()
  @IsIn(SETUP_GOALS)
  goal?: SetupGoalValue;

  @IsOptional()
  @IsIn(ROUTINE_PERIODS)
  routine?: RoutinePeriodValue;

  @IsOptional()
  @IsIn(AVAILABLE_TIME_VALUES)
  availableTime?: AvailableTimeValue;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  currentStep?: number;
}
