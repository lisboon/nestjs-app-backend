import { Company } from "../../domain/company.entity";
import { EntityValidationError } from "@/modules/@shared/domain/errors/validation.error";

const validProps = () => ({
  name: "Acme Corp",
  slug: "acme-corp",
});

describe("Company", () => {
  describe("create", () => {
    it("builds a valid company with defaults", () => {
      const company = Company.create(validProps());
      expect(company.id).toMatch(/^[0-9a-f-]{36}$/);
      expect(company.name).toBe("Acme Corp");
      expect(company.slug).toBe("acme-corp");
      expect(company.active).toBe(true);
      expect(company.createdAt).toBeInstanceOf(Date);
      expect(company.deletedAt).toBeUndefined();
    });

    it("normalizes slug (trim + lowercase)", () => {
      const company = Company.create({ ...validProps(), slug: "  Acme-Corp " });
      expect(company.slug).toBe("acme-corp");
    });

    it("throws EntityValidationError when name is too short", () => {
      expect(() => Company.create({ ...validProps(), name: "x" })).toThrow(
        EntityValidationError,
      );
    });

    it("throws EntityValidationError when slug is not kebab-case", () => {
      expect(() =>
        Company.create({ ...validProps(), slug: "Acme Corp!" }),
      ).toThrow(EntityValidationError);
    });
  });

  describe("updateCompany", () => {
    it("changes name and refreshes updatedAt", async () => {
      const company = Company.create(validProps());
      const before = company.updatedAt.getTime();
      await new Promise((r) => setTimeout(r, 2));
      company.updateCompany({ name: "Acme Inc" });
      expect(company.name).toBe("Acme Inc");
      expect(company.updatedAt.getTime()).toBeGreaterThan(before);
    });

    it("normalizes slug on change", () => {
      const company = Company.create(validProps());
      company.updateCompany({ slug: "  New-Slug " });
      expect(company.slug).toBe("new-slug");
    });

    it("throws EntityValidationError when slug is invalid", () => {
      const company = Company.create(validProps());
      expect(() => company.updateCompany({ slug: "Bad Slug" })).toThrow(
        EntityValidationError,
      );
    });
  });

  describe("delete", () => {
    it("soft deletes and deactivates", () => {
      const company = Company.create(validProps());
      company.delete();
      expect(company.active).toBe(false);
      expect(company.deletedAt).toBeInstanceOf(Date);
    });
  });

  describe("toJSON", () => {
    it("serializes the public shape", () => {
      const company = Company.create(validProps());
      expect(company.toJSON()).toMatchObject({
        id: company.id,
        name: "Acme Corp",
        slug: "acme-corp",
        active: true,
      });
    });
  });
});
