import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ROLE_REPOSITORY, RoleRepository } from './role.repository';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  create(createRoleDto: CreateRoleDto): Promise<Role | null> {
    return this.roleRepository.createRole(createRoleDto);
  }

  findAll(): Promise<Role[] | null> {
    return this.roleRepository.getAllRole();
  }

  findAllPermissionByRoleIds(roleIds: string[]): Promise<string[]> {
    return this.roleRepository.getAllPermissionByRoleIds(roleIds);
  }

  findOne(id: string): Promise<Role | null> {
    return this.roleRepository.getRoleById(id);
  }

  update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    return this.roleRepository.updateRoleById(id, updateRoleDto);
  }

  remove(id: string): Promise<Role | null> {
    return this.roleRepository.deleteRoleById(id);
  }
}
