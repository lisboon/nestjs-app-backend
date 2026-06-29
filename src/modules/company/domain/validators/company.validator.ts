import { Length, Matches } from "class-validator";
import { Notification } from "@/modules/@shared/domain/entity/validators/notification";
import { ClassValidatorFields } from "@/modules/@shared/domain/entity/validators/class-validator-fields";
import { Company } from "../company.entity";

export class CompanyRules {
  @Length(2, 120, {
    message: "Invalid name",
    groups: ["create", "name", "update"],
  })
  name: string;

  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Invalid slug",
    groups: ["create", "slug", "update"],
  })
  slug: string;

  constructor(data: Company) {
    Object.assign(this, data.toJSON());
  }
}

export class CompanyValidator extends ClassValidatorFields {
  validate(
    notification: Notification,
    data: Company,
    fields: string[],
  ): boolean {
    const rules = new CompanyRules(data);
    const newFields = fields?.length ? fields : ["create"];
    return super.validate(notification, rules, newFields);
  }
}

export default class CompanyValidatorFactory {
  static create(): CompanyValidator {
    return new CompanyValidator();
  }
}
