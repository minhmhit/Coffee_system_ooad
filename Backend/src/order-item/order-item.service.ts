import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  async createOrderItem(data: {
    quantity: number;
    unitPrice: number;
    orderId: number;
    productId: number;
    variantId?: number;
  }) {
    return this.prisma.orderItem.create({ data });
  }

  async findAll() {
    return this.prisma.orderItem.findMany({
      include: { order: true, product: true, variant: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.orderItem.findUnique({
      where: { id },
      include: { order: true, product: true, variant: true },
    });
  }

  async updateOrderItem(
    id: number,
    data: Partial<{
      quantity: number;
      unitPrice: number;
      productId: number;
      variantId?: number;
    }>
  ) {
    return this.prisma.orderItem.update({ where: { id }, data });
  }

  async deleteOrderItem(id: number) {
    return this.prisma.orderItem.delete({ where: { id } });
  }
}
