/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('halo')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('corporate')
  async getB2BCorporate() {
    return await this.appService.getB2BCorporate();
  }

  @Get('retail')
  async getAllB2BRetail() {
    return await this.appService.getB2BRetail();
  }

  @Get('ownshopcommerce')
  async getAllOwnShopCommerce() {
    return await this.appService.getOwnShopCommerce();
  }

  @Get('api/ownshopcorner')
  async getAllOwnShopCorner() {
    return await this.appService.getOwnShopCorner();
  }

  @Get('api/revenuegrowth')
  async getAllRevenueGrowth(@Query('startdate') startdate: string, @Query('enddate') enddate: string, @Query('groupby') groupby: string) {
    return await this.appService.getRevenueGrowth({startdate, enddate, groupby});
  }

  @Get('api/revenuegrowthpersource')
  async getAllRevenueGrowthPerSource(@Query('startdate') startdate: string, @Query('enddate') enddate: string,  @Query('groupby') groupby: string) {
    return await this.appService.getRevenueGrowthPerSource({startdate, enddate, groupby});
  }

  @Get('api/productranked')
  async getAllProductRanked(@Query('startdate') startdate: string, @Query('enddate') enddate: string) {
    return await this.appService.getProductRanked({startdate, enddate});
  }

  @Get('api/channelcontribution')
  async getAllChannelContribution(@Query('startdate') startdate: string, @Query('enddate') enddate: string) {
    return await this.appService.getChannelContribution({startdate, enddate});
  }

  @Get('api/productcontribution')
  async getAllProductContribution(@Query('startdate') startdate: string, @Query('enddate') enddate: string) {
    return await this.appService.getProductContribution({startdate, enddate});
  }
}
