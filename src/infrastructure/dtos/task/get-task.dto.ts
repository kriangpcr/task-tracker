import { TaskStatus } from '@domain/model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetTaskDto {
  @ApiProperty({
    description: 'Status task',
    enum: TaskStatus,
    required: false,
  })
  @IsOptional()
  status: TaskStatus;
}
