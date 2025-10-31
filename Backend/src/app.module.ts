import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PrismaModule, UserModule, RoleModule, ProductModule],
})
export class AppModule {}
