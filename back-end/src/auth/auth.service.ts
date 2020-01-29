
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/models/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>
    ) {}

    async validateUserMongo(usern: string, pass: string): Promise<any> {
      const user = await this.userModel.findOne({ username: usern });
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
  
    // post a single user
    async create(createUserDTO: CreateUserDto): Promise<User> {
      const newUser = await this.userModel(createUserDTO);
      return newUser.save();
  }
  
    async login(user: CreateUserDto) : Promise<any> {
      const payload = { username: user.username, sub: user._id, roles: user.roles};
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    async getHelloAdmin() {
      return "You are in the admin panel"
  }
}

  
