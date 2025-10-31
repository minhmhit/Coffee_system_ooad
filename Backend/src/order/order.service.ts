import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderStatus } from "../../generated/prisma/client";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: {
    userId: number;
    orderItems: {
      productId: number;
      quantity: number;
      unitPrice: number;
      variantId?: number;
    }[];
  }) {
    const totalAmount = data.orderItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    return this.prisma.order.create({
      data: {
        userId: data.userId,
        totalAmount,
        orderItems: {
          create: data.orderItems,
        },
      },
      include: { orderItems: true },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { user: true, orderItems: { include: { product: true } } },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { user: true, orderItems: { include: { product: true } } },
    });
  }

  async updateOrderStatus(id: number, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async deleteOrder(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }
}
