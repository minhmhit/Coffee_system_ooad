import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { CouponService } from "./coupon.service";

@Controller("coupons")
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(
    @Body()
    data: {
      code: string;
      discountPercent: number;
      validFrom: Date;
      validUntil: Date;
    }
  ) {
    return this.couponService.createCoupon(data);
  }

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.couponService.findOne(+id);
  }

  @Post("validate")
  validate(@Body() data: { code: string }) {
    return this.couponService.validateCoupon(data.code);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body()
    data: Partial<{
      code: string;
      discountPercent: number;
      validFrom: Date;
      validUntil: Date;
    }>
  ) {
    return this.couponService.updateCoupon(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.couponService.deleteCoupon(+id);
  }
}
