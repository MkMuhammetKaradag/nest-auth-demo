import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Users.name,
        // schema: UserSchema,
        useFactory: () => {
          const schema = UsersSchema;
          schema.pre('save', async function (done) {
            if (this.isModified('password')) {
              const salt = await bcrypt.genSalt();
              const password = await bcrypt.hash(this.get('password'), salt);
              this.set('password', password);
            }
            done();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
