import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  async createCoupon(data: {
    code: string;
    discountPercent: number;
    validFrom: Date;
    validUntil: Date;
  }) {
    if (data.discountPercent < 0 || data.discountPercent > 100) {
      throw new Error("Discount percent must be between 0 and 100");
    }
    if (data.validFrom >= data.validUntil) {
      throw new Error("Valid from must be before valid until");
    }
    return this.prisma.coupon.create({ data });
  }

  async findAll() {
    return this.prisma.coupon.findMany({
      include: { orders: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.coupon.findUnique({
      where: { id },
      include: { orders: true },
    });
  }

  async validateCoupon(code: string) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { code },
    });
    if (!coupon) {
      throw new Error("Coupon not found");
    }
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      throw new Error("Coupon is expired");
    }
    return coupon;
  }

  async updateCoupon(
    id: number,
    data: Partial<{
      code: string;
      discountPercent: number;
      validFrom: Date;
      validUntil: Date;
    }>
  ) {
    return this.prisma.coupon.update({ where: { id }, data });
  }

  async deleteCoupon(id: number) {
    return this.prisma.coupon.delete({ where: { id } });
  }
}
