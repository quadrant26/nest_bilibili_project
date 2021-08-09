import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  @Prop()
  @ApiProperty({ description: '手机号', example: '18688924563' })
  readonly number: string;

  @Prop()
  @ApiProperty({ description: '密码', example: '132456' })
  readonly password: string;
}
