/* eslint-disable prettier/prettier */
import { Resolver, Query, Args } from '@nestjs/graphql';
import { AppService } from './app.service';
import { PrismaService } from 'src/prisma.service';
import { DashboardDTO } from './dashboard.dto';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    private readonly dbService: PrismaService,
  ) {}

  @Query(() => [DashboardDTO])
  async getRevenueGrowth(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
    @Args('groupby', { nullable: true }) groupby: string,
  ) {
    const result = await this.appService.getRevenueGrowth({
      startdate,
      enddate,
      groupby,
    });
    return result.getDataRevenueGrowth.map(
      (data: { revenue_growths: any; periode: any }) => {
        return {
          revenue_growths: data.revenue_growths,
          periode: data.periode,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getRevenueGrowthPerSource(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
    @Args('groupby', { nullable: true }) groupby: string,
  ) {
    const result = await this.appService.getRevenueGrowthPerSource({
      startdate,
      enddate,
      groupby,
    });
    return result.getDataRevenueGrowthPerSource.map(
      (data: { sourcetype: any; revenue_growths: any; periode: any }) => {
        return {
          sourcetype: data.sourcetype,
          revenue_growths: data.revenue_growths,
          periode: data.periode,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getProductRanked(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getProductRanked({
      startdate,
      enddate,
    });
    return result.getDataProductRanked.map(
      (data: { product: any; revenue_growths: any }) => {
        return {
          product: data.product,
          revenue_growths: data.revenue_growths,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getMatrixTableofTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const transactionData = await this.appService.getMatrixTableofTransaction({
      startdate,
      enddate,
    });

    const result = transactionData.getMatrixTableofTransactionData.map(
      (data: { sourcetype: any; ach: any; product: any }) => {
        return {
          sourcetype: data.sourcetype,
          ach: data.ach,
          product: data.product,
        };
      },
    );

    return [...result];
  }

  @Query(() => [DashboardDTO])
  async getMatrixTableofTotalTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const transactionData = await this.appService.getMatrixTableofTransaction({
      startdate,
      enddate,
    });

    const result = transactionData.getMatrixTableofTotalTransactionData.map(
      (data: { sourcetype: any; ach: any; product: any }) => {
        return {
          sourcetype: data.sourcetype,
          ach: data.ach,
          product: data.product,
        };
      },
    );

    return [...result];
  }

  @Query(() => [DashboardDTO])
  async getChannelContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getChannelContribution({
      startdate,
      enddate,
    });
    return result.getChannelContributionData.map(
      (data: { sourcetype: any; revenue_growths: any }) => {
        return {
          sourcetype: data.sourcetype,
          revenue_growths: data.revenue_growths,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getProductContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getProductContribution({
      startdate,
      enddate,
    });
    return result.getProductContributionData.map(
      (data: { product: any; revenue_growths: any }) => {
        return {
          product: data.product,
          revenue_growths: data.revenue_growths,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getMatrixTableofB2BTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const transactionData =
      await this.appService.getMatrixTableofB2BTransaction({
        startdate,
        enddate,
      });

    const result = transactionData.getMatrixTableofB2BTransactionData.map(
      (data: { sourcetype: any; ach: any; product: any }) => {
        return {
          sourcetype: data.sourcetype,
          ach: data.ach,
          product: data.product,
        };
      },
    );

    return [...result];
  }

  @Query(() => [DashboardDTO])
  async getMatrixTableofB2BTotalTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const transactionData =
      await this.appService.getMatrixTableofB2BTransaction({
        startdate,
        enddate,
      });

    const result = transactionData.getMatrixTableofB2BTotalTransactionData.map(
      (data: { sourcetype: any; ach: any; product: any }) => {
        return {
          sourcetype: data.sourcetype,
          ach: data.ach,
          product: data.product,
        };
      },
    );

    return [...result];
  }

  @Query(() => [DashboardDTO])
  async getB2BChannelContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getB2BChannelContribution({
      startdate,
      enddate,
    });
    return result.getB2BChannelContributionData.map(
      (data: { sourcetype: any; revenue_growths: any }) => {
        return {
          sourcetype: data.sourcetype,
          revenue_growths: data.revenue_growths,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getB2BProductContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getB2BProductContribution({
      startdate,
      enddate,
    });
    return result.getB2BProductContributionData.map(
      (data: { product: any; revenue_growths: any }) => {
        return {
          product: data.product,
          revenue_growths: data.revenue_growths,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getB2BRevenueGrowth(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
    @Args('groupby', { nullable: true }) groupby: string,
  ) {
    const result = await this.appService.getB2BRevenueGrowth({
      startdate,
      enddate,
      groupby,
    });
    return result.getB2BDataRevenueGrowth.map(
      (data: { revenue_growths: any; periode: any }) => {
        return {
          revenue_growths: data.revenue_growths,
          periode: data.periode,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getMatrixTableofB2BCorporateTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const transactionData =
      await this.appService.getMatrixTableofB2BCorporateTransaction({
        startdate,
        enddate,
      });

    const result =
      transactionData.getMatrixTableofB2BCorporateTransactionData.map(
        (data: { sourcetype: any; ach: any; product: any }) => {
          return {
            sourcetype: data.sourcetype,
            ach: data.ach,
            product: data.product,
          };
        },
      );

    return [...result];
  }
  @Query(() => [DashboardDTO])
  async getMatrixTableofTotalB2BCorporateTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const totalData =
      await this.appService.getMatrixTableofB2BCorporateTransaction({
        startdate,
        enddate,
      });

    const totalTransaction =
      totalData.getMatrixTableofB2BCorporateTotalTransactionData.map(
        (data: { sourcetype: any; ach: any; product: any }) => {
          return {
            sourcetype: data.sourcetype,
            ach: data.ach,
            product: data.product,
          };
        },
      );

    return [...totalTransaction];
  }

  @Query(() => [DashboardDTO])
  async getB2BCorporateProductContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getB2BCorporateProductContribution({
      startdate,
      enddate,
    });
    return result.getB2BCorporateProductContributionData.map(
      (data: { product: any; revenue_growths: any }) => {
        return {
          product: data.product,
          revenue_growths: data.revenue_growths,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getMatrixTableofB2BRetailTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const transactionData =
      await this.appService.getMatrixTableofB2BRetailTransaction({
        startdate,
        enddate,
      });

    const result = transactionData.getMatrixTableofB2BRetailTransactionData.map(
      (data: { sourcetype: any; ach: any; product: any }) => {
        return {
          sourcetype: data.sourcetype,
          ach: data.ach,
          product: data.product,
        };
      },
    );

    return [...result];
  }
  @Query(() => [DashboardDTO])
  async getMatrixTableofTotalB2BRetailTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const totalData =
      await this.appService.getMatrixTableofB2BRetailTransaction({
        startdate,
        enddate,
      });

    const totalTransaction =
      totalData.getMatrixTableofB2BRetailTotalTransactionData.map(
        (data: { sourcetype: any; ach: any; product: any }) => {
          return {
            sourcetype: data.sourcetype,
            ach: data.ach,
            product: data.product,
          };
        },
      );

    return [...totalTransaction];
  }

  @Query(() => [DashboardDTO])
  async getB2BRetailContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getB2BRetailContribution({
      startdate,
      enddate,
    });
    return result.getB2BRetailContributionData.map(
      (data: { sourcetype: any; revenue_growths: any }) => {
        return {
          sourcetype: data.sourcetype,
          revenue_growths: data.revenue_growths,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getOrderGrowthPerRetail(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
    @Args('groupby', { nullable: true }) groupby: string,
  ) {
    const result = await this.appService.getOrderGrowthPerRetail({
      startdate,
      enddate,
      groupby,
    });
    return result.getDataOrderGrowthPerRetail.map(
      (data: { sourcetype: any; revenue_growths: any; periode: any }) => {
        return {
          sourcetype: data.sourcetype,
          revenue_growths: data.revenue_growths,
          periode: data.periode,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getB2BProductContributionRetail(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getB2BProductContributionRetail({
      startdate,
      enddate,
    });
    return result.getB2BProductContributionRetailData.map(
      (data: { product: any; Percentage_of_revenue_growths: any }) => {
        return {
          product: data.product,
          Percentage_of_revenue_growths: data.Percentage_of_revenue_growths,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getMatrixTableofOwnShopTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const transactionData =
      await this.appService.getMatrixTableofOwnShopTransaction({
        startdate,
        enddate,
      });

    const result = transactionData.getMatrixTableofOwnShopTransactionData.map(
      (data: { sourcetype: any; ach: any; product: any }) => {
        return {
          sourcetype: data.sourcetype,
          ach: data.ach,
          product: data.product,
        };
      },
    );

    return [...result];
  }
  @Query(() => [DashboardDTO])
  async getMatrixTableofTotalOwnShopTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const totalData = await this.appService.getMatrixTableofOwnShopTransaction({
      startdate,
      enddate,
    });

    const totalTransaction =
      totalData.getMatrixTableofOwnShopTotalTransactionData.map(
        (data: { sourcetype: any; ach: any; product: any }) => {
          return {
            sourcetype: data.sourcetype,
            ach: data.ach,
            product: data.product,
          };
        },
      );

    return [...totalTransaction];
  }

  @Query(() => [DashboardDTO])
  async getOwnShopChannelContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getOwnShopChannelContribution({
      startdate,
      enddate,
    });
    return result.getOwnShopChannelContributionData.map(
      (data: { sourcetype: any; revenue_growths: any }) => {
        return {
          sourcetype: data.sourcetype,
          revenue_growths: data.revenue_growths,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getOwnShopProductContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getOwnShopProductContribution({
      startdate,
      enddate,
    });
    return result.getOwnShopProductContributionData.map(
      (data: { revenue_growths: any; product: any }) => {
        return {
          revenue_growths: data.revenue_growths,
          product: data.product,
        };
      },
    );
  }


  @Query(() => [DashboardDTO])
  async getOwnShopRevenueGrowth(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
    @Args('groupby', { nullable: true }) groupby: string,
  ) {
    const result = await this.appService.getOwnShopRevenueGrowth({
      startdate,
      enddate,
      groupby,
    });
    return result.getDataOwnShopRevenueGrowth.map(
      (data: { revenue_growths: any; periode: any }) => {
        return {
          revenue_growths: data.revenue_growths,
          periode: data.periode,
        };
      },
    );
  }


  @Query(() => [DashboardDTO])
  async getMatrixTableofOwnShopCommerceTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const transactionData =
      await this.appService.getMatrixTableofOwnShopCommerceTransaction({
        startdate,
        enddate,
      });

    const result =
      transactionData.getMatrixTableofOwnShopCommerceTransactionData.map(
        (data: { sourcetype: any; ach: any; product: any }) => {
          return {
            sourcetype: data.sourcetype,
            ach: data.ach,
            product: data.product,
          };
        },
      );

    return [...result];
  }
  @Query(() => [DashboardDTO])
  async getMatrixTableofTotalOwnShopCommerceTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const totalData =
      await this.appService.getMatrixTableofOwnShopCommerceTransaction({
        startdate,
        enddate,
      });

    const totalTransaction =
      totalData.getMatrixTableofOwnShopCommerceTotalTransactionData.map(
        (data: { sourcetype: any; ach: any; product: any }) => {
          return {
            sourcetype: data.sourcetype,
            ach: data.ach,
            product: data.product,
          };
        },
      );

    return [...totalTransaction];
  }

  @Query(() => [DashboardDTO])
  async getOwnShopCommerceContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getOwnShopCommerceContribution({
      startdate,
      enddate,
    });
    return result.getOwnShopCommerceContributionData.map(
      (data: { sourcetype: any; ach: any }) => {
        return {
          sourcetype: data.sourcetype,
          ach: data.ach,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getOwnShopCommerceProductContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getOwnShopCommerceProductContribution({
      startdate,
      enddate,
    });
    return result.getOwnShopCommerceProductContributionData.map(
      (data: { sourcetype: any; ach: any }) => {
        return {
          sourcetype: data.sourcetype,
          ach: data.ach,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getOwnShopCommerceMostSoldProduct(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getOwnShopCommerceMostSoldProduct({
      startdate,
      enddate,
    });
    return result.getOwnShopCommerceMostSoldProductData.map(
      (data: { sourcetype: any; Percentage_of_revenue_growths: any }) => {
        return {
          sourcetype: data.sourcetype,
          Percentage_of_revenue_growths: data.Percentage_of_revenue_growths,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getRevenueGrowthPerCommerce(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
    @Args('groupby', { nullable: true }) groupby: string,
  ) {
    const result = await this.appService.getRevenueGrowthPerCommerce({
      startdate,
      enddate,
      groupby,
    });
    return result.getDataRevenueGrowthPerCommerce.map(
      (data: { sourcetype: any; revenue_growths: any; periode: any }) => {
        return {
          sourcetype: data.sourcetype,
          revenue_growths: data.revenue_growths,
          periode: data.periode,
        };
      },
    );
  }


  @Query(() => [DashboardDTO])
  async getMatrixTableofOwnShopCornerTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const transactionData =
      await this.appService.getMatrixTableofOwnShopCornerTransaction({
        startdate,
        enddate,
      });

    const result =
      transactionData.getMatrixTableofOwnShopCornerTransactionData.map(
        (data: { sourcetype: any; ach: any; product: any }) => {
          return {
            sourcetype: data.sourcetype,
            ach: data.ach,
            product: data.product,
          };
        },
      );

    return [...result];
  }
  @Query(() => [DashboardDTO])
  async getMatrixTableofTotalOwnShopCornerTransaction(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const totalData =
      await this.appService.getMatrixTableofOwnShopCornerTransaction({
        startdate,
        enddate,
      });

    const totalTransaction =
      totalData.getMatrixTableofOwnShopCornerTotalTransactionData.map(
        (data: { sourcetype: any; ach: any; product: any }) => {
          return {
            sourcetype: data.sourcetype,
            ach: data.ach,
            product: data.product,
          };
        },
      );

    return [...totalTransaction];
  }

  @Query(() => [DashboardDTO])
  async getOwnShopCornerContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getOwnShopCornerContribution({
      startdate,
      enddate,
    });
    return result.getOwnShopCornerContributionData.map(
      (data: { sourcetype: any; ach: any }) => {
        return {
          sourcetype: data.sourcetype,
          ach: data.ach,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getOwnShopCornerProductContribution(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getOwnShopCornerProductContribution({
      startdate,
      enddate,
    });
    return result.getOwnShopCornerProductContributionData.map(
      (data: { sourcetype: any; ach: any }) => {
        return {
          sourcetype: data.sourcetype,
          ach: data.ach,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getOwnShopCornerMostSoldProduct(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
  ) {
    const result = await this.appService.getOwnShopCornerMostSoldProduct({
      startdate,
      enddate,
    });
    return result.getOwnShopCornerMostSoldProductData.map(
      (data: { sourcetype: any; Percentage_of_revenue_growths: any }) => {
        return {
          sourcetype: data.sourcetype,
          Percentage_of_revenue_growths: data.Percentage_of_revenue_growths,
        };
      },
    );
  }

  @Query(() => [DashboardDTO])
  async getRevenueGrowthPerCorner(
    @Args('startdate', { nullable: true }) startdate: string,
    @Args('enddate', { nullable: true }) enddate: string,
    @Args('groupby', { nullable: true }) groupby: string,
  ) {
    const result = await this.appService.getRevenueGrowthPerCorner({
      startdate,
      enddate,
      groupby,
    });
    return result.getDataRevenueGrowthPerCorner.map(
      (data: { sourcetype: any; revenue_growths: any; periode: any }) => {
        return {
          sourcetype: data.sourcetype,
          revenue_growths: data.revenue_growths,
          periode: data.periode,
        };
      },
    );
  }
}
