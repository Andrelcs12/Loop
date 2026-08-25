import { Transform } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, IsDateString } from "class-validator";

export class CreateTaskDto {
  @Transform(({ value }: { value: unknown }) => typeof value === "string" ? value.trim() : value)
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title!: string;

  @IsInt()
  @Min(1)
  @Max(1440)
  estimatedMinutes!: number;

  @IsIn(["LOW", "MEDIUM", "HIGH"])
  priority!: "LOW" | "MEDIUM" | "HIGH";

  @IsOptional()
  @IsDateString()
  deadline?: string;
}
