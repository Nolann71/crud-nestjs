import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ProductService {
  private openFoodFactsBaseUrl =
    'https://world.openfoodfacts.org/api/v2/product/';

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getProduct(productID: string) {
    try {
      const cachingValue = await this.cacheManager.get(productID);
      if (cachingValue) {
        return cachingValue;
      }
      const url = `${this.openFoodFactsBaseUrl}${productID}.json`;
      const observableResponse = this.httpService.get(url);
      const response = await lastValueFrom(
        observableResponse.pipe(map((response) => response.data)),
      );
      await this.cacheManager.set(productID, response);
      return response;
    } catch (error) {
      if (error.response.status === 404) {
        return { message: 'Product not found' };
      }
    }
  }
}
