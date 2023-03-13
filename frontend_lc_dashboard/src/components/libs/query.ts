import { gql } from "@apollo/client";



export const REVENUE_GROWTH = gql`
  query RevenueGrowth(
    $startDate: String!
    $endDate: String!
    $groupby: String!
  ) {
    getRevenueGrowth(
      startdate: $startDate
      enddate: $endDate
      groupby: $groupby
    ) {
      periode
      revenue_growths
    }
  }
`;

export const REVENUE_GROWTH_PER_SOURCE = gql`
  query RevenueGrowthPerSource(
    $startDate: String!
    $endDate: String!
    $groupby: String!
  ) {
    getRevenueGrowthPerSource(
      startdate: $startDate
      enddate: $endDate
      groupby: $groupby
    ) {
      sourcetype
      periode
      revenue_growths
    }
  }
`;

export const PRODUCT_RANKED = gql`
  query ProductRanked(
    $startDate: String!
    $endDate: String!
  ) {
    getProductRanked(
      startdate: $startDate
      enddate: $endDate
      
    ) {
      product
      revenue_growths
    }
  }
`;


export const TRANSACTION_TABLE_MATRIX = gql`
  query TransactionTable(
    $startDate: String!
    $endDate: String!
  ){
    getMatrixTableofTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
    getMatrixTableofTotalTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
  }
`;


export const CHANNEL_CONTRIBUTION = gql`
  query ChannelContribution($startDate: String!, $endDate: String!) {
    getChannelContribution(startdate: $startDate, enddate: $endDate) {
      sourcetype
      revenue_growths
    }
  }
`;


export const PRODUCT_CONTRIBUTION = gql`
  query ProductContribution(
    $startDate: String!
    $endDate: String!
  ) {
    getProductContribution(
      startdate: $startDate
      enddate: $endDate
    ) {
      product
      revenue_growths
    }
  }
`;


export const B2B_TRANSACTION_TABLE_MATRIX = gql`
  query B2BTransactionTable(
    $startDate: String!
    $endDate: String!
  ){
    getMatrixTableofB2BTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
    getMatrixTableofB2BTotalTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
  }
`;

export const B2B_CHANNEL_CONTRIBUTION = gql`
  query B2BChannelContribution($startDate: String!, $endDate: String!) {
    getB2BChannelContribution(startdate: $startDate, enddate: $endDate) {
      sourcetype
      revenue_growths
    }
  }
`;

export const B2B_PRODUCT_CONTRIBUTION = gql`
  query B2BProductContribution(
    $startDate: String!
    $endDate: String!
  ) {
    getProductContribution(
      startdate: $startDate
      enddate: $endDate
    ) {
      product
      revenue_growths
    }
  }
`;

export const B2B_REVENUE_GROWTH = gql`
  query B2BRevenueGrowth(
    $startDate: String!
    $endDate: String!
    $groupby: String!
  ) {
    getB2BRevenueGrowth(
      startdate: $startDate
      enddate: $endDate
      groupby: $groupby
    ) {
      periode
      revenue_growths
    }
  }
`;

export const B2B_CORPORAE_TRANSACTION_TABLE_MATRIX = gql`
  query B2BCorpTransactionTable(
    $startDate: String!
    $endDate: String!
  ){
    getMatrixTableofTotalB2BCorporateTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
    getMatrixTableofB2BCorporateTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
  }
`;

export const B2B_CORPORATE_PRODUCT_CONTRIBUTION = gql`
  query B2BCorporateProductContribution(
    $startDate: String!
    $endDate: String!
  ) {
    getB2BCorporateProductContribution(
      startdate: $startDate
      enddate: $endDate
    ) {
      product
      revenue_growths
    }
  }
`;

export const B2B_RETAIL_TRANSACTION_TABLE_MATRIX = gql`
  query B2BRetailTransactionTable(
    $startDate: String!
    $endDate: String!
  ){
    getMatrixTableofB2BRetailTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
    getMatrixTableofTotalB2BRetailTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
  }
`;

export const B2B_RETAIL_CONTRIBUTION = gql`
  query B2BRetailContribution($startDate: String!, $endDate: String!) {
    getB2BRetailContribution(startdate: $startDate, enddate: $endDate) {
      
      sourcetype
      revenue_growths
    }
  }
`;

export const B2B_ORDER_GROWTH_PER_RETAIL = gql`
  query B2BOrderGrowthPerRetail(
    $startDate: String!
    $endDate: String!
    $groupby: String!
  ) {
    getOrderGrowthPerRetail(
      startdate: $startDate
      enddate: $endDate
      groupby: $groupby
    ) {
      sourcetype
      revenue_growths
      periode
  }
}
`;

export const  B2B_RETAIL_PRODUCT_CONTRIBUTION = gql`
  query B2BRetailProductContribution($startDate: String!, $endDate: String!) {
    getB2BProductContributionRetail(startdate: $startDate, enddate: $endDate) {
      product
      Percentage_of_revenue_growths
    }
  }
`;

export const OWN_SHOP_TABLE_MATRIX = gql`
  query OwnShopTransactionTable(
    $startDate: String!
    $endDate: String!
  ){
    getMatrixTableofOwnShopTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
    getMatrixTableofTotalOwnShopTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
  }
`;


export const OWN_SHOP_CHANNEL_CONTRIBUTION = gql`
  query OwnShopChannelContribution($startDate: String!, $endDate: String!) {
    getOwnShopChannelContribution(startdate: $startDate, enddate: $endDate) {
      sourcetype
      revenue_growths
    }
  }
`;

export const OWN_SHOP__PRODUCT_CONTRIBUTION = gql`
  query OwnShopProductContribution(
    $startDate: String!
    $endDate: String!
  ) {
    getOwnShopProductContribution(
      startdate: $startDate
      enddate: $endDate
    ) {
      product
      revenue_growths
    }
  }
`;

export const OWN_SHOP_REVENUE_GROWTH = gql`
  query OwnShopRevenueGrowth(
    $startDate: String!
    $endDate: String!
    $groupby: String!
  ) {
    getOwnShopRevenueGrowth(
      startdate: $startDate
      enddate: $endDate
      groupby: $groupby
    ) {
      periode
      revenue_growths
    }
  }
`;

export const OWN_SHOP_COMMERCE_TABLE_MATRIX = gql`
  query OwnShopCommerceTransactionTable(
    $startDate: String!
    $endDate: String!
  ){
    getMatrixTableofOwnShopCommerceTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
    getMatrixTableofTotalOwnShopCommerceTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
  }
`;

export const OWN_SHOP_COMMERCE_PRODUCT_CONTRIBUTION = gql`
  query OwnShopCommerceProductContribution(
    $startDate: String!
    $endDate: String!
  ) {
    getOwnShopCommerceProductContribution(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
    }
  }
`;

export const OWN_SHOP_COMMERCE_CONTRIBUTION = gql`
  query OwnShopCommerceContribution($startDate: String!, $endDate: String!) {
    getOwnShopCommerceContribution(startdate: $startDate, enddate: $endDate) {
      sourcetype
      ach
    }
  }
`;

export const OWN_SHOP_COMMERCE_MOST_SOLD_PRODUCT = gql`
  query OwnShopCommerceMostSoldProduct($startDate: String!, $endDate: String!) {
    getOwnShopCommerceMostSoldProduct(startdate: $startDate, enddate: $endDate) {
      sourcetype
      Percentage_of_revenue_growths
    }
  }
`;

export const OWN_SHOP_COMMERCE_REVENUE_GROWTH_PER_CORNER = gql`
  query OwnShopCommerceOrderGrowthPerCorner(
    $startDate: String!
    $endDate: String!
    $groupby: String!
  ) {
    getRevenueGrowthPerCommerce(
      startdate: $startDate
      enddate: $endDate
      groupby: $groupby
    ) {
      sourcetype
      periode
      revenue_growths
    }
  }
`;

export const OWN_SHOP_CORNER_TABLE_MATRIX = gql`
  query OwnShopCornerTransactionTable(
    $startDate: String!
    $endDate: String!
  ){
    getMatrixTableofOwnShopCornerTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
    getMatrixTableofTotalOwnShopCornerTransaction(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
      product
    }
  }
`;

export const OWN_SHOP_CORNER_PRODUCT_CONTRIBUTION = gql`
  query OwnShopCornerProductContribution(
    $startDate: String!
    $endDate: String!
  ) {
    getOwnShopCornerProductContribution(
      startdate: $startDate
      enddate: $endDate
    ) {
      sourcetype
      ach
    }
  }
`;

export const OWN_SHOP_CORNER_CONTRIBUTION = gql`
  query OwnShopCornerContribution($startDate: String!, $endDate: String!) {
    getOwnShopCornerContribution(startdate: $startDate, enddate: $endDate) {
      sourcetype
      ach
    }
  }
`;

export const OWN_SHOP_CORNER_MOST_SOLD_PRODUCT = gql`
  query OwnShopCornerMostSoldProduct($startDate: String!, $endDate: String!) {
    getOwnShopCornerMostSoldProduct(startdate: $startDate, enddate: $endDate) {
      sourcetype
      Percentage_of_revenue_growths
    }
  }
`;

export const OWN_SHOP_CORNER_REVENUE_GROWTH_PER_CORNER = gql`
  query OwnShopCornerOrderGrowthPerCorner(
    $startDate: String!
    $endDate: String!
    $groupby: String!
  ) {
    getRevenueGrowthPerCorner(
      startdate: $startDate
      enddate: $endDate
      groupby: $groupby
    ) {
      sourcetype
      periode
      revenue_growths
    }
  }
`;
