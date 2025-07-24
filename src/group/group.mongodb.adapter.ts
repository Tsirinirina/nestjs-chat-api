import { InjectModel } from '@nestjs/mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group, GroupDocument } from './entity/group.entity';
import { GroupRepository } from './group.repository';
import { Model } from 'mongoose';

export class GroupMongoDbAdapter implements GroupRepository {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
  ) {}

  createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupModel.create(createGroupDto);
  }
  getGroupById(id: string): Promise<Group | null> {
    return this.groupModel.findById(id).populate('participants');
  }
  getAllGroup(): Promise<Group[]> {
    return this.groupModel.find({}).populate('participants');
  }
  deleteGroup(id: string): Promise<Group | null> {
    return this.groupModel.findByIdAndDelete(id);
  }
  addNewParticipants(
    id: string,
    participantsIds: string[],
  ): Promise<Group | null> {
    return this.groupModel
      .findByIdAndUpdate(
        id,
        {
          $addToSet: { participants: { $each: participantsIds } },
        },
        { new: true },
      )
      .populate('participants');
  }

  removeParticipantById(
    id: string,
    participantId: string,
  ): Promise<Group | null> {
    return this.groupModel.findByIdAndUpdate(
      id,
      {
        $pull: { participants: participantId },
      },
      { new: true },
    );
  }
}
