import PrismaQueryBuilder from "@/modules/@shared/repository/prisma-query-builder";

export default class CompaniesQueryBuilder extends PrismaQueryBuilder {
  subItems = {};
  whereFields = ["active"];
  inFields = [];
  orFields = [];
  searchFields = ["name", "slug"];
  sortableFields = ["name", "slug", "createdAt"];
  relationFields = [];
  relationFilter = [];
  include = {};
}
