import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from '../domain/auth.service';
import { Public } from '../../../common/decorators/is-public.decorator';
import { ZodPipe } from '../../../common/pipes/zod-validation.pipe';
import { SignInDto, SignInSchema } from '@presentation/shared';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async create(@Body(new ZodPipe(SignInSchema)) body: SignInDto) {
    return this.authService.signIn(body);
  }
}
