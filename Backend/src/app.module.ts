import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { ProductModule } from "./product/product.module";
import { VariantModule } from "./variant/variant.module";

@Module({
  imports: [PrismaModule, UserModule, RoleModule, ProductModule, VariantModule],
})
export class AppModule {}
