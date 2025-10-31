import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";

@Module({
  imports: [PrismaModule, UserModule, RoleModule],
})
export class AppModule {}
