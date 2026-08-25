import { Transform } from "class-transformer";
import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => typeof value === "string" ? value.trim() : value)
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1440)
  estimatedMinutes?: number;

  @IsOptional()
  @IsIn(["LOW", "MEDIUM", "HIGH"])
  priority?: "LOW" | "MEDIUM" | "HIGH";

  @IsOptional()
  @IsDateString()
  deadline?: string;
}
