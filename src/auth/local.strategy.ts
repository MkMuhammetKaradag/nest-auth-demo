import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); //Config
  }

  async validate(userrname: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(userrname, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
