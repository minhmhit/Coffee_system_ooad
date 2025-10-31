import { Test, TestingModule } from "@nestjs/testing";
import { CouponService } from "./coupon.service";
import { PrismaService } from "../prisma/prisma.service";

const mockPrismaService = {
  coupon: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("CouponService", () => {
  let service: CouponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouponService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CouponService>(CouponService);
  });

  it("should create a coupon", async () => {
    const couponData = {
      code: "SAVE10",
      discountPercent: 10,
      validFrom: new Date("2025-01-01"),
      validUntil: new Date("2025-12-31"),
    };
    const mockCoupon = { id: 1, ...couponData };
    mockPrismaService.coupon.create.mockResolvedValue(mockCoupon);

    const result = await service.createCoupon(couponData);
    expect(result.code).toBe(couponData.code);
    expect(mockPrismaService.coupon.create).toHaveBeenCalledWith({
      data: couponData,
    });
  });

  it("should throw error for invalid discount percent", async () => {
    const couponData = {
      code: "INVALID",
      discountPercent: 150,
      validFrom: new Date("2025-01-01"),
      validUntil: new Date("2025-12-31"),
    };

    await expect(service.createCoupon(couponData)).rejects.toThrow(
      "Discount percent must be between 0 and 100"
    );
  });

  it("should find all coupons", async () => {
    const mockCoupons = [{ id: 1, code: "SAVE10" }];
    mockPrismaService.coupon.findMany.mockResolvedValue(mockCoupons);

    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockCoupons);
  });
});
