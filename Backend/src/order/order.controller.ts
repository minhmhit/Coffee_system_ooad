import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderStatus } from "../../generated/prisma/client";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Body()
    data: {
      userId: number;
      orderItems: {
        productId: number;
        quantity: number;
        unitPrice: number;
        variantId?: number;
      }[];
    }
  ) {
    return this.orderService.createOrder(data);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderService.findOne(+id);
  }

  @Put(":id/status")
  updateStatus(@Param("id") id: string, @Body() data: { status: OrderStatus }) {
    return this.orderService.updateOrderStatus(+id, data.status);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.orderService.deleteOrder(+id);
  }
}
