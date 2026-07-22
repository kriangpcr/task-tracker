import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Detail task',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  detail: string;
}
