import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entity/group.entity';
import { RequirePermissions } from 'src/core/decorators/permission.decorator';
import { PermissionName } from 'src/enums/permissions.enum';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @RequirePermissions([PermissionName.VIEW_GROUP])
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.createGroup(createGroupDto);
  }

  @Get(':id')
  @RequirePermissions([PermissionName.VIEW_GROUP])
  getGroupById(@Param('id') id: string): Promise<Group | null> {
    return this.groupService.getGroupById(id);
  }

  @Get()
  @RequirePermissions([PermissionName.VIEW_GROUP])
  getAllGroup(): Promise<Group[]> {
    return this.groupService.getAllGroup();
  }

  @Delete(':id')
  @RequirePermissions([PermissionName.VIEW_GROUP])
  deleteGroup(@Param('id') id: string): Promise<Group | null> {
    return this.groupService.deleteGroup(id);
  }

  @Patch(':id/add-participants')
  @RequirePermissions([PermissionName.VIEW_GROUP])
  addNewParticipants(
    @Param('id') id: string,
    @Body() participantsIds: string[],
  ): Promise<Group | null> {
    return this.groupService.addNewParticipants(id, participantsIds);
  }

  @Patch(':id/remove-participant')
  @RequirePermissions([PermissionName.VIEW_GROUP])
  removeParticipantById(
    @Param('id') id: string,
    @Body() body: { participantId: string },
  ): Promise<Group | null> {
    return this.groupService.removeParticipantById(id, body.participantId);
  }
}
