import CreateUserUseCase from "../../../usecase/create-user/create-user.usecase";
import { EntityValidationError } from "@/modules/@shared/domain/errors/validation.error";
import { UserRole } from "@/modules/@shared/domain/enums";

const COMPANY_ID = "c0000000-0000-4000-8000-000000000000";

const validInput = () => ({
  name: "Carlos Lima",
  email: "carlos@backend.com.br",
  password: "SuperSecret99",
  role: UserRole.EDITOR,
  companyId: COMPANY_ID,
});

const makeSut = ({
  existingUserByEmail = null,
  company = { id: COMPANY_ID, active: true },
} = {}) => {
  const userGateway = {
    findByEmail: jest.fn().mockResolvedValue(existingUserByEmail),
    create: jest.fn().mockResolvedValue(undefined),
  };
  const passwordHashService = {
    hash: jest.fn().mockResolvedValue("hashed_password"),
  };
  const companyGateway = {
    findById: jest.fn().mockResolvedValue(company),
  };

  const useCase = new CreateUserUseCase(
    userGateway as any,
    passwordHashService as any,
    companyGateway as any,
  );

  return { useCase, userGateway, passwordHashService, companyGateway };
};

describe("CreateUserUseCase", () => {
  it("hashes password, persists and returns the user without password", async () => {
    const { useCase, userGateway, passwordHashService, companyGateway } =
      makeSut();

    const output = await useCase.execute(validInput());

    expect(companyGateway.findById).toHaveBeenCalledWith(COMPANY_ID);
    expect(passwordHashService.hash).toHaveBeenCalledWith("SuperSecret99");
    expect(userGateway.create).toHaveBeenCalledTimes(1);
    expect(output).toMatchObject({
      name: "Carlos Lima",
      email: "carlos@backend.com.br",
      role: UserRole.EDITOR,
      companyId: COMPANY_ID,
      active: true,
    });
    expect(output).not.toHaveProperty("password");
  });

  it("throws EntityValidationError when email is already taken", async () => {
    const { useCase, userGateway } = makeSut();
    userGateway.findByEmail.mockResolvedValue({ id: "existing-id" });

    await expect(useCase.execute(validInput())).rejects.toBeInstanceOf(
      EntityValidationError,
    );
    expect(userGateway.create).not.toHaveBeenCalled();
  });

  it("throws EntityValidationError when the company does not exist", async () => {
    const { useCase, userGateway } = makeSut({ company: null as any });

    await expect(useCase.execute(validInput())).rejects.toBeInstanceOf(
      EntityValidationError,
    );
    expect(userGateway.create).not.toHaveBeenCalled();
  });

  it("throws EntityValidationError when the company is inactive", async () => {
    const { useCase, userGateway } = makeSut({
      company: { id: COMPANY_ID, active: false },
    });

    await expect(useCase.execute(validInput())).rejects.toBeInstanceOf(
      EntityValidationError,
    );
    expect(userGateway.create).not.toHaveBeenCalled();
  });

  it("propagates entity validation when domain rules fail", async () => {
    const { useCase } = makeSut();

    await expect(
      useCase.execute({ ...validInput(), name: "x" }),
    ).rejects.toBeInstanceOf(EntityValidationError);
  });
});
