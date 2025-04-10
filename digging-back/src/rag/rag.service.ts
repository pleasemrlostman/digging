import { Injectable } from '@nestjs/common';
import { DiscoverRagDto } from './dto/discover-rag.dto';
import OpenAI from 'openai';

@Injectable()
export class RagService {
  async postDiscover(discoverDto: DiscoverRagDto) {
    console.log(discoverDto);
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            '당신은 전세계의 모든 아티스트를 알고 있는 거대한 데이터베이스 입니다. 그리고 그 데이터베이스를 관장하는 아주 고상한 취향을 가진 피치포크 평론가 입니다. 이 점을 기억하세요.',
        },
        {
          role: 'user',
          content: `당신은 ${discoverDto.targetA}의 ${discoverDto.targetB} 를 비교하여 둘의 음악적 또는 장르적 공통점을 찾아 내, 이 둘과 유사한 새로운 아티스트를 한명만 추천해 주세요. 대신 응답은 간결하게 ***아티스트 이름*** 만 있으면 됩니다.
          그리고 추천한 아티스트의 가장 유명한 곡 3곡을 추천해 주세요. 대신 응답은 간결하게 ***곡 제목*** 만 있으면 됩니다.
          외국인이면 영어로, 한국인이면 한국어로 대답해 주세요.
          `,
        },
      ],
    });

    return response.choices[0].message.content;
  }
}
