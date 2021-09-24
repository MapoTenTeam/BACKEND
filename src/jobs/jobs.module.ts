import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
// import { BoardRepository } from './jobs.repository';
import { BoardsController } from './jobs.controller';
import { BoardsService } from './jobs.service';

@Module({
  // imports: [TypeOrmModule.forFeature([BoardRepository]), AuthModule],
  imports: [AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
