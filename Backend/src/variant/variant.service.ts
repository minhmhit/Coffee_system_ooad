import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class VariantService {
  constructor(private prisma: PrismaService) {}

  async createVariant(data: {
    name: string;
    additionalPrice: number;
    productId: number;
  }) {
    return this.prisma.variant.create({ data });
  }

  async findAll() {
    return this.prisma.variant.findMany({
      include: { product: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.variant.findUnique({
      where: { id },
      include: { product: true },
    });
  }

  async updateVariant(
    id: number,
    data: Partial<{
      name: string;
      additionalPrice: number;
      productId: number;
    }>
  ) {
    return this.prisma.variant.update({ where: { id }, data });
  }

  async deleteVariant(id: number) {
    return this.prisma.variant.delete({ where: { id } });
  }
}
