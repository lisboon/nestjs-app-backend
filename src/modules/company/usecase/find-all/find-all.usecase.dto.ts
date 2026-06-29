import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import BaseUseCase from "@/modules/@shared/usecase/base.usecase";
import { SortDirection } from "@/modules/@shared/repository/search-params";

export class FindAllCompaniesUseCaseInputDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Page must be an integer" })
  @Min(1, { message: "Page must be at least 1" })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "PerPage must be an integer" })
  @Min(1, { message: "PerPage must be at least 1" })
  perPage?: number;

  @IsOptional()
  @IsString({ message: "Sort must be a string" })
  sort?: string;

  @IsOptional()
  @IsIn(["asc", "desc"], { message: "SortDir must be asc or desc" })
  sortDir?: SortDirection;

  @IsOptional()
  @IsString({ message: "Name must be a string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "Slug must be a string" })
  slug?: string;

  @IsOptional()
  @IsIn(["true", "false"], { message: "Active must be true or false" })
  active?: string;
}

export interface FindAllCompaniesUseCaseOutputDto {
  items: Array<{
    id: string;
    name: string;
    slug: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }>;
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
}

export interface FindAllCompaniesUseCaseInterface extends BaseUseCase<
  FindAllCompaniesUseCaseInputDto,
  FindAllCompaniesUseCaseOutputDto
> {
  execute(
    data: FindAllCompaniesUseCaseInputDto,
  ): Promise<FindAllCompaniesUseCaseOutputDto>;
}
