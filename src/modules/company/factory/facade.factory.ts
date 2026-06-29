import prisma from "@/infra/database/prisma.instance";
import { PrismaTransactionManager } from "@/infra/database/prisma-transaction.manager";
import CompanyRepository from "../repository/company.repository";
import UserRepository from "@/modules/user/repository/user.repository";
import FindCompanyByIdUseCase from "../usecase/find-by-id/find-by-id.usecase";
import FindAllCompaniesUseCase from "../usecase/find-all/find-all.usecase";
import CreateCompanyUseCase from "../usecase/create-company/create-company.usecase";
import UpdateCompanyUseCase from "../usecase/update-company/update-company.usecase";
import DeleteCompanyUseCase from "../usecase/delete-company/delete-company.usecase";
import CompanyFacade from "../facade/company.facade";

export default class CompanyFacadeFactory {
  static create(): CompanyFacade {
    const companyRepository = new CompanyRepository(prisma);
    const userRepository = new UserRepository(prisma);
    const transactionManager = new PrismaTransactionManager(prisma);

    return new CompanyFacade(
      new FindCompanyByIdUseCase(companyRepository),
      new FindAllCompaniesUseCase(companyRepository),
      new CreateCompanyUseCase(companyRepository),
      new UpdateCompanyUseCase(companyRepository),
      new DeleteCompanyUseCase(
        transactionManager,
        companyRepository,
        userRepository,
      ),
    );
  }
}
