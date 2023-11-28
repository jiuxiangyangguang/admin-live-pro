import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadServerService {
  getHello(): string {
    return 'Hello World!'
  }
}
