import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminService } from './admin/admin.service';

@Module({
  providers: [UsersService, AdminService],
  exports: [UsersService,AdminService],
})
export class UsersModule {}
