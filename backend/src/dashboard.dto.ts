/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int, Float, Scalar } from '@nestjs/graphql';
import { GraphQLScalarType } from 'graphql';

@ObjectType()
export class DashboardDTO {
  @Field(() => String)
  sourcetype: string;

  @Field(() => Number)
  ach: number;

  @Field(() => Number)
  revenue_growths: number;

  @Field(() => Number)
  revenue_growth: number;

  @Field(() => Number)
  Percentage_of_revenue_growths: number;

  @Field(() => Int)
  bulan: number;

  @Field(() => Int)
  minggu: number;

  @Field(() => Date)
  hari: Date;

  @Field(() => ScalarType, { nullable: true })
  periode: Date | number;

  @Field(() => String)
  product: string;
}

const ScalarType = new GraphQLScalarType({
  name: 'Scalar',
  parseValue(value: any) {
    return value;
  },
  serialize(value: any) {
    return value;
  },
  parseLiteral(ast) {
    return ast;
  },
});
