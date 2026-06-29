import { CompanyGateway } from "../../gateway/company.gateway";
import { Company } from "../../domain/company.entity";
import { NotFoundError } from "@/modules/@shared/domain/errors/not-found.error";
import { EntityValidationError } from "@/modules/@shared/domain/errors/validation.error";
import { normalizeSlug } from "@/modules/@shared/domain/utils/slug";
import {
  UpdateCompanyUseCaseInputDto,
  UpdateCompanyUseCaseInterface,
  UpdateCompanyUseCaseOutputDto,
} from "./update-company.usecase.dto";

export default class UpdateCompanyUseCase implements UpdateCompanyUseCaseInterface {
  constructor(private readonly companyGateway: CompanyGateway) {}

  async execute(
    data: UpdateCompanyUseCaseInputDto,
  ): Promise<UpdateCompanyUseCaseOutputDto> {
    const company = await this.companyGateway.findById(data.id);
    if (!company) {
      throw new NotFoundError(data.id, Company);
    }

    if (data.slug !== undefined && normalizeSlug(data.slug) !== company.slug) {
      const existing = await this.companyGateway.findBySlug(
        normalizeSlug(data.slug),
      );
      if (existing && existing.id !== company.id) {
        throw new EntityValidationError([
          { field: "slug", message: "Slug already in use" },
        ]);
      }
    }

    company.updateCompany({
      ...(data.name !== undefined && { name: data.name }),
      ...(data.slug !== undefined && { slug: data.slug }),
    });

    if (data.active === true) {
      company.activate();
    }
    if (data.active === false) {
      company.deactivate();
    }

    await this.companyGateway.update(company);

    return company.toJSON();
  }
}
