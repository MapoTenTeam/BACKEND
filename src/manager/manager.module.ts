import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature()],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
