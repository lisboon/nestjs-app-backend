import { Length, Matches } from "class-validator";
import BaseUseCase from "@/modules/@shared/usecase/base.usecase";

export class CreateCompanyUseCaseInputDto {
  @Length(2, 120, { message: "Name must be between 2 and 120 characters" })
  name: string;

  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be kebab-case (lowercase letters, numbers and hyphens)",
  })
  slug: string;
}

export interface CreateCompanyUseCaseOutputDto {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateCompanyUseCaseInterface extends BaseUseCase<
  CreateCompanyUseCaseInputDto,
  CreateCompanyUseCaseOutputDto
> {
  execute(
    data: CreateCompanyUseCaseInputDto,
  ): Promise<CreateCompanyUseCaseOutputDto>;
}
