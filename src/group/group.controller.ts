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

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.createGroup(createGroupDto);
  }

  @Get(':id')
  getGroupById(@Param('id') id: string): Promise<Group | null> {
    return this.groupService.getGroupById(id);
  }

  @Get()
  getAllGroup(): Promise<Group[]> {
    return this.groupService.getAllGroup();
  }

  @Delete(':id')
  deleteGroup(@Param('id') id: string): Promise<Group | null> {
    return this.groupService.deleteGroup(id);
  }

  @Patch(':id/add-participants')
  addNewParticipants(
    @Param('id') id: string,
    @Body() participantsIds: string[],
  ): Promise<Group | null> {
    return this.groupService.addNewParticipants(id, participantsIds);
  }

  @Patch(':id/remove-participant')
  removeParticipantById(
    @Param('id') id: string,
    @Body() body: { participantId: string },
  ): Promise<Group | null> {
    return this.groupService.removeParticipantById(id, body.participantId);
  }
}
