import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Id task',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Detail task',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  detail: string;
}
