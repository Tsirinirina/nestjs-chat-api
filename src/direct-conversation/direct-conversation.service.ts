import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  DIRECT_CONVERSATION_REPOSITORY,
  DirectConversationRepository,
} from './direct-conversation.repository';
import { CreateDCDto } from './dto/create-dc.dto';
import { DirectConversation } from './entity/direct-conversation.entity';
import {
  CONVERSATION_REPOSITORY,
  ConversationRepository,
} from 'src/conversation/conversation.repository';
import { DirectConversationGateway } from './direct-conversation.gateway';

@Injectable()
export class DirectConversationService implements DirectConversationRepository {
  constructor(
    @Inject(DIRECT_CONVERSATION_REPOSITORY)
    private readonly dcRepository: DirectConversationRepository,
    @Inject(CONVERSATION_REPOSITORY)
    private readonly conversationRepository: ConversationRepository,
    @Inject(forwardRef(() => DirectConversationGateway))
    private readonly dcGateway: DirectConversationGateway,
  ) {}

  async createDirectConversation(
    createDCDto: CreateDCDto,
  ): Promise<DirectConversation> {
    const createdConversation =
      await this.conversationRepository.createConversation({
        text: createDCDto.conversation,
      });

    const newDc = await this.dcRepository.createDirectConversation({
      sender: createDCDto.sender,
      receiver: createDCDto.receiver,
      conversation: createdConversation._id?.toString() as string,
    });

    if (newDc) {
      await this.dcGateway.notifyNewDC(newDc._id?.toString() as string);
    }

    return newDc;
  }

  getDirectConversationsById(id: string): Promise<DirectConversation | null> {
    return this.dcRepository.getDirectConversationsById(id);
  }

  getDirectConversationsByBothId(
    senderId: string,
    receiverId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcRepository.getDirectConversationsByBothId(
      senderId,
      receiverId,
    );
  }

  getDirectConversationsByConversationId(
    conversationId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcRepository.getDirectConversationsByConversationId(
      conversationId,
    );
  }

  getDirectConversationsBySenderId(
    senderId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcRepository.getDirectConversationsBySenderId(senderId);
  }
  getDirectConversationsByReceiverId(
    receiverId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcRepository.getDirectConversationsByReceiverId(receiverId);
  }
  deleteDirectConversation(id: string): Promise<DirectConversation | null> {
    return this.dcRepository.deleteDirectConversation(id);
  }
}
