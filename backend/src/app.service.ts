/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
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

  async getRevenueGrowth(params: {
    startdate?: string;
    enddate?: string;
    groupby?: string;
  }) {
    const { startdate, enddate, groupby } = params;
    // const startdate = '2022-09-01'
    // const enddate = '2022-09-30'
    let getDataRevenueGrowth: any;

    if (groupby === 'Month' || groupby == '') {
      getDataRevenueGrowth = await this.dbService.$queryRaw`
        select sum(revenue_growth) as revenue_growths, periode, DATENAME(MONTH, DATEADD(MONTH, periode, -1)) AS 'month_name'
        from  ((select sum(Grand_Total) as revenue_growth, MONTH(Tanggal) as periode from  invINVOICE 
        where Tanggal BETWEEN ${startdate} AND ${enddate}
        group by
        MONTH(Tanggal)) union all
        (select sum(Grand_Total) as revenue_growth, MONTH(Tanggal) as periode from  invSALES 
        where Tanggal BETWEEN ${startdate} AND ${enddate}
        group by
        MONTH(Tanggal))
        union all 
        ((select sum (Net_Transaksi)
        as revenue_growth, MONTH(Tanggal) as periode FROM dtTRANSAKSI
        where Tanggal BETWEEN ${startdate} AND ${enddate}
        group by
        MONTH(Tanggal)))
  ) io
  group by
  periode`;
    } else if (groupby === 'Week') {
      getDataRevenueGrowth = await this.dbService.$queryRaw`
        select sum(revenue_growth) as revenue_growths, periode
        from  ((select sum(Grand_Total) as revenue_growth, DATEPART(week, Tanggal) AS periode from  invINVOICE 
        where Tanggal BETWEEN ${startdate} AND ${enddate}
        group by
        DATEPART(week, Tanggal)) union all
        (select sum(Grand_Total) as revenue_growth, DATEPART(week, Tanggal) AS periode from  invSALES 
        where Tanggal BETWEEN ${startdate} AND ${enddate}
        group by
        DATEPART(week, Tanggal))
        union all 
        ((select sum (Net_Transaksi)
        as revenue_growth, DATEPART(week, Tanggal) AS periode FROM dtTRANSAKSI
        where Tanggal BETWEEN ${startdate} AND ${enddate}

        group by
        DATEPART(week, Tanggal)))
        ) io
        group by
        periode`;
    } else if (groupby === 'Day') {
      getDataRevenueGrowth = await this.dbService.$queryRaw`
      select sum(revenue_growth) as revenue_growths, periode
      from  ((select sum(Grand_Total) as revenue_growth, CONVERT(date,Tanggal) AS periode from  invINVOICE 
      where Tanggal BETWEEN ${startdate} AND ${enddate}
      group by
      CONVERT(date,Tanggal)) union all
      (select sum(Grand_Total) as revenue_growth,  CONVERT(date,Tanggal) AS periode from  invSALES 
      where Tanggal BETWEEN ${startdate} AND ${enddate}
      group by
      CONVERT(date,Tanggal))
      union all 
      ((select sum (Net_Transaksi)
      as revenue_growth, CONVERT(date,Tanggal) AS periode FROM dtTRANSAKSI
      where Tanggal BETWEEN ${startdate} AND ${enddate}

      group by
      CONVERT(date,Tanggal)))
      ) io
      group by
      periode`;
    }
    return {
      getDataRevenueGrowth,
    };
  }

  async getB2BRevenueGrowth(params: {
    startdate?: string;
    enddate?: string;
    groupby?: string;
  }) {
    const { startdate, enddate, groupby } = params;
    // const startdate = '2022-09-01'
    // const enddate = '2022-09-30'
    let getB2BDataRevenueGrowth: any;

    if (groupby === 'Month' || groupby == '') {
      getB2BDataRevenueGrowth = await this.dbService.$queryRaw`
        select sum(Grand_Total) as revenue_growths, MONTH(Tanggal) as periode from invINVOICE
        where Tanggal BETWEEN ${startdate} AND ${enddate}
        group by  MONTH(Tanggal)`;
    } else if (groupby === 'Week') {
      getB2BDataRevenueGrowth = await this.dbService.$queryRaw`
       select sum(Grand_Total) as revenue_growths, DATEPART(week, Tanggal) as periode from invINVOICE
        where Tanggal BETWEEN ${startdate} AND ${enddate}
        group by  DATEPART(week, Tanggal)`;
    } else if (groupby === 'Day') {
      getB2BDataRevenueGrowth = await this.dbService.$queryRaw`
      select sum(Grand_Total) as revenue_growths, CONVERT(date,Tanggal) AS periode from invINVOICE
        where Tanggal BETWEEN ${startdate} AND ${enddate}
        group by  CONVERT(date,Tanggal)`;
    }
    return {
      getB2BDataRevenueGrowth,
    };
  }

  async getRevenueGrowthPerSource(params: {
    startdate?: string;
    enddate?: string;
    groupby?: string;
  }) {
    const { startdate, enddate, groupby } = params;
    // const startdate = '2022-09-01'
    // const enddate = '2022-09-30'
    let getDataRevenueGrowthPerSource: any;
    if (groupby === 'Month' || groupby == '') {
      getDataRevenueGrowthPerSource = await this.dbService.$queryRaw`
  select 'b2b' as sourcetype, sum(Grand_Total) as revenue_growths, MONTH(Tanggal) as periode from invINVOICE
  where  Tanggal BETWEEN ${startdate} AND ${enddate}
  group by MONTH(Tanggal) 
  union all
  select 'ownshop' as sourcetype, sum(revenue_growth) as revenue_growths, periode from 
      ((
    select sum(Grand_Total) as revenue_growth, MONTH(Tanggal) as periode from  invSALES 
    where  Tanggal BETWEEN ${startdate} AND ${enddate}
    group by
    MONTH(Tanggal)) union all
    (select sum(Net_Transaksi) as revenue_growth, MONTH(Tanggal) as periode from  dtTRANSAKSI 
    where  Tanggal BETWEEN ${startdate} AND ${enddate}
    group by
    MONTH(Tanggal))) io
    group by
    periode`;
    } else if (groupby === 'Week') {
      getDataRevenueGrowthPerSource = await this.dbService.$queryRaw`
     select 'b2b' as sourcetype, sum(Grand_Total) as revenue_growths, DATEPART(week, Tanggal) AS periode from invINVOICE
      where Tanggal BETWEEN ${startdate} AND ${enddate}
      group by DATEPART(week, Tanggal)
      union all
      select 'ownshop' as sourcetype, sum(revenue_growth) as revenue_growths, periode from 
      ((
      select sum(Grand_Total) as revenue_growth, DATEPART(week, Tanggal) AS periode from  invSALES 
      where Tanggal BETWEEN ${startdate} AND ${enddate}
      group by
      DATEPART(week, Tanggal)) union all
      (select sum(Net_Transaksi) as revenue_growth, DATEPART(week, Tanggal) AS periode from  dtTRANSAKSI 
      where Tanggal BETWEEN ${startdate} AND ${enddate}
      group by
      DATEPART(week, Tanggal))) io
      group by
      periode`;
    } else if (groupby === 'Day') {
      getDataRevenueGrowthPerSource = await this.dbService
        .$queryRaw`select 'b2b' as sourcetype, sum(Grand_Total) as revenue_growths, CONVERT(date,Tanggal) AS periode from invINVOICE
      where Tanggal  BETWEEN ${startdate} AND ${enddate}
      group by CONVERT(date,Tanggal)
      union all
      select 'ownshop' as sourcetype, sum(revenue_growth) as revenue_growths, periode from 
      ((
      select sum(Grand_Total) as revenue_growth, CONVERT(date,Tanggal) AS periode from  invSALES 
      where Tanggal  BETWEEN ${startdate} AND ${enddate}
      group by
      CONVERT(date,Tanggal)) union all
      (select sum(Net_Transaksi) as revenue_growth, CONVERT(date,Tanggal) AS periode from  dtTRANSAKSI 
      where Tanggal  BETWEEN ${startdate} AND ${enddate}
      group by
      CONVERT(date,Tanggal))) io
      group by
      periode`;
    }
    return {
      getDataRevenueGrowthPerSource,
    };
  }
  async getProductRanked(params: { startdate?: string; enddate?: string }) {
    const { startdate, enddate } = params;

    const getDataProductRanked: any = await this.dbService.$queryRaw`
  select
    product,
    sum(revenue_growth) as revenue_growths
from
    (
        (
            select
                sum(Grand_Total) as revenue_growth,
                invFARMASI.Katagori as product
            from
                invINVOICE
                JOIN invITEMINVOICE ON invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
                JOIN invFARMASI ON invITEMINVOICE.Kode = invFARMASI.Kode
            where
                invFARMASI.Katagori in (
                    'WORKSHOP',
                    'APPS',
                    'LIGHTTOOLS',
                    'LIGHTMEAL',
                    'PAKET'
                )
                AND Tanggal BETWEEN ${startdate} AND ${enddate}
            group by
                invFARMASI.Katagori
        )
        union
        all (
            select
                sum(Grand_Total) as revenue_growth,
                invFARMASI.Katagori as product
            from
                invSALES
                JOIN invITEMSALES ON invITEMSALES.No_Permintaan = invSALES.No_Permintaan
                JOIN invFARMASI ON invITEMSALES.Kode = invFARMASI.Kode
            where
                invFARMASI.Katagori in (
                    'WORKSHOP',
                    'APPS',
                    'LIGHTTOOLS',
                    'LIGHTMEAL',
                    'PAKET'
                )
                AND Tanggal BETWEEN ${startdate} AND ${enddate}
            group by
                invFARMASI.Katagori
        )
        union
        all (
            (
                select
                    sum (Net_Transaksi) as revenue_growth,
                    invFARMASI.Katagori as product
                FROM
                    dtTRANSAKSI
                    JOIN dtITEMTRANSAKSI ON dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
                    JOIN invFARMASI ON dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
                where
                    invFARMASI.Katagori in (
                        'WORKSHOP',
                        'APPS',
                        'LIGHTTOOLS',
                        'LIGHTMEAL',
                        'PAKET'
                    )
                    AND Tanggal BETWEEN ${startdate} AND ${enddate}
                group by
                    invFARMASI.Katagori
            )
        )
    ) io
group by
    product
order by
    revenue_growths DESC `;

    return {
      getDataProductRanked,
    };
  }
  async getChannelContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getChannelContributionData: any = await this.dbService
      .$queryRaw`SELECT sourcetype, SUM(revenue_growth) AS revenue_growths
      FROM (
          SELECT 'b2b' AS sourcetype, SUM(Grand_Total) AS revenue_growth 
          FROM invINVOICE 
          WHERE Tanggal BETWEEN ${startdate} AND ${enddate} AND Grand_Total IS NOT NULL
      
          UNION ALL
      
          SELECT 'ownshop' AS sourcetype, SUM(revenue_growth) AS revenue_growth 
          FROM (
              SELECT SUM(Grand_Total) AS revenue_growth 
              FROM invSALES 
              WHERE Tanggal BETWEEN ${startdate} AND ${enddate} AND Grand_Total IS NOT NULL
      
              UNION ALL
      
              SELECT SUM(Net_Transaksi) AS revenue_growth 
              FROM dtTRANSAKSI 
              WHERE Tanggal BETWEEN ${startdate} AND ${enddate} AND Net_Transaksi IS NOT NULL
          ) io
      ) t
      WHERE revenue_growth IS NOT NULL AND sourcetype IS NOT NULL
      GROUP BY sourcetype;
      
    `;

    return {
      getChannelContributionData,
    };
  }

  async getB2BChannelContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getB2BChannelContributionData: any = await this.dbService.$queryRaw`
   SELECT sourcetype, revenue_growths
FROM (
    SELECT 'CORPORATE' AS sourcetype, SUM(invINVOICE.Grand_Total) AS revenue_growths  
    FROM invINVOICE  
    JOIN invCABANG ON invCABANG.Kode = invINVOICE.Kode_Cabang 
    JOIN invPELANGGANCORP ON invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
    JOIN invITEMINVOICE ON invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
    WHERE invPELANGGANCORP.Tipe = 'CORPORATE'
        AND invINVOICE.Tanggal BETWEEN ${startdate} AND ${enddate}
        AND invINVOICE.Grand_Total IS NOT NULL
    UNION ALL
    SELECT 'RETAIL' AS sourcetype, SUM(invINVOICE.Grand_Total) AS revenue_growths  
    FROM invINVOICE  
    JOIN invCABANG ON invCABANG.Kode = invINVOICE.Kode_Cabang 
    JOIN invPELANGGANCORP ON invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
    JOIN invITEMINVOICE ON invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
    WHERE invPELANGGANCORP.Tipe = 'RETAIL'
        AND invINVOICE.Tanggal BETWEEN ${startdate} AND ${enddate}
        AND invINVOICE.Grand_Total IS NOT NULL
    UNION ALL
    SELECT 'RESELLER' AS sourcetype, SUM(invINVOICE.Grand_Total) AS revenue_growths  
    FROM invINVOICE  
    JOIN invCABANG ON invCABANG.Kode = invINVOICE.Kode_Cabang 
    JOIN invPELANGGANCORP ON invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
    JOIN invITEMINVOICE ON invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
    WHERE invPELANGGANCORP.Tipe = 'RESELLER'
        AND invINVOICE.Tanggal BETWEEN ${startdate} AND ${enddate}
        AND invINVOICE.Grand_Total IS NOT NULL
) AS results
WHERE revenue_growths IS NOT NULL

`;
    return {
      getB2BChannelContributionData,
    };
  }

  async getB2BProductContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getB2BProductContributionData: any = await this.dbService
      .$queryRaw`select sum(Grand_Total) as revenue_growths, invFARMASI.Katagori as product from
      invINVOICE
      JOIN invITEMINVOICE ON invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
       JOIN invFARMASI ON invITEMINVOICE.Kode = invFARMASI.Kode
                  where
                      invFARMASI.Katagori in (
                          'WORKSHOP',
                          'APPS',
                          'LIGHTTOOLS',
                          'LIGHTMEAL',
                          'PAKET'
                      )
                      AND Tanggal BETWEEN ${startdate} AND ${enddate}
                  group by
                      invFARMASI.Katagori 
      order by
          sum(Grand_Total) DESC `;

    return {
      getB2BProductContributionData,
    };
  }

  async getB2BCorporateProductContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getB2BCorporateProductContributionData: any = await this.dbService
      .$queryRaw`select sum(Grand_Total) as revenue_growths, TRIM(invFARMASI.Katagori) as product from
      invINVOICE
      JOIN invITEMINVOICE ON invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
       JOIN invFARMASI ON invITEMINVOICE.Kode = invFARMASI.Kode
	    JOIN invPELANGGANCORP ON 
    invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
                  where
                      invFARMASI.Katagori in (
                          'WORKSHOP',
                          'APPS',
                          'LIGHTTOOLS',
                          'LIGHTMEAL',
                          'PAKET'
                      )
                      AND Tanggal BETWEEN ${startdate} AND ${enddate}
					  AND invPELANGGANCORP.Tipe = 'CORPORATE'
                  group by
                      invFARMASI.Katagori 
      order by
          sum(Grand_Total) DESC `;

    return {
      getB2BCorporateProductContributionData,
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
      from  ((select sum(Grand_Total) as revenue_growth, TRIM(invFARMASI.Katagori) as product from  invINVOICE
      JOIN invITEMINVOICE ON
      invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
      JOIN invFARMASI ON
      invITEMINVOICE.Kode = invFARMASI.Kode
      where invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET') AND
      Tanggal BETWEEN ${startdate} AND ${enddate}
      group by
      invFARMASI.Katagori) union all
      (select sum(Grand_Total) as revenue_growth, TRIM(invFARMASI.Katagori) as product from  invSALES 
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
      as revenue_growth, TRIM(invFARMASI.Katagori) as product FROM dtTRANSAKSI
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
      getProductContributionData,
    };
  }

  async getMatrixTableofTransaction(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getMatrixTableofTransactionData: any = await this.dbService
      .$queryRaw`select 'b2b' as sourcetype, sum(Grand_Total) as ach, TRIM(invFARMASI.Katagori) as product  from invINVOICE
      JOIN invITEMINVOICE ON
      invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
      JOIN invFARMASI ON
      invITEMINVOICE.Kode = invFARMASI.Kode
      where Tanggal BETWEEN ${startdate} AND ${enddate}
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      group by  invFARMASI.Katagori 
      union all
      select 'ownshop' as sourcetype, sum(ACH) as ach, product from 
      ((
      select sum(Grand_Total) as ACH, TRIM(invFARMASI.Katagori) as product from  invSALES 
      JOIN invITEMSALES ON
      invITEMSALES.No_Permintaan = invSALES.No_Permintaan
      JOIN invFARMASI ON
      invITEMSALES.Kode = invFARMASI.Kode
      where Tanggal BETWEEN ${startdate} AND ${enddate}
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      group by
       invFARMASI.Katagori) union all
      (select sum(Net_Transaksi) as ACH, TRIM(invFARMASI.Katagori) as product from  dtTRANSAKSI 
      JOIN dtITEMTRANSAKSI ON
      dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
      JOIN invFARMASI ON
      dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
      where Tanggal BETWEEN ${startdate} AND ${enddate}
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      group by
      invFARMASI.Katagori)) io
      group by
      product`;

    const getMatrixTableofTotalTransactionData: any = await this.dbService
      .$queryRaw`select 'TOTAL' as sourcetype, sum(ACH) as ach, product from 
      ((
      select sum(Grand_Total) as ACH, TRIM(invFARMASI.Katagori) as product from  invINVOICE
      JOIN invITEMINVOICE ON
      invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
      JOIN invFARMASI ON
      invITEMINVOICE.Kode = invFARMASI.Kode
      where Tanggal  BETWEEN ${startdate} AND ${enddate}
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      group by
      invFARMASI.Katagori) union all
      (select sum(Grand_Total) as ACH, TRIM(invFARMASI.Katagori) as product from  invSALES 
      JOIN invITEMSALES ON
      invITEMSALES.No_Permintaan = invSALES.No_Permintaan
      JOIN invFARMASI ON
      invITEMSALES.Kode = invFARMASI.Kode
      where Tanggal BETWEEN ${startdate} AND ${enddate}
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      group by
      invFARMASI.Katagori) union all
      (select sum(Net_Transaksi) as ACH, TRIM(invFARMASI.Katagori) as product from  dtTRANSAKSI 
      JOIN dtITEMTRANSAKSI ON
      dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
      JOIN invFARMASI ON
      dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
      where Tanggal BETWEEN ${startdate} AND ${enddate}
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      group by
      invFARMASI.Katagori)) io
      group by
      product`;

    return {
      getMatrixTableofTransactionData,
      getMatrixTableofTotalTransactionData,
    };
  }

  async getMatrixTableofB2BTransaction(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getMatrixTableofB2BTransactionData: any = await this.dbService
      .$queryRaw`select TRIM(invPELANGGANCORP.Tipe) as "sourcetype", sum(Grand_Total) as ach, TRIM(invFARMASI.Katagori) as product  from invINVOICE
      JOIN invITEMINVOICE ON
      invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
      JOIN invFARMASI ON
      invITEMINVOICE.Kode = invFARMASI.Kode
	   JOIN invPELANGGANCORP ON 
      invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
      where Tanggal BETWEEN ${startdate} AND ${enddate}
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      group by  invPELANGGANCORP.Tipe, invFARMASI.Katagori
	  order by invPELANGGANCORP.Tipe`;

    const getMatrixTableofB2BTotalTransactionData: any = await this.dbService
      .$queryRaw`select 'TOTAL' as sourcetype, sum(Grand_Total) as ach, TRIM(invFARMASI.Katagori) as product  from invINVOICE
    JOIN invITEMINVOICE ON
    invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
    JOIN invFARMASI ON
    invITEMINVOICE.Kode = invFARMASI.Kode
   JOIN invPELANGGANCORP ON 
    invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
    where Tanggal BETWEEN  ${startdate} AND ${enddate}
    AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
    group by invFARMASI.Katagori`;

    return {
      getMatrixTableofB2BTransactionData,
      getMatrixTableofB2BTotalTransactionData,
    };
  }

  async getMatrixTableofB2BCorporateTransaction(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getMatrixTableofB2BCorporateTransactionData: any = await this
      .dbService
      .$queryRaw`select TRIM(invPELANGGANCORP.Deskripsi) as sourcetype, sum(Grand_Total) as ach, TRIM(invFARMASI.Katagori) as product  from invINVOICE
      JOIN invITEMINVOICE ON
      invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
      JOIN invFARMASI ON
      invITEMINVOICE.Kode = invFARMASI.Kode
	   JOIN invPELANGGANCORP ON 
      invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
      where Tanggal  BETWEEN ${startdate} AND ${enddate}
	  AND invPELANGGANCORP.Tipe = 'CORPORATE'
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      group by  invPELANGGANCORP.Deskripsi, invPELANGGANCORP.Tipe, invFARMASI.Katagori`;

    const getMatrixTableofB2BCorporateTotalTransactionData: any = await this
      .dbService
      .$queryRaw`select 'TOTAL' as sourcetype, sum(Grand_Total) as ach, TRIM(invFARMASI.Katagori) as product  from invINVOICE
    JOIN invITEMINVOICE ON
    invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
    JOIN invFARMASI ON
    invITEMINVOICE.Kode = invFARMASI.Kode
    JOIN invPELANGGANCORP ON 
    invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
    where Tanggal BETWEEN ${startdate} AND ${enddate}
    AND invPELANGGANCORP.Tipe = 'CORPORATE'
    AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
    group by invFARMASI.Katagori`;

    return {
      getMatrixTableofB2BCorporateTransactionData,
      getMatrixTableofB2BCorporateTotalTransactionData,
    };
  }

  async getMatrixTableofB2BRetailTransaction(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getMatrixTableofB2BRetailTransactionData: any = await this.dbService
      .$queryRaw`select TRIM(invPELANGGANCORP.Deskripsi) as sourcetype, sum(Grand_Total) as ach, TRIM(invFARMASI.Katagori) as product  from invINVOICE
      JOIN invITEMINVOICE ON
      invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
      JOIN invFARMASI ON
      invITEMINVOICE.Kode = invFARMASI.Kode
	   JOIN invPELANGGANCORP ON 
      invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
      where Tanggal  BETWEEN ${startdate} AND ${enddate}
	  AND invPELANGGANCORP.Tipe = 'RETAIL'
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      group by  invPELANGGANCORP.Deskripsi, invPELANGGANCORP.Tipe, invFARMASI.Katagori`;

    const getMatrixTableofB2BRetailTotalTransactionData: any = await this
      .dbService
      .$queryRaw`select 'TOTAL' as sourcetype, sum(Grand_Total) as ach, TRIM(invFARMASI.Katagori) as product  from invINVOICE
    JOIN invITEMINVOICE ON
    invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
    JOIN invFARMASI ON
    invITEMINVOICE.Kode = invFARMASI.Kode
    JOIN invPELANGGANCORP ON 
    invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
    where Tanggal BETWEEN ${startdate} AND ${enddate}
    AND invPELANGGANCORP.Tipe = 'RETAIL'
    AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
    group by invFARMASI.Katagori`;

    return {
      getMatrixTableofB2BRetailTransactionData,
      getMatrixTableofB2BRetailTotalTransactionData,
    };
  }

  async getB2BRetailContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getB2BRetailContributionData: any = await this.dbService
      .$queryRaw`    
  SELECT TRIM(invPELANGGANCORP.Deskripsi) as sourcetype, sum (invINVOICE.Grand_Total)
      as revenue_growths  FROM invINVOICE  JOIN  invCABANG ON
      invCABANG.Kode = invINVOICE.Kode_Cabang 
      JOIN invPELANGGANCORP ON 
      invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
      JOIN invITEMINVOICE ON
      invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
      where invPELANGGANCORP.Tipe = 'RETAIL'
      AND invINVOICE.Tanggal  BETWEEN ${startdate} AND ${enddate}
	  group by  invPELANGGANCORP.Deskripsi`;
    return {
      getB2BRetailContributionData,
    };
  }

  async getOrderGrowthPerRetail(params: {
    startdate?: string;
    enddate?: string;
    groupby?: string;
  }) {
    const { startdate, enddate, groupby } = params;
    let getDataOrderGrowthPerRetail: any;
    if (groupby === 'Month' || groupby == '') {
      getDataOrderGrowthPerRetail = await this.dbService.$queryRaw`
      select TRIM(invPELANGGANCORP.Deskripsi) as sourcetype, sum(Grand_Total) as revenue_growths, 
      MONTH(Tanggal) as periode from invINVOICE
      JOIN invPELANGGANCORP ON 
      invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
      where   invPELANGGANCORP.Tipe = 'RETAIL' AND
      Tanggal  BETWEEN ${startdate} AND ${enddate}
      group by MONTH(Tanggal), invPELANGGANCORP.Deskripsi
      order by MONTH(Tanggal), invPELANGGANCORP.Deskripsi`;
    }
    else if (groupby === 'Week') {
        getDataOrderGrowthPerRetail = await this.dbService.$queryRaw`
           select TRIM(invPELANGGANCORP.Deskripsi) as sourcetype, sum(Grand_Total) as revenue_growths, 
          DATEPART(week, Tanggal) AS periode from invINVOICE
          JOIN invPELANGGANCORP ON 
          invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
          where   invPELANGGANCORP.Tipe = 'RETAIL' AND
          Tanggal  BETWEEN ${startdate} AND ${enddate}
      group by  DATEPART(week, Tanggal), invPELANGGANCORP.Deskripsi
	   order by DATEPART(week, Tanggal), invPELANGGANCORP.Deskripsi`;
      }
      else if (groupby === 'Day'){
        getDataOrderGrowthPerRetail = await this.dbService.$queryRaw`
        select TRIM(invPELANGGANCORP.Deskripsi) as sourcetype, sum(Grand_Total) as revenue_growths, 
        CONVERT(date,Tanggal) AS periode from invINVOICE
        JOIN invPELANGGANCORP ON 
        invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
        where   invPELANGGANCORP.Tipe = 'RETAIL' AND
        Tanggal  BETWEEN ${startdate} AND ${enddate}
        group by  CONVERT(date,Tanggal), invPELANGGANCORP.Deskripsi
	      order by CONVERT(date,Tanggal), invPELANGGANCORP.Deskripsi`;
      }
    
    return {
      getDataOrderGrowthPerRetail,
    };
  }

  async getB2BProductContributionRetail(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getB2BProductContributionRetailData: any = await this.dbService
      .$queryRaw`select sum(Grand_Total) as revenue_growth, TRIM(invFARMASI.Katagori) as product,
      (sum(Grand_Total) * 100)/sum(sum(Grand_Total))  OVER () as 'Percentage_of_revenue_growths'
      from  invINVOICE
      JOIN invITEMINVOICE ON
      invITEMINVOICE.No_Invoice = invINVOICE.No_Invoice
      JOIN invFARMASI ON
      invITEMINVOICE.Kode = invFARMASI.Kode
	  JOIN invPELANGGANCORP ON 
      invINVOICE.Kode_Pelanggan = invPELANGGANCORP.Kode
      where invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET') AND
	  invPELANGGANCORP.Tipe = 'RETAIL' AND
      Tanggal BETWEEN ${startdate} AND ${enddate} 
      group by
      invFARMASI.Katagori order by sum(Grand_Total) DESC`;

    return {
      getB2BProductContributionRetailData,
    };
  }

  async getMatrixTableofOwnShopTransaction(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getMatrixTableofOwnShopTransactionData: any = await this.dbService
      .$queryRaw` select 'Commerce' as sourcetype, sum(Grand_Total) as ach, TRIM(invFARMASI.Katagori) as product 
      from  invSALES  JOIN invITEMSALES ON invITEMSALES.No_Permintaan = invSALES.No_Permintaan
        JOIN invFARMASI ON invITEMSALES.Kode = invFARMASI.Kode
        where Tanggal BETWEEN ${startdate} AND ${enddate} 
        AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      group by invFARMASI.Katagori
        union all
        select 'Corner' as sourcetype, sum(Net_Transaksi) as ach, TRIM(invFARMASI.Katagori) as product 
      from  dtTRANSAKSI  JOIN dtITEMTRANSAKSI ON dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
        JOIN invFARMASI ON dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
        where Tanggal BETWEEN ${startdate} AND ${enddate} 
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      group by invFARMASI.Katagori`;

    const getMatrixTableofOwnShopTotalTransactionData: any = await this
      .dbService
      .$queryRaw`select 'TOTAL' as sourcetype, sum(ach) as ach, product from
      (
         select 'Commerce' as sourcetype, sum(Grand_Total) as ach, TRIM(invFARMASI.Katagori) as product from  invSALES 
         JOIN invITEMSALES ON
         invITEMSALES.No_Permintaan = invSALES.No_Permintaan
         JOIN invFARMASI ON
         invITEMSALES.Kode = invFARMASI.Kode
         where Tanggal BETWEEN  ${startdate} AND ${enddate}
         AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
         group by
          invFARMASI.Katagori union all
         select 'Corner' as sourcetype, sum(Net_Transaksi) as ach, TRIM(invFARMASI.Katagori) as product from  dtTRANSAKSI 
         JOIN dtITEMTRANSAKSI ON
         dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
         JOIN invFARMASI ON
         dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
         where Tanggal BETWEEN '2022-01-01 00:00:00' AND '2022-12-30 00:00:00'  
         AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
         group by
         invFARMASI.Katagori 
         ) io
        group by
         product`;

    return {
      getMatrixTableofOwnShopTransactionData,
      getMatrixTableofOwnShopTotalTransactionData,
    };
  }

  async getOwnShopChannelContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getOwnShopChannelContributionData: any = await this.dbService
      .$queryRaw`	select 'Commerce' as sourcetype, sum(Grand_Total) as revenue_growths from  invSALES 
      JOIN invITEMSALES ON invITEMSALES.No_Permintaan = invSALES.No_Permintaan
        JOIN invFARMASI ON invITEMSALES.Kode = invFARMASI.Kode
        where Tanggal BETWEEN ${startdate} AND ${enddate}
        AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
          union all
        select 'Corner' as sourcetype, sum(Net_Transaksi) as revenue_growths from  dtTRANSAKSI 
        JOIN dtITEMTRANSAKSI ON dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
        JOIN invFARMASI ON dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
        where Tanggal BETWEEN ${startdate} AND ${enddate} 
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')`;

    return {
      getOwnShopChannelContributionData,
    };
  }

  async getOwnShopProductContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getOwnShopProductContributionData: any = await this.dbService
      .$queryRaw`select  product, sum(revenue_growth) as revenue_growths, 
      (sum(revenue_growth) * 100)/sum(sum(revenue_growth))  OVER () as 'Percentage_of_revenue_growths'
      from ((select sum(Grand_Total) as revenue_growth, TRIM(invFARMASI.Katagori) as product from  invSALES 
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
      as revenue_growth, TRIM(invFARMASI.Katagori) as product FROM dtTRANSAKSI
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
      product order by revenue_growths DESC  `;

    return {
      getOwnShopProductContributionData,
    };
  }

  async getOwnShopRevenueGrowth(params: {
    startdate?: string;
    enddate?: string;
    groupby?: string;
  }) {
    const { startdate, enddate, groupby } = params;

    let getDataOwnShopRevenueGrowth: any;

    if (groupby === 'Month' || groupby == '') {
      getDataOwnShopRevenueGrowth = await this.dbService.$queryRaw`
      select sum(revenue_growth) as revenue_growths, periode, DATENAME(MONTH, DATEADD(MONTH, periode, -1)) AS 'month_name'
      from  ((select sum(Grand_Total) as revenue_growth, MONTH(Tanggal) as periode from  invSALES 
      where Tanggal BETWEEN ${startdate} AND ${enddate}  
      group by
      MONTH(Tanggal))
      union all 
      ((select sum (Net_Transaksi)
      as revenue_growth, MONTH(Tanggal) as periode FROM dtTRANSAKSI
      where Tanggal BETWEEN ${startdate} AND ${enddate}  
      group by
      MONTH(Tanggal)))
      ) io
      group by
      periode`;
    }
    else if(groupby === "Week"){
      getDataOwnShopRevenueGrowth = await this.dbService.$queryRaw`
      select sum(revenue_growth) as revenue_growths, periode
      from  ((select sum(Grand_Total) as revenue_growth,  DATEPART(week, Tanggal) as periode from  invSALES 
      where Tanggal BETWEEN ${startdate} AND ${enddate} 
      group by
      DATEPART(week, Tanggal))
      union all 
      ((select sum (Net_Transaksi)
      as revenue_growth, DATEPART(week, Tanggal) as periode FROM dtTRANSAKSI
      where Tanggal BETWEEN ${startdate} AND ${enddate} 
      group by
       DATEPART(week, Tanggal)))
      ) io
      group by
      periode`;
    }
    else if(groupby==="Day"){
      getDataOwnShopRevenueGrowth = await this.dbService.$queryRaw`
      select sum(revenue_growth) as revenue_growths, periode
      from  ((select sum(Grand_Total) as revenue_growth,   CONVERT(date,Tanggal)  as periode from  invSALES 
      where Tanggal BETWEEN ${startdate} AND ${enddate} 
      group by
      CONVERT(date,Tanggal) )
      union all 
      ((select sum (Net_Transaksi)
      as revenue_growth,  CONVERT(date,Tanggal)  as periode FROM dtTRANSAKSI
      where Tanggal BETWEEN ${startdate} AND ${enddate} 
      group by
      CONVERT(date,Tanggal) ))
      ) io
      group by
      periode`;
    }
    return {
      getDataOwnShopRevenueGrowth,
    };
  }

  async getMatrixTableofOwnShopCommerceTransaction(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getMatrixTableofOwnShopCommerceTransactionData: any = await this
      .dbService
      .$queryRaw`select TRIM(invSALES.Pembayaran) as sourcetype, sum (invSALES.Grand_Total) as ach,
      TRIM(invFARMASI.Katagori) as product from invSALES
        JOIN invITEMSALES ON
        invITEMSALES.No_Permintaan = invSALES.No_Permintaan
        JOIN invFARMASI ON
        invITEMSALES.Kode = invFARMASI.Kode 
        where invSALES.Tanggal BETWEEN ${startdate} AND ${enddate}
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      AND invSALES.Pembayaran in ('TOKOPEDIA','SHOPEE','BLIBLI','LAZADA','GOFOOD','GRABFOOD', 'LIGHTSHOP(TADA)')
        group by  invsales.Pembayaran, invFARMASI.Katagori
      ORDER BY invsales.Pembayaran, invFARMASI.Katagori`;

    const getMatrixTableofOwnShopCommerceTotalTransactionData: any = await this
      .dbService
      .$queryRaw`select 'TOTAL' as sourcetype, sum(ach) as ach, product from
      (
        select TRIM(invSALES.Pembayaran) as sourcetype, sum (invSALES.Grand_Total) as ach,
        TRIM(invFARMASI.Katagori) as product from invSALES
          JOIN invITEMSALES ON
          invITEMSALES.No_Permintaan = invSALES.No_Permintaan
          JOIN invFARMASI ON
          invITEMSALES.Kode = invFARMASI.Kode 
          where invSALES.Tanggal  BETWEEN ${startdate} AND ${enddate}
        AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
        AND invSALES.Pembayaran in ('TOKOPEDIA','SHOPEE','BLIBLI','LAZADA','GOFOOD','GRABFOOD', 'LIGHTSHOP(TADA)')
          group by  invsales.Pembayaran, invFARMASI.Katagori
      )
        io
         group by product`;

    return {
      getMatrixTableofOwnShopCommerceTransactionData,
      getMatrixTableofOwnShopCommerceTotalTransactionData,
    };
  }

  async getOwnShopCommerceContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getOwnShopCommerceContributionData: any = await this.dbService
      .$queryRaw`select TRIM(invSALES.Pembayaran) as sourcetype, sum (invSALES.Grand_Total) as ach from invSALES
      JOIN invITEMSALES ON
      invITEMSALES.No_Permintaan = invSALES.No_Permintaan
      JOIN invFARMASI ON
      invITEMSALES.Kode = invFARMASI.Kode 
      where invSALES.Tanggal BETWEEN ${startdate} AND ${enddate}
	  AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
	  AND invSALES.Pembayaran in ('TOKOPEDIA','SHOPEE','BLIBLI','LAZADA','GOFOOD','GRABFOOD', 'LIGHTSHOP(TADA)')
      group by  invsales.Pembayaran
	  ORDER BY invsales.Pembayaran
`;
    return {
      getOwnShopCommerceContributionData,
    };
  }

  async getOwnShopCommerceProductContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getOwnShopCommerceProductContributionData: any = await this.dbService
      .$queryRaw`select TRIM(invFARMASI.Katagori) as sourcetype, sum (invSALES.Grand_Total) as ach from invSALES
      JOIN invITEMSALES ON
      invITEMSALES.No_Permintaan = invSALES.No_Permintaan
      JOIN invFARMASI ON
      invITEMSALES.Kode = invFARMASI.Kode 
      where invSALES.Tanggal BETWEEN ${startdate} AND ${enddate}
	  AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
	  AND invSALES.Pembayaran in ('TOKOPEDIA','SHOPEE','BLIBLI','LAZADA','GOFOOD','GRABFOOD', 'LIGHTSHOP(TADA)')
      group by  invFARMASI.Katagori`;
    return {
      getOwnShopCommerceProductContributionData,
    };
  }

  async getOwnShopCommerceMostSoldProduct(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getOwnShopCommerceMostSoldProductData: any = await this.dbService
      .$queryRaw`	  select TRIM(invFARMASI.Katagori) as sourcetype, sum (invSALES.Grand_Total) as revenue_growth,
      (sum(invSALES.Grand_Total) * 100)/sum(sum(invSALES.Grand_Total))  OVER () as 'Percentage_of_revenue_growths'
      from invSALES
        JOIN invITEMSALES ON
        invITEMSALES.No_Permintaan = invSALES.No_Permintaan
        JOIN invFARMASI ON
        invITEMSALES.Kode = invFARMASI.Kode 
        where invSALES.Tanggal BETWEEN ${startdate} AND ${enddate}
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      AND invSALES.Pembayaran in ('TOKOPEDIA','SHOPEE','BLIBLI','LAZADA','GOFOOD','GRABFOOD', 'LIGHTSHOP(TADA)')
        group by  invFARMASI.Katagori
      order by Percentage_of_revenue_growths DESC`;
    return {
      getOwnShopCommerceMostSoldProductData,
    };
  }

  async getRevenueGrowthPerCommerce(params: {
    startdate?: string;
    enddate?: string;
    groupby?: string;
  }) {
    const { startdate, enddate, groupby } = params;
    let getDataRevenueGrowthPerCommerce: any;
    if (groupby === 'Month' || groupby == '') {
      getDataRevenueGrowthPerCommerce = await this.dbService.$queryRaw`
      select invSALES.Pembayaran as sourcetype, sum(Grand_Total) as revenue_growths, 
      MONTH(Tanggal) as periode from invSALES
        JOIN invITEMSALES ON
        invITEMSALES.No_Permintaan = invSALES.No_Permintaan
        JOIN invFARMASI ON
        invITEMSALES.Kode = invFARMASI.Kode 
        where invSALES.Tanggal BETWEEN ${startdate} AND ${enddate}
        AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
	  AND invSALES.Pembayaran in ('TOKOPEDIA','SHOPEE','BLIBLI','LAZADA','GOFOOD','GRABFOOD', 'LIGHTSHOP(TADA)')
      group by MONTH(Tanggal), invSALES.Pembayaran
      order by  invSALES.Pembayaran, MONTH(Tanggal)`;
    }
    else if(groupby === 'Week'){
      getDataRevenueGrowthPerCommerce = await this.dbService.$queryRaw`
      select invSALES.Pembayaran as sourcetype, sum(Grand_Total) as revenue_growths, 
      DATEPART(week, Tanggal) as periode from invSALES
      JOIN invITEMSALES ON
        invITEMSALES.No_Permintaan = invSALES.No_Permintaan
        JOIN invFARMASI ON
        invITEMSALES.Kode = invFARMASI.Kode 
      Tanggal BETWEEN ${startdate} AND ${enddate}
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
	  AND invSALES.Pembayaran in ('TOKOPEDIA','SHOPEE','BLIBLI','LAZADA','GOFOOD','GRABFOOD', 'LIGHTSHOP(TADA)')
      group by DATEPART(week, Tanggal), invSALES.Pembayaran
      order by  invSALES.Pembayaran, DATEPART(week, Tanggal)`;
    }
    else if(groupby === 'Day'){
      getDataRevenueGrowthPerCommerce = await this.dbService.$queryRaw`
      select invSALES.Pembayaran as sourcetype, sum(Grand_Total) as revenue_growths, 
      CONVERT(date,Tanggal) as periode from invSALES
      JOIN invITEMSALES ON
        invITEMSALES.No_Permintaan = invSALES.No_Permintaan
        JOIN invFARMASI ON
        invITEMSALES.Kode = invFARMASI.Kode 
      Tanggal BETWEEN ${startdate} AND ${enddate}
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
	  AND invSALES.Pembayaran in ('TOKOPEDIA','SHOPEE','BLIBLI','LAZADA','GOFOOD','GRABFOOD', 'LIGHTSHOP(TADA)')
      group by CONVERT(date,Tanggal), invSALES.Pembayaran
      order by  invSALES.Pembayaran, CONVERT(date,Tanggal)`;
    }
    return {
      getDataRevenueGrowthPerCommerce,
    };
  }

  async getMatrixTableofOwnShopCornerTransaction(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getMatrixTableofOwnShopCornerTransactionData: any = await this
      .dbService
      .$queryRaw`select TRIM(invCABANG.Deskripsi) as sourcetype, sum (dtTRANSAKSI.Total_Transaksi)
      as ach,  TRIM(invFARMASI.Katagori) as product  FROM dtTRANSAKSI  JOIN  invCABANG ON
      invCABANG.Kode = dtTRANSAKSI.Kode_Cabang 
      JOIN dtITEMTRANSAKSI ON
      dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
      JOIN invFARMASI ON
      dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
      where invCABANG.Kode IN ('KV', 'PI', 'PP')
	  AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      AND dtTRANSAKSI.Tanggal BETWEEN ${startdate} AND ${enddate}
      group by invFARMASI.Katagori, invCABANG.Deskripsi
	  ORDER BY invCABANG.Deskripsi, invFARMASI.Katagori`;

    const getMatrixTableofOwnShopCornerTotalTransactionData: any = await this
      .dbService
      .$queryRaw` select 'TOTAL' as sourcetype, sum(ach) as ach, product from
      (
       select invCABANG.Deskripsi as Corner, sum (dtTRANSAKSI.Total_Transaksi)
        as ach,  invFARMASI.Katagori as product  FROM dtTRANSAKSI  JOIN  invCABANG ON
        invCABANG.Kode = dtTRANSAKSI.Kode_Cabang 
        JOIN dtITEMTRANSAKSI ON
        dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
        JOIN invFARMASI ON
        dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
        where invCABANG.Kode IN ('KV', 'PI', 'PP')
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
        AND dtTRANSAKSI.Tanggal BETWEEN ${startdate} AND ${enddate}
        group by invFARMASI.Katagori, invCABANG.Deskripsi
      ) io
           group by product`;

    return {
      getMatrixTableofOwnShopCornerTransactionData,
      getMatrixTableofOwnShopCornerTotalTransactionData,
    };
  }

  async getOwnShopCornerContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getOwnShopCornerContributionData: any = await this.dbService
      .$queryRaw`select invCABANG.Deskripsi as sourcetype, sum (dtTRANSAKSI.Total_Transaksi)
      as ach  FROM dtTRANSAKSI  JOIN  invCABANG ON
      invCABANG.Kode = dtTRANSAKSI.Kode_Cabang 
      JOIN dtITEMTRANSAKSI ON
      dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
      JOIN invFARMASI ON
      dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
      where invCABANG.Kode IN ('KV', 'PI', 'PP')
      AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
      AND dtTRANSAKSI.Tanggal BETWEEN ${startdate} AND ${enddate}
      group by invCABANG.Kode, invCABANG.Deskripsi`;
    return {
      getOwnShopCornerContributionData,
    };
  }

  async getOwnShopCornerProductContribution(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getOwnShopCornerProductContributionData: any = await this.dbService
      .$queryRaw`select TRIM(invFARMASI.Katagori) as sourcetype, sum (dtTRANSAKSI.Total_Transaksi) as ach from dtTRANSAKSI
      JOIN  invCABANG ON
     invCABANG.Kode = dtTRANSAKSI.Kode_Cabang 
     JOIN dtITEMTRANSAKSI ON
     dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
     JOIN invFARMASI ON
     dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
     where dtTRANSAKSI.Tanggal BETWEEN ${startdate} AND ${enddate}
   AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
   AND invCABANG.Kode IN ('KV', 'PI', 'PP')
     group by  invFARMASI.Katagori`;
    return {
      getOwnShopCornerProductContributionData,
    };
  }

  async getOwnShopCornerMostSoldProduct(params: {
    startdate?: string;
    enddate?: string;
  }) {
    const { startdate, enddate } = params;
    const getOwnShopCornerMostSoldProductData: any = await this.dbService
      .$queryRaw`select TRIM(invFARMASI.Katagori) as sourcetype, sum (dtTRANSAKSI.Total_Transaksi) as revenue_growth,
      (sum(dtTRANSAKSI.Total_Transaksi) * 100)/sum(sum(dtTRANSAKSI.Total_Transaksi))  OVER () as 'Percentage_of_revenue_growths'
      from dtTRANSAKSI
            JOIN  invCABANG ON
           invCABANG.Kode = dtTRANSAKSI.Kode_Cabang 
           JOIN dtITEMTRANSAKSI ON
           dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
           JOIN invFARMASI ON
           dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
           where dtTRANSAKSI.Tanggal BETWEEN ${startdate} AND ${enddate}
         AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
         AND invCABANG.Kode IN ('KV', 'PI', 'PP')
           group by  invFARMASI.Katagori`;
    return {
      getOwnShopCornerMostSoldProductData,
    };
  }

  async getRevenueGrowthPerCorner(params: {
    startdate?: string;
    enddate?: string;
    groupby?: string;
  }) {
    const { startdate, enddate, groupby } = params;
    let getDataRevenueGrowthPerCorner: any;
    if (groupby === 'Month' || groupby == '') {
      getDataRevenueGrowthPerCorner = await this.dbService.$queryRaw`
       select invCABANG.Deskripsi as sourcetype, sum(dtTRANSAKSI.Total_Transaksi) as revenue_growths, 
      MONTH(Tanggal) as periode from dtTRANSAKSI
      JOIN  invCABANG ON
      invCABANG.Kode = dtTRANSAKSI.Kode_Cabang 
      JOIN dtITEMTRANSAKSI ON
      dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
      JOIN invFARMASI ON
      dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
      where Tanggal BETWEEN ${startdate} AND ${enddate}
	  AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
	  AND invCABANG.Kode IN ('KV', 'PI', 'PP')
      group by MONTH(Tanggal),invCABANG.Deskripsi
      order by  invCABANG.Deskripsi, MONTH(Tanggal)`;
    } else if (groupby === 'Week') {
      getDataRevenueGrowthPerCorner = await this.dbService.$queryRaw`
      select invCABANG.Deskripsi as sourcetype, sum(dtTRANSAKSI.Total_Transaksi) as revenue_growths, 
      DATEPART(week, Tanggal) as periode from dtTRANSAKSI
      JOIN  invCABANG ON
      invCABANG.Kode = dtTRANSAKSI.Kode_Cabang 
      JOIN dtITEMTRANSAKSI ON
      dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
      JOIN invFARMASI ON
      dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
      where  Tanggal BETWEEN ${startdate} AND ${enddate}
	  AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
	  AND invCABANG.Kode IN ('KV', 'PI', 'PP')
      group by  DATEPART(week, Tanggal),invCABANG.Deskripsi
      order by  invCABANG.Deskripsi,  DATEPART(week, Tanggal)`;
    } else if (groupby === 'Day') {
      getDataRevenueGrowthPerCorner = await this.dbService.$queryRaw`
      select invCABANG.Deskripsi as sourcetype, sum(dtTRANSAKSI.Total_Transaksi) as revenue_growths, 
      CONVERT(date,Tanggal) AS periode from dtTRANSAKSI
      JOIN  invCABANG ON
      invCABANG.Kode = dtTRANSAKSI.Kode_Cabang 
      JOIN dtITEMTRANSAKSI ON
      dtITEMTRANSAKSI.No_Transaksi = dtTRANSAKSI.No_Transaksi
      JOIN invFARMASI ON
      dtITEMTRANSAKSI.Kode_Barang = invFARMASI.Kode
      where  Tanggal BETWEEN ${startdate} AND ${enddate}
	  AND invFARMASI.Katagori in ('WORKSHOP','APPS','LIGHTTOOLS','LIGHTMEAL','PAKET')
	  AND invCABANG.Kode IN ('KV', 'PI', 'PP')
      group by  CONVERT(date,Tanggal),invCABANG.Deskripsi
      order by  invCABANG.Deskripsi, CONVERT(date,Tanggal)
      `;
    }
    return {
      getDataRevenueGrowthPerCorner,
    };
  }
}
