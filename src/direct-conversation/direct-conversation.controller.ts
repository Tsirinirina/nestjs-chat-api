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
import { RequirePermissions } from 'src/core/decorators/permission.decorator';
import { PermissionName } from 'src/enums/permissions.enum';

@Controller('direct-conversation')
export class DirectConversationController {
  constructor(private readonly dcService: DirectConversationService) {}

  @Post()
  @RequirePermissions([PermissionName.CREATE_DIRECT_CONVERSATION])
  createDirectConversation(
    @Body() createDCDto: CreateDCDto,
  ): Promise<DirectConversation> {
    return this.dcService.createDirectConversation(createDCDto);
  }

  @Get('both')
  @RequirePermissions([PermissionName.VIEW_DIRECT_CONVERSATION])
  getDirectConversationsByBothId(
    @Query('sender') senderId: string,
    @Query('receiver') receiverId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcService.getDirectConversationsByBothId(senderId, receiverId);
  }

  @Get(':id')
  @RequirePermissions([PermissionName.VIEW_DIRECT_CONVERSATION])
  getDirectConversationsById(
    @Param('id') id: string,
  ): Promise<DirectConversation | null> {
    return this.dcService.getDirectConversationsById(id);
  }

  @Get('conversation/:id')
  @RequirePermissions([PermissionName.VIEW_DIRECT_CONVERSATION])
  getDirectConversationsByConversationId(
    @Param('id') conversationId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcService.getDirectConversationsByConversationId(
      conversationId,
    );
  }

  @Get('sender/:id')
  @RequirePermissions([PermissionName.VIEW_DIRECT_CONVERSATION])
  getDirectConversationsBySenderId(
    @Param('id') senderId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcService.getDirectConversationsBySenderId(senderId);
  }

  @Get('receiver/:id')
  @RequirePermissions([PermissionName.VIEW_DIRECT_CONVERSATION])
  getDirectConversationsByReceiverId(
    @Param('id') receiverId: string,
  ): Promise<DirectConversation[] | []> {
    return this.dcService.getDirectConversationsByReceiverId(receiverId);
  }

  @Delete(':id')
  @RequirePermissions([PermissionName.DELETE_DIRECT_CONVERSATION])
  deleteDirectConversation(
    @Param('id') id: string,
  ): Promise<DirectConversation | null> {
    return this.dcService.deleteDirectConversation(id);
  }
}
