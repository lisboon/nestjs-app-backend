import FindCompanyByIdUseCase from "../../../usecase/find-by-id/find-by-id.usecase";
import { Company } from "../../../domain/company.entity";
import { NotFoundError } from "@/modules/@shared/domain/errors/not-found.error";

const makeSut = () => {
  const company = Company.create({ name: "Acme Corp", slug: "acme-corp" });
  const companyGateway = {
    findById: jest.fn().mockResolvedValue(company),
  };

  const useCase = new FindCompanyByIdUseCase(companyGateway as any);

  return { useCase, company, companyGateway };
};

describe("FindCompanyByIdUseCase", () => {
  it("returns the company entity", async () => {
    const { useCase, company, companyGateway } = makeSut();

    const output = await useCase.execute({ id: company.id });

    expect(companyGateway.findById).toHaveBeenCalledWith(company.id);
    expect(output).toBe(company);
  });

  it("throws NotFoundError when company does not exist", async () => {
    const { useCase, companyGateway } = makeSut();
    companyGateway.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({ id: "b7e6a1c0-0000-4000-8000-000000000000" }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
