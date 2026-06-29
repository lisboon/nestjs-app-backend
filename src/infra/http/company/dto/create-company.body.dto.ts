import { Length, Matches } from "class-validator";

export class CreateCompanyBodyDto {
  @Length(2, 120, { message: "Name must be between 2 and 120 characters" })
  name: string;

  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be kebab-case (lowercase letters, numbers and hyphens)",
  })
  slug: string;
}
