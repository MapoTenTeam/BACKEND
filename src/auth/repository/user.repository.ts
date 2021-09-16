import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // async createPersonalUser(
  //   AuthCredentialsPersonalDto: AuthCredentialsPersonalDto,
  // ): Promise<void> {
  //   const { userId, password, usernickname, useremail } = AuthCredentialsPersonalDto;
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const user = this.create({
  //     userId,
  //     password: hashedPassword,
  //     usernickname,
  //     useremail,
  //     usertype: 1,
  //   });
  //   try {
  //     await this.save(user);
  //   } catch (error) {
  //     if (error.code === 'ER_DUP_ENTRY') {
  //       throw new ConflictException('Existing username');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }
  // async createEnterpriseUser(
  //   AuthCredentialsPersonalDto: AuthCredentialsPersonalDto,
  // ): Promise<void> {
  //   const { userId, password, usernickname, bizrno, useremail } =
  //     AuthCredentialsPersonalDto;
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const user = this.create({
  //     userId,
  //     password: hashedPassword,
  //     usernickname,
  //     bizrno,
  //     useremail,
  //     usertype: 2,
  //   });
  //   try {
  //     await this.save(user);
  //   } catch (error) {
  //     if (error.code === 'ER_DUP_ENTRY') {
  //       throw new ConflictException('Existing username');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }
  // async createPersonalUserDetail(
  //   createPersonalUserDto: CreatePersonalUserDto,
  //   user: User,
  // ): Promise<UserPersonal> {
  //   const { description } = createPersonalUserDto;
  //   const personalUser = this.create({
  //     description,
  //     user,
  //   });
  //   await this.save(personalUser);
  //   return personalUser;
  // }
}
