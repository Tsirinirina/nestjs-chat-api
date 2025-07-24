import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../guard/permission.guard';

export const PERMISSION_GUARD_KEY = 'PRIVILEGE_GUARD_KEY';

export const RequirePermissions = (permissions: string[]) =>
  applyDecorators(
    SetMetadata(PERMISSION_GUARD_KEY, permissions),
    UseGuards(PermissionGuard),
  );
