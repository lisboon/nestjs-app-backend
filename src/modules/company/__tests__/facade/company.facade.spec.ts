import CompanyFacade from "../../facade/company.facade";
import { Company } from "../../domain/company.entity";

const makeSut = () => {
  const company = Company.create({ name: "Acme Corp", slug: "acme-corp" });

  const findCompanyByIdUseCase = {
    execute: jest.fn().mockResolvedValue(company),
  };
  const findAllCompaniesUseCase = {
    execute: jest.fn().mockResolvedValue({}),
  };
  const createCompanyUseCase = {
    execute: jest.fn().mockResolvedValue(company.toJSON()),
  };
  const updateCompanyUseCase = {
    execute: jest.fn().mockResolvedValue(company.toJSON()),
  };
  const deleteCompanyUseCase = {
    execute: jest.fn().mockResolvedValue({ id: company.id }),
  };

  const facade = new CompanyFacade(
    findCompanyByIdUseCase as any,
    findAllCompaniesUseCase as any,
    createCompanyUseCase as any,
    updateCompanyUseCase as any,
    deleteCompanyUseCase as any,
  );

  return {
    facade,
    company,
    findCompanyByIdUseCase,
    findAllCompaniesUseCase,
    createCompanyUseCase,
    updateCompanyUseCase,
    deleteCompanyUseCase,
  };
};

describe("CompanyFacade", () => {
  it("findById delegates to use case and serializes the entity via toJSON", async () => {
    const { facade, company, findCompanyByIdUseCase } = makeSut();

    const output = await facade.findById({ id: company.id });

    expect(findCompanyByIdUseCase.execute).toHaveBeenCalledWith({
      id: company.id,
    });
    expect(output).toEqual(company.toJSON());
    expect(output).not.toBe(company);
  });

  it.each([
    ["findAll", "findAllCompaniesUseCase", { page: 1 }],
    ["create", "createCompanyUseCase", { name: "x", slug: "y" }],
    ["update", "updateCompanyUseCase", { id: "id-1" }],
    ["delete", "deleteCompanyUseCase", { id: "id-1" }],
  ] as const)(
    "%s delegates to its use case",
    async (method, useCaseKey, input) => {
      const sut = makeSut();

      await (sut.facade[method] as (i: unknown) => Promise<unknown>)(input);

      expect(sut[useCaseKey].execute).toHaveBeenCalledWith(input);
    },
  );
});
