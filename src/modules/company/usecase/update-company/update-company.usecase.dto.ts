import {
  IsBoolean,
  IsOptional,
  IsUUID,
  Length,
  Matches,
} from "class-validator";
import BaseUseCase from "@/modules/@shared/usecase/base.usecase";

export class UpdateCompanyUseCaseInputDto {
  @IsUUID(4, { message: "Invalid company id" })
  id: string;

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

export interface UpdateCompanyUseCaseOutputDto {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface UpdateCompanyUseCaseInterface extends BaseUseCase<
  UpdateCompanyUseCaseInputDto,
  UpdateCompanyUseCaseOutputDto
> {
  execute(
    data: UpdateCompanyUseCaseInputDto,
  ): Promise<UpdateCompanyUseCaseOutputDto>;
}
