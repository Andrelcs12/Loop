import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import type { FastifyRequest } from "fastify";

import { AuthService } from "../../modules/auth/auth.service";
import type { AuthenticatedRequest } from "../types/authenticated-request.type";

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const accessToken = this.extractBearerToken(request.headers.authorization);

    if (!accessToken) {
      throw new UnauthorizedException("Envie um access token Bearer válido.");
    }

    (request as AuthenticatedRequest).supabaseUser = await this.authService.validateAccessToken(accessToken);
    return true;
  }

  private extractBearerToken(authorization?: string) {
    const [type, token, extra] = authorization?.trim().split(/\s+/) ?? [];
    return type === "Bearer" && token && !extra ? token : undefined;
  }
}
