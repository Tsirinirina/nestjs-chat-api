import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entity/group.entity';

export const GROUP_REPOSITORY = 'GROUP_REPOSITORY';

export interface GroupRepository {
  createGroup(createGroupDto: CreateGroupDto): Promise<Group>;
  getGroupById(id: string): Promise<Group | null>;
  getAllGroup(): Promise<Group[]>;
  deleteGroup(id: string): Promise<Group | null>;
  addNewParticipants(
    id: string,
    participantsIds: string[],
  ): Promise<Group | null>;
  removeParticipantById(
    id: string,
    participantId: string,
  ): Promise<Group | null>;
}
