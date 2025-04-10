import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RagModule } from './rag/rag.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 설정하면 어디서든 process.env 사용 가능
    }),
    RagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
