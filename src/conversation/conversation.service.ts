import { Inject, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entity/conversation.entity';
import {
  CONVERSATION_REPOSITORY,
  ConversationRepository,
} from './conversation.repository';

@Injectable()
export class ConversationService {
  constructor(
    @Inject(CONVERSATION_REPOSITORY)
    private readonly conversationRepository: ConversationRepository,
  ) {}
  createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    return this.conversationRepository.createConversation(
      createConversationDto,
    );
  }
  getConversationById(id: string): Promise<Conversation | null> {
    return this.conversationRepository.getConversationById(id);
  }
  deleteConversation(id: string): Promise<Conversation | null> {
    return this.conversationRepository.deleteConversation(id);
  }
  updateConversation(
    id: string,
    updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation | null> {
    return this.conversationRepository.updateConversation(
      id,
      updateConversationDto,
    );
  }
}
