import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RequirePermissions } from 'src/core/decorators/permission.decorator';
import { PermissionName } from 'src/enums/permissions.enum';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @RequirePermissions([PermissionName.CREATE_ROLE])
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @RequirePermissions([PermissionName.VIEW_ROLE])
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @RequirePermissions([PermissionName.VIEW_ROLE])
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions([PermissionName.EDIT_ROLE])
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @RequirePermissions([PermissionName.DELETE_ROLE])
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
