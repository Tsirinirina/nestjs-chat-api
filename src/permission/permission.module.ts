import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, permissionSchema } from './entities/permission.entity';
import { PERMISSION_REPOSITORY } from './permission.repository';
import { PermissionMongoDbAdapter } from './permission.mongodb.adapter';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Permission.name,
        schema: permissionSchema,
      },
    ]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [PermissionController],
  providers: [
    PermissionService,
    { provide: PERMISSION_REPOSITORY, useClass: PermissionMongoDbAdapter },
  ],
  exports: [PermissionService],
})
export class PermissionModule {}
