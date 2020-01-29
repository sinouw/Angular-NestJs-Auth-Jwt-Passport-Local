import { AppService } from './app.service';
import { Controller, Request, UseGuards, Post, Get, Delete , Put, Body, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { UserBody } from './users/user';
import { AdminService } from './users/admin/admin.service';
import { RolesGuard } from './auth/guard/roles.guard';
import { Roles } from './auth/jwt/roles.decorator';
import { MyAuthGuard } from './auth/guard/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
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

  @Get('admin/gethello')
  @UseGuards(MyAuthGuard, RolesGuard)
  @Roles('admin')
  async getHelloAdmin(@Request() req) : Promise<string>  {
     return this.adminService.getHelloAdmin();
  }

}
