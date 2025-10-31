import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { ProductModule } from "./product/product.module";
import { VariantModule } from "./variant/variant.module";
import { OrderModule } from "./order/order.module";
import { OrderItemModule } from "./order-item/order-item.module";

@Module({
  imports: [
    PrismaModule,
    UserModule,
    RoleModule,
    ProductModule,
    VariantModule,
    OrderModule,
    OrderItemModule,
  ],
})
export class AppModule {}
