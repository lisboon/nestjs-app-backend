import { IsUUID } from "class-validator";
import BaseUseCase from "@/modules/@shared/usecase/base.usecase";
import { Company } from "../../domain/company.entity";

export class FindCompanyByIdUseCaseInputDto {
  @IsUUID(4, { message: "Invalid company id" })
  id: string;
}

export type FindCompanyByIdUseCaseOutputDto = Company;

export interface FindCompanyByIdUseCaseInterface extends BaseUseCase<
  FindCompanyByIdUseCaseInputDto,
  FindCompanyByIdUseCaseOutputDto
> {
  execute(
    data: FindCompanyByIdUseCaseInputDto,
  ): Promise<FindCompanyByIdUseCaseOutputDto>;
}
