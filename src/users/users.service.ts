import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.Usert.dto';
import { Users, UsersDocument } from './schema/user.schema';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

const userProjection = {
  __v: false,
};
@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Muhamemt',
      username: 'Muhamemt',
      password: 'password',
    },
    {
      id: 2,
      name: 'Ali',
      username: 'Ali',
      password: 'password',
    },
  ];

  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}
  async fidnOne(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username }, userProjection);
    return {
      id: user._id,
      name: user.name,
      password: user.password,
      email: user.email,
    };

    // return this.users.find((user) => user.username == username);
  }

  async registerUser(user: CreateUserDto) {
    const newUser = new this.userModel(user);
    return await newUser.save();

    // return 'hello-User Service';
  }
}
