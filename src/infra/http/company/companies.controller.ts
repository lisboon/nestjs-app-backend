import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth-guard";
import { RolesGuard } from "../auth/roles-guard";
import { Roles } from "../shared/roles.decorator";
import { UserRole } from "@/modules/@shared/domain/enums";
import { CompanyService } from "./company.service";
import { CreateCompanyBodyDto } from "./dto/create-company.body.dto";
import { UpdateCompanyBodyDto } from "./dto/update-company.body.dto";
import { FindAllCompaniesUseCaseInputDto } from "@/modules/company/usecase/find-all/find-all.usecase.dto";

@ApiTags("Companies")
@ApiBearerAuth()
@Controller("companies")
@UseGuards(AuthGuard, RolesGuard)
export class CompaniesController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Roles({ role: UserRole.ADMIN })
  @ApiOperation({ summary: "Create company (admin only)" })
  async create(@Body() body: CreateCompanyBodyDto) {
    return this.companyService.create(body);
  }

  @Get()
  @Roles({ role: UserRole.ADMIN })
  @ApiOperation({ summary: "List companies with pagination and filters" })
  async findAll(@Query() query: FindAllCompaniesUseCaseInputDto) {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  @Roles({ role: UserRole.ADMIN })
  @ApiOperation({ summary: "Find company by id (admin only)" })
  async findById(@Param("id") id: string) {
    return this.companyService.findById({ id });
  }

  @Patch(":id")
  @Roles({ role: UserRole.ADMIN })
  @ApiOperation({ summary: "Update company (admin only)" })
  async update(@Param("id") id: string, @Body() body: UpdateCompanyBodyDto) {
    return this.companyService.update({ id, ...body });
  }

  @Delete(":id")
  @Roles({ role: UserRole.ADMIN })
  @ApiOperation({ summary: "Soft delete company (admin only)" })
  async delete(@Param("id") id: string) {
    return this.companyService.delete({ id });
  }
}
