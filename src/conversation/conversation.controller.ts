import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entity/conversation.entity';
import { RequirePermissions } from 'src/core/decorators/permission.decorator';
import { PermissionName } from 'src/enums/permissions.enum';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @RequirePermissions([PermissionName.VIEW_CONVERSATION])
  createConversation(
    @Body() createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    return this.conversationService.createConversation(createConversationDto);
  }

  @Get(':id')
  @RequirePermissions([PermissionName.VIEW_CONVERSATION])
  getConversationById(@Param('id') id: string): Promise<Conversation | null> {
    return this.conversationService.getConversationById(id);
  }

  @Delete(':id')
  @RequirePermissions([PermissionName.VIEW_CONVERSATION])
  deleteConversation(@Param('id') id: string): Promise<Conversation | null> {
    return this.conversationService.deleteConversation(id);
  }

  @Patch(':id')
  @RequirePermissions([PermissionName.VIEW_CONVERSATION])
  updateConversation(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation | null> {
    return this.conversationService.updateConversation(
      id,
      updateConversationDto,
    );
  }
}
