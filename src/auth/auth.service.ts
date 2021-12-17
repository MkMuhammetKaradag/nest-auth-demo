import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersService.fidnOne(userName);
    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      console.log('Deneme', rest);
      return rest;
    }

    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    //console.log(user);
    return { access_token: this.jwtService.sign(payload) };
  }
}
