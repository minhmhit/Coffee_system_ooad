import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { VariantService } from "./variant.service";

@Controller("variants")
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Post()
  create(
    @Body() data: { name: string; additionalPrice: number; productId: number }
  ) {
    return this.variantService.createVariant(data);
  }

  @Get()
  findAll() {
    return this.variantService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.variantService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body()
    data: Partial<{
      name: string;
      additionalPrice: number;
      productId: number;
    }>
  ) {
    return this.variantService.updateVariant(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.variantService.deleteVariant(+id);
  }
}
