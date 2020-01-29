
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserBody } from 'src/users/user';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserBody) : Promise<any> {
    const payload = { username: user.username, sub: user.userId, roles: user.roles};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async create(user:UserBody) : Promise<any> {
    if (!user){
      return "400 : Enter a correct user .."
    }
    else{
        return this.usersService.createOne(user)        
      }
    }
}

  
