import { FindCompanyByIdUseCaseInterface } from "../usecase/find-by-id/find-by-id.usecase.dto";
import { FindAllCompaniesUseCaseInterface } from "../usecase/find-all/find-all.usecase.dto";
import { CreateCompanyUseCaseInterface } from "../usecase/create-company/create-company.usecase.dto";
import { UpdateCompanyUseCaseInterface } from "../usecase/update-company/update-company.usecase.dto";
import { DeleteCompanyUseCaseInterface } from "../usecase/delete-company/delete-company.usecase.dto";
import {
  CompanyFacadeInterface,
  FindCompanyByIdFacadeInputDto,
  FindCompanyByIdFacadeOutputDto,
  FindAllCompaniesFacadeInputDto,
  FindAllCompaniesFacadeOutputDto,
  CreateCompanyFacadeInputDto,
  CreateCompanyFacadeOutputDto,
  UpdateCompanyFacadeInputDto,
  UpdateCompanyFacadeOutputDto,
  DeleteCompanyFacadeInputDto,
  DeleteCompanyFacadeOutputDto,
} from "./company.facade.dto";

export default class CompanyFacade implements CompanyFacadeInterface {
  constructor(
    private readonly findCompanyByIdUseCase: FindCompanyByIdUseCaseInterface,
    private readonly findAllCompaniesUseCase: FindAllCompaniesUseCaseInterface,
    private readonly createCompanyUseCase: CreateCompanyUseCaseInterface,
    private readonly updateCompanyUseCase: UpdateCompanyUseCaseInterface,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCaseInterface,
  ) {}

  async findById(
    data: FindCompanyByIdFacadeInputDto,
  ): Promise<FindCompanyByIdFacadeOutputDto> {
    const company = await this.findCompanyByIdUseCase.execute(data);
    return company.toJSON();
  }

  async findAll(
    data: FindAllCompaniesFacadeInputDto,
  ): Promise<FindAllCompaniesFacadeOutputDto> {
    return this.findAllCompaniesUseCase.execute(data);
  }

  async create(
    data: CreateCompanyFacadeInputDto,
  ): Promise<CreateCompanyFacadeOutputDto> {
    return this.createCompanyUseCase.execute(data);
  }

  async update(
    data: UpdateCompanyFacadeInputDto,
  ): Promise<UpdateCompanyFacadeOutputDto> {
    return this.updateCompanyUseCase.execute(data);
  }

  async delete(
    data: DeleteCompanyFacadeInputDto,
  ): Promise<DeleteCompanyFacadeOutputDto> {
    return this.deleteCompanyUseCase.execute(data);
  }
}
