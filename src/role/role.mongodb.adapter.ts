import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './entities/role.entity';
import { RoleRepository } from './role.repository';
import { Permission } from 'src/permission/entities/permission.entity';

@Injectable()
export class RoleMongoDbAdapter implements RoleRepository {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleModel.create(createRoleDto);
  }
  getAllRole(): Promise<Role[]> {
    return this.roleModel.find({});
  }

  getRoleByName(name: string): Promise<Role[]> {
    return this.roleModel.find({ name });
  }

  async getAllPermissionByRoleIds(roleIds: string[]): Promise<string[]> {
    const allRoles: Role[] = await this.roleModel
      .find({})
      .populate('permissions');
    const filteredRoles = allRoles.filter((role) =>
      roleIds.includes(role._id?.toString() as string),
    );
    return filteredRoles
      .map((role: Role) => role.permissions)
      .flat()
      .map((permission) => (permission as unknown as Permission).name);
  }

  getRoleById(id: string): Promise<Role | null> {
    return this.roleModel.findById(id);
  }

  updateRoleById(
    id: string,
    updateRoleById: UpdateRoleDto,
  ): Promise<Role | null> {
    return this.roleModel.findByIdAndUpdate(id, updateRoleById);
  }

  deleteRoleById(id: string): Promise<Role | null> {
    return this.roleModel.findByIdAndDelete(id);
  }
}
