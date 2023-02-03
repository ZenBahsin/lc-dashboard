import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Number, { description: 'id of the user' })
  id: number;

  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @Field(() => Boolean, { description: 'isActive of the user' })
  isActive: boolean;
}
