import { Inject, Injectable } from "@nestjs/common";
import CompanyFacade from "@/modules/company/facade/company.facade";
import {
  FindCompanyByIdFacadeInputDto,
  FindAllCompaniesFacadeInputDto,
  CreateCompanyFacadeInputDto,
  UpdateCompanyFacadeInputDto,
  DeleteCompanyFacadeInputDto,
} from "@/modules/company/facade/company.facade.dto";

@Injectable()
export class CompanyService {
  @Inject(CompanyFacade)
  private readonly companyFacade: CompanyFacade;

  async findById(input: FindCompanyByIdFacadeInputDto) {
    return this.companyFacade.findById(input);
  }

  async findAll(input: FindAllCompaniesFacadeInputDto) {
    return this.companyFacade.findAll(input);
  }

  async create(input: CreateCompanyFacadeInputDto) {
    return this.companyFacade.create(input);
  }

  async update(input: UpdateCompanyFacadeInputDto) {
    return this.companyFacade.update(input);
  }

  async delete(input: DeleteCompanyFacadeInputDto) {
    return this.companyFacade.delete(input);
  }
}
