import { RedisCacheService } from '@app/redis/redis-cache/redis-cache.service'
import { Injectable } from '@nestjs/common'
import NodeMediaServer from 'node-media-server'

@Injectable()
export class LiveService {
  private streams: any = {}

  constructor(private redisCacheService: RedisCacheService) {}

  // start() {
  //   this.nms.run()
  // }

  // stop() {
  //   this.nms.stop()
  // }

  async createStream(userId: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
    const config = {
      rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60,
      },
      http: {
        port: 8887,
        allow_origin: '*',
        mediaroot: '../media', // 存储转码后的视频文件的目录
      },
      // trans: {
      //   ffmpeg: ffmpegPath,
      //   tasks: [
      //     {
      //       app: 'live',
      //       mp4: true,
      //       mp4Flags: '[movflags=frag_keyframe+empty_moov]',
      //     },
      //   ],
      // },
      // fission: {
      //   ffmpeg: ffmpegPath,
      //   tasks: [
      //     {
      //       rule: 'live/*',
      //       model: [
      //         {
      //           ab: '96k',
      //           vb: '600k',
      //           vs: '640x360',
      //           vf: '20',
      //         },
      //       ],
      //     },
      //   ],
      // },
      trans: {
        ffmpeg: ffmpegPath,
        tasks: [
          {
            app: 'live',
            hls: true,
            hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            hlsKeep: false, // to prevent hls file delete after end the stream
            dash: true,
            dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
            dashKeep: false, // to prevent dash file delete after end the stream
          },
        ],
      },
    }
    if (this.streams[userId]) {
      return `rtmp://localhost/live/${userId}`
    }
    this.streams[userId] = new NodeMediaServer(config)
    this.streams[userId].run()
    const avv = `http://127.0.0.1:8887/live/${userId}.m3u8`
    await this.redisCacheService.cacheAddToSet('liveList', avv)

    return avv
  }

  async livelist() {
    return await this.redisCacheService.cacheGetSet('liveList')
  }
}
