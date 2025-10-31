import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { PrismaService } from "../prisma/prisma.service";

const mockPrismaService = {
  product: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("ProductService", () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it("should create a product", async () => {
    const productData = {
      name: "Coffee Beans",
      description: "Premium coffee",
      price: 10.99,
      categoryId: 1,
      supplierId: 1,
    };
    const mockProduct = { id: 1, ...productData };
    mockPrismaService.product.create.mockResolvedValue(mockProduct);

    const result = await service.createProduct(productData);
    expect(result.name).toBe(productData.name);
    expect(mockPrismaService.product.create).toHaveBeenCalledWith({
      data: productData,
    });
  });

  it("should find all products", async () => {
    const mockProducts = [{ id: 1, name: "Coffee" }];
    mockPrismaService.product.findMany.mockResolvedValue(mockProducts);

    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockProducts);
  });
});
