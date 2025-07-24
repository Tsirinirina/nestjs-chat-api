import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DirectConversationService } from './direct-conversation.service';
import { CreateDCDto } from './dto/create-dc.dto';
import { DirectConversation } from './entity/direct-conversation.entity';

@Controller('direct-conversation')
export class DirectConversationController {
  constructor(private readonly dcService: DirectConversationService) {}

  @Post()
  createDirectConversation(
    @Body() createDCDto: CreateDCDto,
  ): Promise<DirectConversation> {
    return this.dcService.createDirectConversation(createDCDto);
  }

  @Get('both')
  getDirectConversationsByBothId(
    @Query('sender') senderId: string,
    @Query('receiver') receiverId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcService.getDirectConversationsByBothId(senderId, receiverId);
  }

  @Get(':id')
  getDirectConversationsById(
    @Param('id') id: string,
  ): Promise<DirectConversation | null> {
    return this.dcService.getDirectConversationsById(id);
  }

  @Get('conversation/:id')
  getDirectConversationsByConversationId(
    @Param('id') conversationId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcService.getDirectConversationsByConversationId(
      conversationId,
    );
  }

  @Get('sender/:id')
  getDirectConversationsBySenderId(
    @Param('id') senderId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcService.getDirectConversationsBySenderId(senderId);
  }

  @Get('receiver/:id')
  getDirectConversationsByReceiverId(
    @Param('id') receiverId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcService.getDirectConversationsByReceiverId(receiverId);
  }

  @Delete(':id')
  deleteDirectConversation(
    @Param('id') id: string,
  ): Promise<DirectConversation | null> {
    return this.dcService.deleteDirectConversation(id);
  }
}
