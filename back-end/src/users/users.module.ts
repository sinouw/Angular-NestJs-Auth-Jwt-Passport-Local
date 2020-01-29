import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { DbUserService } from './services/dbusers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    
  ],
  providers: [
    DbUserService, 
    AdminService
  ],
  controllers: [],
  exports: [AdminService,DbUserService],
})
export class UsersModule {
  
}
