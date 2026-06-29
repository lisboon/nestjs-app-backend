import UpdateCompanyUseCase from "../../../usecase/update-company/update-company.usecase";
import { Company } from "../../../domain/company.entity";
import { NotFoundError } from "@/modules/@shared/domain/errors/not-found.error";
import { EntityValidationError } from "@/modules/@shared/domain/errors/validation.error";

const makeCompany = () =>
  Company.create({ name: "Acme Corp", slug: "acme-corp" });

const makeSut = ({ company = makeCompany() } = {}) => {
  const companyGateway = {
    findById: jest.fn().mockResolvedValue(company),
    findBySlug: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(undefined),
  };

  const useCase = new UpdateCompanyUseCase(companyGateway as any);

  return { useCase, company, companyGateway };
};

describe("UpdateCompanyUseCase", () => {
  it("updates name and persists", async () => {
    const { useCase, company, companyGateway } = makeSut();

    const output = await useCase.execute({ id: company.id, name: "Acme Inc" });

    expect(companyGateway.update).toHaveBeenCalledTimes(1);
    expect(output.name).toBe("Acme Inc");
  });

  it("toggles active", async () => {
    const { useCase, company } = makeSut();

    const output = await useCase.execute({ id: company.id, active: false });

    expect(output.active).toBe(false);
  });

  it("throws NotFoundError when company does not exist", async () => {
    const { useCase, companyGateway } = makeSut();
    companyGateway.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({ id: "b7e6a1c0-0000-4000-8000-000000000000" }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("throws EntityValidationError when new slug belongs to another company", async () => {
    const { useCase, company, companyGateway } = makeSut();
    companyGateway.findBySlug.mockResolvedValue({ id: "another-id" });

    await expect(
      useCase.execute({ id: company.id, slug: "taken-slug" }),
    ).rejects.toBeInstanceOf(EntityValidationError);
  });

  it("allows keeping the same slug", async () => {
    const { useCase, company, companyGateway } = makeSut();

    await useCase.execute({ id: company.id, slug: "acme-corp" });

    expect(companyGateway.findBySlug).not.toHaveBeenCalled();
    expect(companyGateway.update).toHaveBeenCalledTimes(1);
  });
});
