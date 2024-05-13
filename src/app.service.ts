import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const apiKey = request.headers['api-key'];

    if (!apiKey && !(process.env.BYPASS_APIKEY == 'true')) {
      throw new UnauthorizedException('A chave de API está faltando.');
    }

    if (
      apiKey !== process.env.APIKEY &&
      !(process.env.BYPASS_APIKEY == 'true')
    ) {
      throw new UnauthorizedException('Chave de API Inválida.');
    }

    return true;
  }
}
