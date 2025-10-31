import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body()
    data: {
      name: string;
      description: string;
      price: number;
      imageUrl?: string;
      categoryId: number;
      supplierId: number;
    }
  ) {
    return this.productService.createProduct(data);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body()
    data: Partial<{
      name: string;
      description: string;
      price: number;
      imageUrl?: string;
      categoryId: number;
      supplierId: number;
    }>
  ) {
    return this.productService.updateProduct(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.deleteProduct(+id);
  }
}
