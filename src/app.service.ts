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

    if (!apiKey) {
      throw new UnauthorizedException('A chave de API está faltando.');
    }

    if (apiKey !== process.env.APIKEY) {
      throw new UnauthorizedException('Chave de API Inválida.');
    }

    return true;
  }
}
