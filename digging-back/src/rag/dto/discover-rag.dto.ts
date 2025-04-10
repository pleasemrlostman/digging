import { IsString } from 'class-validator';

export class DiscoverRagDto {
  @IsString()
  targetA: string;

  @IsString()
  targetB: string;
}
