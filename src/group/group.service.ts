import { Inject, Injectable } from '@nestjs/common';
import { GROUP_REPOSITORY, GroupRepository } from './group.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entity/group.entity';

@Injectable()
export class GroupService implements GroupRepository {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRepository: GroupRepository,
  ) {}

  createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupRepository.createGroup(createGroupDto);
  }
  getGroupById(id: string): Promise<Group | null> {
    return this.groupRepository.getGroupById(id);
  }
  getAllGroup(): Promise<Group[]> {
    return this.groupRepository.getAllGroup();
  }
  deleteGroup(id: string): Promise<Group | null> {
    return this.groupRepository.deleteGroup(id);
  }
  addNewParticipants(
    id: string,
    participantsIds: string[],
  ): Promise<Group | null> {
    return this.groupRepository.addNewParticipants(id, participantsIds);
  }
  removeParticipantById(
    id: string,
    participantId: string,
  ): Promise<Group | null> {
    return this.groupRepository.removeParticipantById(id, participantId);
  }
}
