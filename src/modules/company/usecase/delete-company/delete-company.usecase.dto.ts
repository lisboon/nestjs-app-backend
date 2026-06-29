import { IsUUID } from "class-validator";
import BaseUseCase from "@/modules/@shared/usecase/base.usecase";

export class DeleteCompanyUseCaseInputDto {
  @IsUUID(4, { message: "Invalid company id" })
  id: string;
}

export interface DeleteCompanyUseCaseOutputDto {
  id: string;
  deletedAt: Date;
}

export interface DeleteCompanyUseCaseInterface extends BaseUseCase<
  DeleteCompanyUseCaseInputDto,
  DeleteCompanyUseCaseOutputDto
> {
  execute(
    data: DeleteCompanyUseCaseInputDto,
  ): Promise<DeleteCompanyUseCaseOutputDto>;
}
