import { Test, TestingModule } from "@nestjs/testing";
import { OrderItemService } from "./order-item.service";
import { PrismaService } from "../prisma/prisma.service";

const mockPrismaService = {
  orderItem: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("OrderItemService", () => {
  let service: OrderItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OrderItemService>(OrderItemService);
  });

  it("should create an order item", async () => {
    const itemData = {
      quantity: 2,
      unitPrice: 10.5,
      orderId: 1,
      productId: 1,
      variantId: 1,
    };
    const mockItem = { id: 1, ...itemData };
    mockPrismaService.orderItem.create.mockResolvedValue(mockItem);

    const result = await service.createOrderItem(itemData);
    expect(result.quantity).toBe(itemData.quantity);
    expect(mockPrismaService.orderItem.create).toHaveBeenCalledWith({
      data: itemData,
    });
  });

  it("should find all order items", async () => {
    const mockItems = [{ id: 1, quantity: 1 }];
    mockPrismaService.orderItem.findMany.mockResolvedValue(mockItems);

    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockItems);
  });
});
