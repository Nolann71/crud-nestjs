import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ProductService {
  private openFoodFactsBaseUrl =
    'https://world.openfoodfacts.org/api/v2/product/';

  constructor(private readonly httpService: HttpService) {}

  async getProduct(productID: string) {
    try {
      const url = `${this.openFoodFactsBaseUrl}${productID}.json`;
      const observableResponse = this.httpService.get(url);
      const response = await lastValueFrom(
        observableResponse.pipe(map((response) => response.data)),
      );
      console.log(response);
      return response;
    } catch (error) {
      if (error.response.status === 404) {
        return { message: 'Product not found' };
      }
    }
  }
}
