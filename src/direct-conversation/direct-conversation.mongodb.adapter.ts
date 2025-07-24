import { InjectModel } from '@nestjs/mongoose';
import { DirectConversationRepository } from './direct-conversation.repository';
import { CreateDCDto } from './dto/create-dc.dto';
import {
  DirectConversation,
  DirectConversationDocument,
} from './entity/direct-conversation.entity';
import { Model } from 'mongoose';

export class DirectConversationMongoDbAdapter
  implements DirectConversationRepository
{
  constructor(
    @InjectModel(DirectConversation.name)
    private readonly dcModel: Model<DirectConversationDocument>,
  ) {}

  createDirectConversation(
    createDCDto: CreateDCDto,
  ): Promise<DirectConversation> {
    return this.dcModel.create(createDCDto);
  }

  getDirectConversationsByBothId(
    senderId: string,
    receiverId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcModel
      .find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId },
        ],
      })
      .sort({ createdAt: 1 })
      .populate(['sender', 'receiver', 'conversation']);
  }

  getDirectConversationsByConversationId(
    conversationId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcModel.find({ conversation: conversationId });
  }

  getDirectConversationsById(id: string): Promise<DirectConversation | null> {
    return this.dcModel
      .findById(id)
      .populate(['sender', 'receiver', 'conversation']);
  }

  getDirectConversationsBySenderId(
    senderId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcModel
      .find({ sender: senderId })
      .populate(['sender', 'receiver', 'conversation']);
  }

  getDirectConversationsByReceiverId(
    receiverId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcModel.find({ receiver: receiverId });
  }

  deleteDirectConversation(id: string): Promise<DirectConversation | null> {
    return this.dcModel.findByIdAndDelete(id);
  }
}
