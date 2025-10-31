import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    categoryId: number;
    supplierId: number;
  }) {
    return this.prisma.product.create({ data });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        supplier: true,
        variants: true,
        inventory: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        supplier: true,
        variants: true,
        inventory: true,
      },
    });
  }

  async updateProduct(
    id: number,
    data: Partial<{
      name: string;
      description: string;
      price: number;
      imageUrl?: string;
      categoryId: number;
      supplierId: number;
    }>
  ) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
