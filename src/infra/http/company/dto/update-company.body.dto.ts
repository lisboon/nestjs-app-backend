import { IsBoolean, IsOptional, Length, Matches } from "class-validator";

export class UpdateCompanyBodyDto {
  @IsOptional()
  @Length(2, 120, { message: "Name must be between 2 and 120 characters" })
  name?: string;

  @IsOptional()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be kebab-case (lowercase letters, numbers and hyphens)",
  })
  slug?: string;

  @IsOptional()
  @IsBoolean({ message: "Active must be a boolean" })
  active?: boolean;
}
