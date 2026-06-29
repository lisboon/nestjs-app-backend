import { CompanyGateway } from "../../gateway/company.gateway";
import { Company } from "../../domain/company.entity";
import { NotFoundError } from "@/modules/@shared/domain/errors/not-found.error";
import {
  FindCompanyByIdUseCaseInputDto,
  FindCompanyByIdUseCaseInterface,
  FindCompanyByIdUseCaseOutputDto,
} from "./find-by-id.usecase.dto";

export default class FindCompanyByIdUseCase implements FindCompanyByIdUseCaseInterface {
  constructor(private readonly companyGateway: CompanyGateway) {}

  async execute(
    data: FindCompanyByIdUseCaseInputDto,
  ): Promise<FindCompanyByIdUseCaseOutputDto> {
    const company = await this.companyGateway.findById(data.id);
    if (!company) {
      throw new NotFoundError(data.id, Company);
    }
    return company;
  }
}
