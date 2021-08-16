import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Project extends Document {
  @Prop()
  @ApiProperty({ description: '项目名称', example: '实验小学智慧化工具' })
  readonly name: string;

  @Prop()
  @ApiProperty({ description: '项目简介', example: '实验小学简介' })
  readonly description: string;
}
