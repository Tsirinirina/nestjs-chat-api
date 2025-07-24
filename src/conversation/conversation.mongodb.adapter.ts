import { InjectModel } from '@nestjs/mongoose';
import { ConversationRepository } from './conversation.repository';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import {
  Conversation,
  ConversationDocument,
} from './entity/conversation.entity';
import { Model } from 'mongoose';

export class ConversationMongoDbAdapter implements ConversationRepository {
  constructor(
    @InjectModel(Conversation.name)
    private readonly groupModel: Model<ConversationDocument>,
  ) {}
  createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    return this.groupModel.create(createConversationDto);
  }
  getConversationById(id: string): Promise<Conversation | null> {
    return this.groupModel.findById(id);
  }
  deleteConversation(id: string): Promise<Conversation | null> {
    return this.groupModel.findByIdAndDelete(id);
  }
  updateConversation(
    id: string,
    updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation | null> {
    return this.groupModel.findByIdAndUpdate(id, {
      text: updateConversationDto.text,
    });
  }
}
