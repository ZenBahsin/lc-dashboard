import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [UsersResolver, PrismaService],
})
export class UsersModule {}
