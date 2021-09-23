import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PersonalJwtStrategy } from './personal-jwt.strategy';
import { UserPersonalRepository } from './repository/user-personal-repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    TypeOrmModule.forFeature([UserPersonalRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, PersonalJwtStrategy],
  exports: [PersonalJwtStrategy, PassportModule],
})
export class AuthModule {}
