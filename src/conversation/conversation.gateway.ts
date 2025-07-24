/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class ConversationGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    return {
      client,
      payload,
    };
  }
}
