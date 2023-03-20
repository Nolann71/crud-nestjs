import { HttpModule } from '@nestjs/axios';
import { Module, CacheModule } from '@nestjs/common';
import { ProductController } from 'src/product/product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 10000, // in milliseconds = 10 seconds
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
