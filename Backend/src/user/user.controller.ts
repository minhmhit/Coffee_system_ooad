import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body()
    data: {
      email: string;
      name?: string;
      password: string;
      roleId: number;
    }
  ) {
    return this.userService.createUser(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.deleteUser(+id);
  }
}
