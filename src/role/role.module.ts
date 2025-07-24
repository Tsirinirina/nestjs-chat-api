import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entities/role.entity';
import { ROLE_REPOSITORY } from './role.repository';
import { RoleMongoDbAdapter } from './role.mongodb.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  controllers: [RoleController],
  providers: [
    RoleService,
    { provide: ROLE_REPOSITORY, useClass: RoleMongoDbAdapter },
  ],
  exports: [RoleService],
})
export class RoleModule {}
