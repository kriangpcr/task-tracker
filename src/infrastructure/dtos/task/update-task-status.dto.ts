import { TaskStatus } from '@domain/model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: 'Id task',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Status task',
    enum: TaskStatus,
    required: true,
  })
  @IsNotEmpty()
  status: TaskStatus;
}
