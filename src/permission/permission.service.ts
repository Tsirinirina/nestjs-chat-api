import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import {
  PERMISSION_REPOSITORY,
  PermissionRepository,
} from './permission.repository';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionRepository.createPermission(createPermissionDto);
  }

  findAll(): Promise<Permission[]> {
    return this.permissionRepository.getAllPermission();
  }

  findOne(id: string): Promise<Permission | null> {
    return this.permissionRepository.getPermissionById(id);
  }

  update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission | null> {
    return this.permissionRepository.updatePermissionById(
      id,
      updatePermissionDto,
    );
  }

  remove(id: string): Promise<Permission | null> {
    return this.permissionRepository.deletePermissionById(id);
  }
}
