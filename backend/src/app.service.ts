/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from './prisma.service';

@Injectable()
// @Resolver()
export class AppService {
  constructor(private dbService: PrismaService) {}

  @Query(() => String)
  getHello(): string {
    return 'Hallo, nama saya Muhammad Zen';
  }

  async getB2BCorporate() {
    const getCorporateData: any = await this.dbService
      .$queryRaw`SELECT invPELANGGANCORP.Tipe, invPELANGGANCORP.Deskripsi as Corporate,invPELANGGANCORP.Lokasi, sum (invINVOICE.Grand_Total)
      as Ach  FROM invINVOICE  JOIN  invCABANG ON
      invCABANG.Kode = invINVOICE.Kode_Cabang 
      JOIN invPELANGGANCORP ON 
      invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
      JOIN invITEMINVOICE ON
      invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
      JOIN invFARMASI ON
      invITEMINVOICE.Kode = invFARMASI.Kode
      where invPELANGGANCORP.Tipe = 'CORPORATE' AND invFARMASI.Katagori='LIGHTMEAL'
      AND invINVOICE.Tanggal BETWEEN '2022-01-01 00:00:00' AND '2022-12-31 00:00:00'
      group by invPELANGGANCORP.Lokasi, invPELANGGANCORP.Deskripsi, invPELANGGANCORP.Tipe`;

    return {
      getCorporateData,
    };
  }

  async getB2BRetail() {
    const getRetailData: any = await this.dbService
      .$queryRaw`SELECT invPELANGGANCORP.Tipe, invPELANGGANCORP.Deskripsi as Corporate,invPELANGGANCORP.Lokasi, sum (invINVOICE.Grand_Total)
      as Ach  FROM invINVOICE  JOIN  invCABANG ON
      invCABANG.Kode = invINVOICE.Kode_Cabang 
      JOIN invPELANGGANCORP ON 
      invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
      JOIN invITEMINVOICE ON
      invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
      JOIN invFARMASI ON
      invITEMINVOICE.Kode = invFARMASI.Kode
      where invPELANGGANCORP.Tipe = 'RETAIL' AND invFARMASI.Katagori='LIGHTMEAL'
      AND invINVOICE.Tanggal BETWEEN '2022-01-01 00:00:00' AND '2022-12-31 00:00:00'
      group by invPELANGGANCORP.Lokasi, invPELANGGANCORP.Deskripsi, invPELANGGANCORP.Tipe`;

    return {
      getRetailData,
    };
  }

  async getOwnShopCommerce() {
    const getOwnShopCommerceData: any = await this.dbService
      .$queryRaw`select invSALES.Pembayaran, sum (invSALES.Grand_Total) as Ach from invSALES
      JOIN invITEMSALES ON
      invITEMSALES.No_Permintaan = invSALES.No_Permintaan
      JOIN invFARMASI ON
      invITEMSALES.Kode = invFARMASI.Kode 
      where  invFARMASI.Katagori='LIGHTMEAL'
      AND invSALES.Tanggal BETWEEN '2022-01-01 00:00:00' AND '2022-12-31 00:00:00'
      group by  invsales.Pembayaran, invFARMASI.Katagori`;

    return {
      getOwnShopCommerceData,
    };
  }

  async getOwnShopCorner() {
    const getOwnShopCommerceData: any = await this.dbService
      .$queryRaw`select invCABANG.Deskripsi as Corner, sum (dtTRANSAKSI.Total_Transaksi)
      as Ach  FROM dtTRANSAKSI  JOIN  invCABANG ON
      invCABANG.Kode = dtTRANSAKSI.Kode_Cabang 
      JOIN dtITEMTRANSAKSI ON
      dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
      JOIN invFARMASI ON
      dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
      where  invFARMASI.Katagori='LIGHTMEAL' 
      AND invCABANG.Kode IN ('KV', 'PI', 'PP')
      AND dtTRANSAKSI.Tanggal BETWEEN '2022-01-01 00:00:00' AND '2022-12-31 00:00:00'
      group by invCABANG.Kode, invCABANG.Deskripsi`;

    return {
      getOwnShopCommerceData,
    };
  }

  async getRevenueGrowth(params: { startdate?: string; enddate?: string }) {
    const { startdate, enddate } = params;
    // const startdate = '2022-09-01'
    // const enddate = '2022-09-30'
    const getDataRevenueGrowth: any = await this.dbService.$queryRaw`
  select sum(revenue_growth) as revenue_growths, bulan, DATENAME(MONTH, DATEADD(MONTH, bulan, -1)) AS 'month_name'
  from  ((select sum(Grand_Total) as revenue_growth, MONTH(Tanggal) as bulan from  invINVOICE 
  where Tanggal BETWEEN ${startdate} AND ${enddate}
  group by
  MONTH(Tanggal)) union all
  (select sum(Grand_Total) as revenue_growth, MONTH(Tanggal) as bulan from  invSALES 
  where Tanggal BETWEEN ${startdate} AND ${enddate}
  group by
  MONTH(Tanggal))
  union all 
  ((select sum (Net_Transaksi)
  as revenue_growth, MONTH(Tanggal) as bulan FROM dtTRANSAKSI
  where Tanggal BETWEEN ${startdate} AND ${enddate}
  group by
  MONTH(Tanggal)))
  ) io
  group by
  bulan`;

    return {
      getDataRevenueGrowth,
    };
  }

  async getChannelContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getChannelContributionData: any = await this.dbService
      .$queryRaw`select 'b2b' as sourcetype, sum(Grand_Total) as revenue_growths from invINVOICE
    where Tanggal BETWEEN ${startdate} AND ${enddate}
    union all
    select 'ownshop' as sourcetype, sum(revenue_growth) as revenue_growths from 
    ((
    select sum(Grand_Total) as revenue_growth from  invSALES 
    where Tanggal BETWEEN ${startdate} AND ${enddate})
    union all
    (select sum(Net_Transaksi) as revenue_growth from  dtTRANSAKSI 
    where Tanggal BETWEEN ${startdate} AND ${enddate}
    )) io
    `;

    return {
      getChannelContributionData,
    };
  }

  async getProductContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getProductContributionData: any = await this.dbService
      .$queryRaw`select  product, sum(revenue_growth) as revenue_growths, 
      (sum(revenue_growth) * 100)/sum(sum(revenue_growth))  OVER () as 'Percentage_of_revenue_growths'
      from  ((select sum(Grand_Total) as revenue_growth, invFARMASI.Katagori as product from  invINVOICE
      JOIN invITEMINVOICE ON
      invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
      JOIN invFARMASI ON
      invITEMINVOICE.Kode = invFARMASI.Kode
      where invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET') AND
      Tanggal BETWEEN ${startdate} AND ${enddate}
      group by
      invFARMASI.Katagori) union all
      (select sum(Grand_Total) as revenue_growth, invFARMASI.Katagori as product from  invSALES 
      JOIN invITEMSALES ON
      invITEMSALES.No_Permintaan = invSALES.No_Permintaan
      JOIN invFARMASI ON
      invITEMSALES.Kode = invFARMASI.Kode 
      where invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      AND
      Tanggal BETWEEN ${startdate} AND ${enddate}
      group by
      invFARMASI.Katagori)
      union all 
      ((select sum (Net_Transaksi)
      as revenue_growth, invFARMASI.Katagori as product FROM dtTRANSAKSI
      JOIN dtITEMTRANSAKSI ON
      dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
      JOIN invFARMASI ON
      dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
      where invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET') AND
      Tanggal BETWEEN ${startdate} AND ${enddate}
      group by
      invFARMASI.Katagori))
      ) io
      group by
      product order by revenue_growths DESC `;

      return {
        getProductContributionData
      }
  }
}
