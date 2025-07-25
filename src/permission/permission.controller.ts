import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionName } from 'src/enums/permissions.enum';
import { RequirePermissions } from 'src/core/decorators/permission.decorator';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @RequirePermissions([PermissionName.VIEW_PERMISSION])
  findAll() {
    return this.permissionService.findAll();
  }

  @Get('update')
  async updateAllPermission() {
    const oldPermissions = await this.findAll();
    for (const oldPermission of oldPermissions) {
      await this.permissionService.remove(
        oldPermission._id?.toString() as string,
      );
    }
    Array.from(Object.values(PermissionName)).forEach((item) =>
      this.permissionService.create({
        name: item,
      }),
    );
  }
}
