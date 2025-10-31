import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { RoleService } from "./role.service";

@Controller("roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() data: { name: string; description?: string }) {
    return this.roleService.createRole(data);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() data: { name?: string; description?: string }
  ) {
    return this.roleService.updateRole(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roleService.deleteRole(+id);
  }
}
