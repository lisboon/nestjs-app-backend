import { CompanyGateway } from "../../gateway/company.gateway";
import { Company } from "../../domain/company.entity";
import { EntityValidationError } from "@/modules/@shared/domain/errors/validation.error";
import { normalizeSlug } from "@/modules/@shared/domain/utils/slug";
import {
  CreateCompanyUseCaseInputDto,
  CreateCompanyUseCaseInterface,
  CreateCompanyUseCaseOutputDto,
} from "./create-company.usecase.dto";

export default class CreateCompanyUseCase implements CreateCompanyUseCaseInterface {
  constructor(private readonly companyGateway: CompanyGateway) {}

  async execute(
    data: CreateCompanyUseCaseInputDto,
  ): Promise<CreateCompanyUseCaseOutputDto> {
    const existing = await this.companyGateway.findBySlug(
      normalizeSlug(data.slug),
    );
    if (existing) {
      throw new EntityValidationError([
        { field: "slug", message: "Slug already in use" },
      ]);
    }

    const company = Company.create({
      name: data.name,
      slug: data.slug,
    });

    await this.companyGateway.create(company);

    return company.toJSON();
  }
}
