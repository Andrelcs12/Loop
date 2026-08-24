import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import type { FastifyRequest } from "fastify";

import type { AuthenticatedRequest } from "./authenticated-request";
import { SupabaseAuthService } from "./supabase-auth.service";

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly supabaseAuthService: SupabaseAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const authorization = request.headers.authorization;
    const accessToken = this.extractBearerToken(authorization);

    if (!accessToken) {
      throw new UnauthorizedException("Envie um access token Bearer válido.");
    }

    const supabaseUser = await this.supabaseAuthService.getUserFromAccessToken(accessToken);
    (request as AuthenticatedRequest).supabaseUser = supabaseUser;

    return true;
  }

  private extractBearerToken(authorization?: string) {
    const [type, token] = authorization?.split(" ") ?? [];
    return type === "Bearer" && token ? token : undefined;
  }
}
