import { CompanyGateway } from "../../gateway/company.gateway";
import { CompanyFilter } from "../../gateway/company.filter";
import { SearchParams } from "@/modules/@shared/repository/search-params";
import {
  FindAllCompaniesUseCaseInputDto,
  FindAllCompaniesUseCaseInterface,
  FindAllCompaniesUseCaseOutputDto,
} from "./find-all.usecase.dto";

export default class FindAllCompaniesUseCase implements FindAllCompaniesUseCaseInterface {
  constructor(private readonly companyGateway: CompanyGateway) {}

  async execute(
    data: FindAllCompaniesUseCaseInputDto,
  ): Promise<FindAllCompaniesUseCaseOutputDto> {
    const filter: CompanyFilter = {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.slug !== undefined && { slug: data.slug }),
      ...(data.active !== undefined && { active: data.active }),
    };

    const result = await this.companyGateway.search(
      new SearchParams<CompanyFilter>({
        page: data.page,
        perPage: data.perPage,
        sort: data.sort,
        sortDir: data.sortDir,
        filter,
      }),
    );

    return {
      items: result.items.map((company) => company.toJSON()),
      total: result.total,
      currentPage: result.currentPage,
      perPage: result.perPage,
      lastPage: result.lastPage,
    };
  }
}
