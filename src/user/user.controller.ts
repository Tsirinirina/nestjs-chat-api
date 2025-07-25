import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password-dto';
import { RequirePermissions } from 'src/core/decorators/permission.decorator';
import { PermissionName } from 'src/enums/permissions.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @RequirePermissions([PermissionName.CREATE_USER])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @RequirePermissions([PermissionName.VIEW_USER])
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @RequirePermissions([PermissionName.VIEW_USER])
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Patch(':id')
  @RequirePermissions([PermissionName.EDIT_USER])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @RequirePermissions([PermissionName.DELETE_USER])
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('request-password-reset')
  @RequirePermissions([PermissionName.CREATE_USER])
  requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    return this.userService.requestPasswordReset(requestPasswordResetDto.email);
  }

  @Post('reset-password')
  @RequirePermissions([PermissionName.CREATE_USER])
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.userService.resetPassword(
      resetPasswordDto.password,
      resetPasswordDto.token,
    );
  }
}
