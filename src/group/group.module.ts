import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupGateway } from './group.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, groupSchema } from './entity/group.entity';
import { GROUP_REPOSITORY } from './group.repository';
import { GroupMongoDbAdapter } from './group.mongodb.adapter';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: groupSchema }]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [GroupController],
  providers: [
    GroupService,
    GroupGateway,
    { provide: GROUP_REPOSITORY, useClass: GroupMongoDbAdapter },
  ],
})
export class GroupModule {}
