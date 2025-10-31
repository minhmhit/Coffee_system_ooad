import { Test, TestingModule } from "@nestjs/testing";
import { VariantService } from "./variant.service";
import { PrismaService } from "../prisma/prisma.service";

const mockPrismaService = {
  variant: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("VariantService", () => {
  let service: VariantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VariantService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<VariantService>(VariantService);
  });

  it("should create a variant", async () => {
    const variantData = {
      name: "Large Size",
      additionalPrice: 2.5,
      productId: 1,
    };
    const mockVariant = { id: 1, ...variantData };
    mockPrismaService.variant.create.mockResolvedValue(mockVariant);

    const result = await service.createVariant(variantData);
    expect(result.name).toBe(variantData.name);
    expect(mockPrismaService.variant.create).toHaveBeenCalledWith({ data: variantData });
  });

  it("should find all variants", async () => {
    const mockVariants = [{ id: 1, name: "Large" }];
    mockPrismaService.variant.findMany.mockResolvedValue(mockVariants);

    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockVariants);
  });
});