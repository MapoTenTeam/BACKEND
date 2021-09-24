import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './jobs/jobs.module';
import { User } from './auth/entities/user.entity';
// import { Board } from './jobs/jobs.entity';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { COMTNGNRLMBER } from './auth/entities/user-personal.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [COMTNGNRLMBER], // 사용할 entity의 클래스명을 넣어둔다.
      synchronize: false, // false로 해두는 게 안전하다.
    }),
    AuthModule,
    BoardsModule,
    BookmarksModule,
  ],
})
export class AppModule {}
