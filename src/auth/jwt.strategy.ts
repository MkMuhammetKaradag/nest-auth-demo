import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    }); //Config
  }
  async validate(payload: any): Promise<any> {
    return {
      id: payload.sub,
      name: payload.name,
    };
  }

  // async validate(userrname: string, password: string): Promise<any> {
  //   const user = await this.authService.validateUser(userrname, password);

  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }

  //   return user;
  // }
}
