import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from '../users/users.module';
import { HashModule } from '../../common/resources/hash/hash.module';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './domain/auth.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ConfigServiceConstants } from '../../../config/config-service.constants';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>(ConfigServiceConstants.JWT_SECRET),
          signOptions: { expiresIn: '8h' },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
    UsersModule,
    HashModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
