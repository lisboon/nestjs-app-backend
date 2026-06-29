import CreateCompanyUseCase from "../../../usecase/create-company/create-company.usecase";
import { EntityValidationError } from "@/modules/@shared/domain/errors/validation.error";

const validInput = () => ({ name: "Acme Corp", slug: "acme-corp" });

const makeSut = ({ existingBySlug = null } = {}) => {
  const companyGateway = {
    findBySlug: jest.fn().mockResolvedValue(existingBySlug),
    create: jest.fn().mockResolvedValue(undefined),
  };

  const useCase = new CreateCompanyUseCase(companyGateway as any);

  return { useCase, companyGateway };
};

describe("CreateCompanyUseCase", () => {
  it("persists and returns the created company", async () => {
    const { useCase, companyGateway } = makeSut();

    const output = await useCase.execute(validInput());

    expect(companyGateway.findBySlug).toHaveBeenCalledWith("acme-corp");
    expect(companyGateway.create).toHaveBeenCalledTimes(1);
    expect(output).toMatchObject({
      name: "Acme Corp",
      slug: "acme-corp",
      active: true,
    });
  });

  it("throws EntityValidationError when slug is already taken", async () => {
    const { useCase, companyGateway } = makeSut({
      existingBySlug: { id: "existing-id" } as any,
    });

    await expect(useCase.execute(validInput())).rejects.toBeInstanceOf(
      EntityValidationError,
    );
    expect(companyGateway.create).not.toHaveBeenCalled();
  });

  it("propagates entity validation when domain rules fail", async () => {
    const { useCase } = makeSut();

    await expect(
      useCase.execute({ ...validInput(), slug: "Not Kebab" }),
    ).rejects.toBeInstanceOf(EntityValidationError);
  });
});
