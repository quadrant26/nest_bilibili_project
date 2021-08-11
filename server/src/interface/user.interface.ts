import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  @Prop()
  @ApiProperty({ description: '手机号', example: '10000000001' })
  readonly phone: string;

  @Prop()
  @ApiProperty({ description: '密码', example: '123456' })
  readonly password: string;

  @Prop()
  readonly salt?: string;
}
