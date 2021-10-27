import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { getConnection } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: `${process.env.JWT_SECRET}`,

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { USER_ID } = payload;
    const conn = getConnection();
    const [user] = await conn.query(
      `SELECT USER_ID FROM COMVNUSERMASTER WHERE USER_ID='${USER_ID}' AND USER_STTUS='P'`,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
