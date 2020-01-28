import { AppService } from './app.service';
import { Controller, Request, UseGuards, Post, Get, Delete , Put, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { UserBody } from './users/user';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async create(@Body() user :UserBody) {
     return this.authService.create(user);
  }

  @Get('auth/getusers')
  async getUsers() {
     return this.usersService.getUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
