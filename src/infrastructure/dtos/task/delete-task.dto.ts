import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DeleteTaskDto {
  @ApiProperty({
    description: 'Id task',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
