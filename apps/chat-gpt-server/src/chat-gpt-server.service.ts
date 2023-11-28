import { Injectable } from '@nestjs/common'

@Injectable()
export class ChatGptServerService {
  getHello(): string {
    return 'Hello World!'
  }
}
