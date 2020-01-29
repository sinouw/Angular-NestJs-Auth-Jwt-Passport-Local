import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserBody } from 'src/users/models/user';
import { Controller, Request, UseGuards, Post, Get, Delete, Put, Body, SetMetadata } from '@nestjs/common';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, ) {

  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    
    const hasRole = user.roles.some(it => roles.includes(it))
    return user && user.roles && hasRole;
  }
}