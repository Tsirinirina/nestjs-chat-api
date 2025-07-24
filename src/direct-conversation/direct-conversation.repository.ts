import { CreateDCDto } from './dto/create-dc.dto';
import { DirectConversation } from './entity/direct-conversation.entity';

export const DIRECT_CONVERSATION_REPOSITORY = 'DIRECT_CONVERSATION_REPOSITORY';

export interface DirectConversationRepository {
  createDirectConversation(
    createDCDto: CreateDCDto,
  ): Promise<DirectConversation>;
  getDirectConversationsById(id: string): Promise<DirectConversation | null>;
  getDirectConversationsByConversationId(
    conversationId: string,
  ): Promise<DirectConversation[] | []>;
  getDirectConversationsByBothId(
    senderId: string,
    receiverId: string,
  ): Promise<DirectConversation[] | []>;
  getDirectConversationsBySenderId(
    senderId: string,
  ): Promise<DirectConversation[] | []>;
  getDirectConversationsByReceiverId(
    receiverId: string,
  ): Promise<DirectConversation[] | []>;
  deleteDirectConversation(id: string): Promise<DirectConversation | null>;
}
