import { Injectable } from '@nestjs/common'

@Injectable()
export class ShoppingServerService {
  getHello(): string {
    return 'Hello World!'
  }
}
