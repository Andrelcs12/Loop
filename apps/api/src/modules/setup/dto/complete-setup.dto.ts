import { Type } from "class-transformer";
import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";

import { AVAILABLE_TIME_VALUES, ROUTINE_PERIODS, SETUP_GOALS, type AvailableTimeValue, type RoutinePeriodValue, type SetupGoalValue } from "./setup-values";

class InitialCommitmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title!: string;

  @IsDateString()
  startsAt!: string;
}

export class CompleteSetupDto {
  @IsIn(SETUP_GOALS)
  goal!: SetupGoalValue;

  @IsIn(ROUTINE_PERIODS)
  routine!: RoutinePeriodValue;

  @IsIn(AVAILABLE_TIME_VALUES)
  availableTime!: AvailableTimeValue;

  @IsOptional()
  @ValidateNested()
  @Type(() => InitialCommitmentDto)
  initialCommitment?: InitialCommitmentDto;
}
