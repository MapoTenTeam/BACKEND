import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardsController } from './jobs.controller';
import { BoardsService } from './jobs.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature()],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
