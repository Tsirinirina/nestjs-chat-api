import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { UpdateRoleDto } from './dto/update-role.dto';

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';

export interface RoleRepository {
  createRole(createRoleDto: CreateRoleDto): Promise<Role>;
  getAllRole(): Promise<Role[]>;
  getRoleByName(name: string): Promise<Role[]>;
  // getPaginatedRole(criteria: ListCriteria): Promise<Paginated<Role>>;
  getRoleById(id: string): Promise<Role | null>;
  getAllPermissionByRoleIds(roleIds: string[]): Promise<string[]>;
  updateRoleById(
    id: string,
    updateRoleById: UpdateRoleDto,
  ): Promise<Role | null>;
  deleteRoleById(id: string): Promise<Role | null>;
}
