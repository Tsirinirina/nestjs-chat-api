import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entity/conversation.entity';

export const CONVERSATION_REPOSITORY = 'CONVERSATION_REPOSITORY';

export interface ConversationRepository {
  createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation>;
  getConversationById(id: string): Promise<Conversation | null>;
  deleteConversation(id: string): Promise<Conversation | null>;
  updateConversation(
    id: string,
    updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation | null>;
}
