import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { getConnection } from 'typeorm';
import { COMTNGNRLMBER } from './entities/user-personal.entity';
import { UserPersonalRepository } from './repository/user-personal-repository';

@Injectable()
export class PersonalJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: `${process.env.JWT_SECRET}`,

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { MBER_ID } = payload;

    const conn = getConnection();
    const [user] = await conn.query(
      `SELECT USER_ID FROM COMVNUSERMASTER WHERE USER_ID='${MBER_ID}'`,
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
