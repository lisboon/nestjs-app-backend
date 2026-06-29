import { Company } from "../domain/company.entity";
import { CompanyFilter } from "./company.filter";
import { SearchParams } from "@/modules/@shared/repository/search-params";
import { SearchResult } from "@/modules/@shared/repository/search-result";
import { TransactionContext } from "@/modules/@shared/domain/transaction/transaction-manager.interface";

export interface CompanyGateway {
  findById(id: string): Promise<Company | null>;
  findBySlug(slug: string): Promise<Company | null>;
  search(params: SearchParams<CompanyFilter>): Promise<SearchResult<Company>>;
  create(company: Company, trx?: TransactionContext): Promise<void>;
  update(company: Company, trx?: TransactionContext): Promise<void>;
}
