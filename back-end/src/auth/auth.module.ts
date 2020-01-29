import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './jwt/local.strategy';
import { jwtConstants } from './jwt/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserController } from './controllers/user.controller';
import { authController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/models/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
  ],  
  controllers: [UserController,authController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports: [AuthService],
  
})
export class AuthModule {}
