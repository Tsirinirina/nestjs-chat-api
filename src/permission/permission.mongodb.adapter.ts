import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './entities/permission.entity';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionMongoDbAdapter implements PermissionRepository {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return this.permissionModel.create(createPermissionDto);
  }
  getAllPermission(): Promise<Permission[]> {
    return this.permissionModel.find({});
  }

  getPermissionById(id: string): Promise<Permission | null> {
    return this.permissionModel.findById(id);
  }

  updatePermissionById(
    id: string,
    updatePermissionById: UpdatePermissionDto,
  ): Promise<Permission | null> {
    return this.permissionModel.findByIdAndUpdate(id, updatePermissionById);
  }

  deletePermissionById(id: string): Promise<Permission | null> {
    return this.permissionModel.findByIdAndDelete(id);
  }
}
