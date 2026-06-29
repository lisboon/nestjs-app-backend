import { FindCompanyByIdUseCaseInputDto } from "../usecase/find-by-id/find-by-id.usecase.dto";
import {
  FindAllCompaniesUseCaseInputDto,
  FindAllCompaniesUseCaseOutputDto,
} from "../usecase/find-all/find-all.usecase.dto";
import {
  CreateCompanyUseCaseInputDto,
  CreateCompanyUseCaseOutputDto,
} from "../usecase/create-company/create-company.usecase.dto";
import {
  UpdateCompanyUseCaseInputDto,
  UpdateCompanyUseCaseOutputDto,
} from "../usecase/update-company/update-company.usecase.dto";
import {
  DeleteCompanyUseCaseInputDto,
  DeleteCompanyUseCaseOutputDto,
} from "../usecase/delete-company/delete-company.usecase.dto";

export type FindCompanyByIdFacadeInputDto = FindCompanyByIdUseCaseInputDto;
export interface FindCompanyByIdFacadeOutputDto {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type FindAllCompaniesFacadeInputDto = FindAllCompaniesUseCaseInputDto;
export type FindAllCompaniesFacadeOutputDto = FindAllCompaniesUseCaseOutputDto;

export type CreateCompanyFacadeInputDto = CreateCompanyUseCaseInputDto;
export type CreateCompanyFacadeOutputDto = CreateCompanyUseCaseOutputDto;

export type UpdateCompanyFacadeInputDto = UpdateCompanyUseCaseInputDto;
export type UpdateCompanyFacadeOutputDto = UpdateCompanyUseCaseOutputDto;

export type DeleteCompanyFacadeInputDto = DeleteCompanyUseCaseInputDto;
export type DeleteCompanyFacadeOutputDto = DeleteCompanyUseCaseOutputDto;

export interface CompanyFacadeInterface {
  findById(
    data: FindCompanyByIdFacadeInputDto,
  ): Promise<FindCompanyByIdFacadeOutputDto>;
  findAll(
    data: FindAllCompaniesFacadeInputDto,
  ): Promise<FindAllCompaniesFacadeOutputDto>;
  create(
    data: CreateCompanyFacadeInputDto,
  ): Promise<CreateCompanyFacadeOutputDto>;
  update(
    data: UpdateCompanyFacadeInputDto,
  ): Promise<UpdateCompanyFacadeOutputDto>;
  delete(
    data: DeleteCompanyFacadeInputDto,
  ): Promise<DeleteCompanyFacadeOutputDto>;
}
