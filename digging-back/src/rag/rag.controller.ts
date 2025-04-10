import { Body, Controller, Post } from '@nestjs/common';
import { RagService } from './rag.service';
import { DiscoverRagDto } from './dto/discover-rag.dto';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post('discover')
  async Discover(@Body() discoverDto: DiscoverRagDto) {
    console.log(DiscoverRagDto);
    return this.ragService.postDiscover(discoverDto);
  }
}
