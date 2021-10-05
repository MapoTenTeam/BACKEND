// import { EntityRepository, Repository } from 'typeorm';
// import { User } from '../entities/user.entity';
// import { UserEnterprise } from '../entities/user-enterprise.entity';
// import { CreateEnterpriseUserDto } from '../dto/create-enterprise-user.dto';

// @EntityRepository(UserEnterprise)
// export class UserEnterpriseDetailRepository extends Repository<UserEnterprise> {
//   async createEnterpriseUserDetail(
//     createEnterpriseUserDto: CreateEnterpriseUserDto,
//     user: User,
//   ): Promise<UserEnterprise> {
//     const { description } = createEnterpriseUserDto;

//     const enterpriseUser = this.create({
//       description,
//       user,
//     });

//     await this.save(enterpriseUser);
//     return enterpriseUser;
//   }
// }
