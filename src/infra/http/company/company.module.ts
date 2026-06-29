import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CompaniesController } from "./companies.controller";
import { CompanyService } from "./company.service";
import CompanyFacade from "@/modules/company/facade/company.facade";
import CompanyFacadeFactory from "@/modules/company/factory/facade.factory";

@Module({
  imports: [AuthModule],
  controllers: [CompaniesController],
  providers: [
    CompanyService,
    {
      provide: CompanyFacade,
      useFactory: () => CompanyFacadeFactory.create(),
    },
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
