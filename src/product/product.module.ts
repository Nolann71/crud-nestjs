import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductController } from 'src/product/product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
