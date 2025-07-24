/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DirectConversationService } from './direct-conversation.service';
import { forwardRef, Inject } from '@nestjs/common';
import { GetMessagesDto } from './dto/get-dc-dto';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class DirectConversationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => DirectConversationService))
    private readonly dcService: DirectConversationService,
  ) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;

    if (userId) {
      client.join(userId);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  async notifyNewDC(conversationId: string) {
    const newDc =
      await this.dcService.getDirectConversationsById(conversationId);

    this.server
      .to(newDc?.receiver._id.toString() as string)
      .emit('newDC', newDc);
    this.server.to(newDc?.sender._id.toString() as string).emit('newDC', newDc);
  }

  @SubscribeMessage('getMessagesByBoth')
  async handleGetMessagesByBoth(
    @MessageBody() payload: GetMessagesDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { senderId, receiverId } = payload;
    const messageHistory = await this.dcService.getDirectConversationsByBothId(
      senderId,
      receiverId,
    );
    client.emit('messageHistory', messageHistory);
  }
}
