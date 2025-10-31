import { Test, TestingModule } from "@nestjs/testing";
import { OrderService } from "./order.service";
import { PrismaService } from "../prisma/prisma.service";
import { OrderStatus } from "../../generated/prisma/client";

const mockPrismaService = {
  order: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("OrderService", () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it("should create an order with total amount calculated", async () => {
    const orderData = {
      userId: 1,
      orderItems: [
        { productId: 1, quantity: 2, price: 10.5 },
        { productId: 2, quantity: 1, price: 5.0 },
      ],
    };
    const totalAmount = 10.5 * 2 + 5.0 * 1; // 26
    const mockOrder = {
      id: 1,
      ...orderData,
      totalAmount,
      status: OrderStatus.PENDING,
    };
    mockPrismaService.order.create.mockResolvedValue(mockOrder);

    const result = await service.createOrder(orderData);
    expect(result.totalAmount).toBe(totalAmount);
    expect(mockPrismaService.order.create).toHaveBeenCalledWith({
      data: {
        userId: orderData.userId,
        totalAmount,
        orderItems: {
          create: orderData.orderItems,
        },
      },
      include: { orderItems: true },
    });
  });

  it("should find all orders", async () => {
    const mockOrders = [{ id: 1, totalAmount: 100 }];
    mockPrismaService.order.findMany.mockResolvedValue(mockOrders);

    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockOrders);
  });
});
