import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, permissionSchema } from './entities/permission.entity';
import { PERMISSION_REPOSITORY } from './permission.repository';
import { PermissionMongoDbAdapter } from './permission.mongodb.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Permission.name,
        schema: permissionSchema,
      },
    ]),
  ],
  controllers: [PermissionController],
  providers: [
    PermissionService,
    { provide: PERMISSION_REPOSITORY, useClass: PermissionMongoDbAdapter },
  ],
  exports: [PermissionService],
})
export class PermissionModule {}
