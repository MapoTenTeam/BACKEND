import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserPersonal } from '../entities/user-personal.entity';
import { CreatePersonalUserDto } from '../dto/create-personal-user.dto';

@EntityRepository(UserPersonal)
export class UserPersonalDetailRepository extends Repository<UserPersonal> {
  async createPersonalUserDetail(
    createPersonalUserDto: CreatePersonalUserDto,
    user: User,
  ): Promise<UserPersonal> {
    const { description } = createPersonalUserDto;

    const personalUser = this.create({
      description,
      user,
    });

    await this.save(personalUser);
    return personalUser;
  }
}
