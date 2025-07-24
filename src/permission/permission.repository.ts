import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';
import { UpdatePermissionDto } from './dto/update-permission.dto';

export const PERMISSION_REPOSITORY = 'PERMISSION_REPOSITORY';

export interface PermissionRepository {
  createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission>;
  getAllPermission(): Promise<Permission[]>;
  getPermissionById(id: string): Promise<Permission | null>;
  updatePermissionById(
    id: string,
    updatePermissionById: UpdatePermissionDto,
  ): Promise<Permission | null>;
  deletePermissionById(id: string): Promise<Permission | null>;
}
