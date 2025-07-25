import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PERMISSION_GUARD_KEY } from '../decorators/permission.decorator';
import { RoleService } from '../../role/role.service';
import { ErrorCode, ErrorMessage } from 'src/enums/response.error.message.enum';
import { BusinessException } from '../exceptions/business.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly roleService: RoleService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSION_GUARD_KEY,
      context.getHandler(),
    );

    // If no permission required => free access
    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const bearerToken: string = request.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      throw new BusinessException(
        ErrorCode.UNAUTHORIZED,
        ErrorMessage.INVALID_TOKEN,
        [],
      );
    }

    const token = bearerToken.replace('Bearer ', '');

    const user = await this.jwtService.verifyAsync(token);

    if (!user || !user.roles) {
      throw new BusinessException(
        ErrorCode.FORBIDDEN,
        ErrorMessage.USER_NOT_ALLOWED,
        [],
      );
    }

    const userPermissions = await this.roleService.findAllPermissionByRoleIds(
      user.roles,
    );

    const hasPermission = requiredPermissions.every((permissionName) =>
      userPermissions.includes(permissionName),
    );

    if (!hasPermission) {
      throw new BusinessException(
        ErrorCode.FORBIDDEN,
        ErrorMessage.UNAUTHORIZED,
        ['User does not have the required permissions'],
      );
    }

    return true;
  }
}
