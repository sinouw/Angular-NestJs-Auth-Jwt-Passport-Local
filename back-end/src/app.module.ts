import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/authNestJs'),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
  ],
})
export class AppModule {}
