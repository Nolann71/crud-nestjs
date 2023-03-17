import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from 'src/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProduct(@Req() req: Request, @Param('id') id: string) {
    if (!id) throw new BadRequestException('Product ID missing');
    return this.productService.getProduct(id);
  }
}
