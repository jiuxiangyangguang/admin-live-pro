import { Injectable } from '@nestjs/common'

@Injectable()
export class LiveServerService {
  getHello(): string {
    return 'Hello World!'
  }
}
