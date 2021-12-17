import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop(String)
  name: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop(String)
  password: string;

  @Prop(String)
  username: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
