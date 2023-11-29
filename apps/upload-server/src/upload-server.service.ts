import { Injectable } from '@nestjs/common'
import axios from 'axios'
import FormData from 'form-data'
@Injectable()
export class UploadService {
  async uploadFile(file) {
    // const uploadDir = join(__dirname, '../../image')
    // if (!existsSync(uploadDir)) {
    //   mkdirSync(uploadDir)
    // }
    // const fileName = `${Date.now()}-${file.originalname}`
    // const writeStream = createWriteStream(
    //   join(__dirname, '../../image', fileName),
    // )
    // writeStream.write(file.buffer)

    // return `/image/${fileName}`
    // 上传文件到gitee
    const formData = new FormData()
    formData.append('access_token', '385c392322e7cfce8d4b5a151e82d730')
    formData.append('message', 'Upload a file')
    formData.append('content', file.buffer.toString('base64'))
    const response = await axios({
      method: 'post',
      url: `https://gitee.com/api/v5/repos/jiuxiangyangguang/myimg/contents/tree/master/${
        file.originalname + Date.now()
      }`,
      data: formData,
    })

    return response.data.content.download_url
  }
}
