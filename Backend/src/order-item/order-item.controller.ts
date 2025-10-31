import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { OrderItemService } from "./order-item.service";

@Controller("order-items")
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(
    @Body()
    data: {
      quantity: number;
      unitPrice: number;
      orderId: number;
      productId: number;
      variantId?: number;
    }
  ) {
    return this.orderItemService.createOrderItem(data);
  }

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderItemService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body()
    data: Partial<{
      quantity: number;
      unitPrice: number;
      productId: number;
      variantId?: number;
    }>
  ) {
    return this.orderItemService.updateOrderItem(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.orderItemService.deleteOrderItem(+id);
  }
}
