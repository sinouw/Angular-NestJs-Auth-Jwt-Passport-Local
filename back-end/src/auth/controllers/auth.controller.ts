import { Controller, Request, UseGuards, Post, Get, Delete , Put, Body, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from '../../users/models/create-user.dto';
import { DbUserService } from '../../users/services/dbusers.service';
import { MyAuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../jwt/roles.decorator';

@Controller('auth')
@Controller()
export class authController {
  constructor(
    private readonly authService: AuthService,
    ) {}


  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user._doc);
  }

  @Post('register')
  async create(@Body() user :CreateUserDto) {
     return this.authService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/gethello')
  @UseGuards(MyAuthGuard, RolesGuard)
  @Roles('admin')
  async getHelloAdmin(@Request() req) : Promise<string>  {
     return this.authService.getHelloAdmin();
  }


}
