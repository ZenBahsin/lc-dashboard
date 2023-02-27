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
  async getAllRevenueGrowth(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
    @Query('groupby') groupby: string,
  ) {
    return await this.appService.getRevenueGrowth({
      startdate,
      enddate,
      groupby,
    });
  }

  @Get('api/b2brevenuegrowth')
  async getAllB2BRevenueGrowth(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
    @Query('groupby') groupby: string,
  ) {
    return await this.appService.getB2BRevenueGrowth({
      startdate,
      enddate,
      groupby,
    });
  }

  @Get('api/revenuegrowthpersource')
  async getAllRevenueGrowthPerSource(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
    @Query('groupby') groupby: string,
  ) {
    return await this.appService.getRevenueGrowthPerSource({
      startdate,
      enddate,
      groupby,
    });
  }

  @Get('api/productranked')
  async getAllProductRanked(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getProductRanked({ startdate, enddate });
  }

  @Get('api/channelcontribution')
  async getAllChannelContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getChannelContribution({ startdate, enddate });
  }

  @Get('api/b2bchannelcontribution')
  async getAllB2BChannelContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getB2BChannelContribution({
      startdate,
      enddate,
    });
  }

  @Get('api/productcontribution')
  async getAllProductContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getProductContribution({ startdate, enddate });
  }

  @Get('api/b2bproductcontribution')
  async getAllB2BProductContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getB2BProductContribution({
      startdate,
      enddate,
    });
  }

  @Get('api/b2bcorporateproductcontribution')
  async getAllB2BCorporateProductContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getB2BCorporateProductContribution({
      startdate,
      enddate,
    });
  }

  @Get('api/tablematrixoftransaction')
  async getAllMatrixTableofTransaction(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getMatrixTableofTransaction({
      startdate,
      enddate,
    });
  }

  @Get('api/tablematrixofb2btransaction')
  async getAllMatrixTableofB2BTransaction(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getMatrixTableofB2BTransaction({
      startdate,
      enddate,
    });
  }

  @Get('api/tablematrixofb2bcorporatetransaction')
  async getAllMatrixTableofB2BCorporateTransaction(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getMatrixTableofB2BCorporateTransaction({
      startdate,
      enddate,
    });
  }

  @Get('api/tablematrixofb2bretailtransaction')
  async getAllMatrixTableofB2BRetailTransaction(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getMatrixTableofB2BRetailTransaction({
      startdate,
      enddate,
    });
  }

  @Get('api/b2bretailcontribution')
  async getAllB2BRetailContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getB2BRetailContribution({
      startdate,
      enddate,
    });
  }

  @Get('api/ordergrowthperretail')
  async getAllOrderGrowthPerRetail(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
    @Query('groupby') groupby: string,
  ) {
    return await this.appService.getOrderGrowthPerRetail({
      startdate,
      enddate,
      groupby,
    });
  }

  @Get('api/b2bproductcontributionretail')
  async getAllB2BProductContributionRetail(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getB2BProductContributionRetail({
      startdate,
      enddate,
    });
  }

  @Get('api/tablematrixofownshoptransaction')
  async getAllMatrixTableofOwnShopTransaction(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getMatrixTableofOwnShopTransaction({
      startdate,
      enddate,
    });
  }

  @Get('api/ownshopchannelcontribution')
  async getAllOwnShopChannelContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getOwnShopChannelContribution({
      startdate,
      enddate,
    });
  }

  @Get('api/ownshopproductcontribution')
  async getAllOwnShopProductContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getOwnShopProductContribution({
      startdate,
      enddate,
    });
  }

  @Get('api/ownshoprevenuegrowth')
  async getAllOwnShopRevenueGrowth(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
    @Query('groupby') groupby: string,
  ) {
    return await this.appService.getOwnShopRevenueGrowth({
      startdate,
      enddate,
      groupby,
    });
  }

  @Get('api/tablematrixofownshopcommercetransaction')
  async getAllMatrixTableofOwnShopCommerceTransaction(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getMatrixTableofOwnShopCommerceTransaction({
      startdate,
      enddate,
    });
  }

  @Get('api/ownshopcommercecontribution')
  async getOwnShopCommerceContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getOwnShopCommerceContribution({
      startdate,
      enddate,
    });
  }

  @Get('api/ownshopcommerceproductcontribution')
  async getOwnShopCommerceProductContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getOwnShopCommerceProductContribution({
      startdate,
      enddate,
    });
  }

  @Get('api/ownshopcommercemostsoldproduct')
  async getOwnShopCommerceMostSoldProduct(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getOwnShopCommerceMostSoldProduct({
      startdate,
      enddate,
    });
  }

  @Get('api/revenuegrowthpercommerce')
  async getRevenueGrowthPerCommerce(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
    @Query('groupby') groupby: string,
  ) {
    return await this.appService.getRevenueGrowthPerCommerce({
      startdate,
      enddate,
      groupby,
    });
  }

  @Get('api/tablematrixofownshopcornertransaction')
  async getAllMatrixTableofOwnShopCornerTransaction(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getMatrixTableofOwnShopCornerTransaction({
      startdate,
      enddate,
    });
  }

  @Get('api/ownshopcornercontribution')
  async getOwnShopCornerContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getOwnShopCornerContribution({
      startdate,
      enddate,
    });
  }

  @Get('api/ownshopcornerproductcontribution')
  async getOwnShopCornerProductContribution(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getOwnShopCornerProductContribution({
      startdate,
      enddate,
    });
  }

  @Get('api/ownshopcornermostsoldproduct')
  async getOwnShopCornerMostSoldProduct(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
  ) {
    return await this.appService.getOwnShopCornerMostSoldProduct({
      startdate,
      enddate,
    });
  }

  @Get('api/revenuegrowthpercorner')
  async getRevenueGrowthPerCorner(
    @Query('startdate') startdate: string,
    @Query('enddate') enddate: string,
    @Query('groupby') groupby: string,
  ) {
    return await this.appService.getRevenueGrowthPerCorner({
      startdate,
      enddate,
      groupby,
    });
  }
}
