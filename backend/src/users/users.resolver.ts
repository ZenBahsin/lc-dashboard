import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  // @Mutation(() => User)
  // async createUser(
  //   @Args('UserCreateInput') createUserInput: CreateUserInput,
  // ): Promise<User> {
  //   return await this.prisma.user.create({
  //     data: { ...createUserInput },
  //   });
  // }

  // @Query(() => [User], { name: 'users' })
  // async findAll() {
  //   return this.prisma.user.findMany();
  // }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.prisma.user.findUnique({ where: { id: Number(id) } });
  // }

  // @Mutation(() => User)
  // async updateUser(
  //   @Args('updateUserInput') updateUserInput: UpdateUserInput,
  // ): Promise<User> {
  //   return this.prisma.user.update({
  //     where: { id: Number(updateUserInput.id) },
  //     data: { ...updateUserInput },
  //   });
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.prisma.user.delete({
  //     where: { id: Number(id) },
  //   });
  // }
}
