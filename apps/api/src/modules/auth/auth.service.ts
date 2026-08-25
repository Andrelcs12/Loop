import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { createClient, type SupabaseClient, type User as SupabaseUser } from "@supabase/supabase-js";

import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AuthService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly prisma: PrismaService) {
    const url = process.env.SUPABASE_URL;
    const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

    if (!url || !publishableKey) {
      throw new InternalServerErrorException("Supabase Auth não está configurado na API.");
    }

    this.supabase = createClient(url, publishableKey, {
      auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
    });
  }

  async validateAccessToken(accessToken: string): Promise<SupabaseUser> {
    const { data, error } = await this.supabase.auth.getUser(accessToken);
    if (error || !data.user) throw new UnauthorizedException("Token de acesso inválido ou expirado.");
    return data.user;
  }

  async resolveUser(authUser: SupabaseUser) {
    const metadata = authUser.user_metadata;
    const name = this.asOptionalString(metadata.full_name) ?? this.asOptionalString(metadata.name);
    const avatarUrl = this.asOptionalString(metadata.avatar_url);

    return this.prisma.user.upsert({
      where: { authUserId: authUser.id },
      create: { authUserId: authUser.id, email: authUser.email ?? "", name, avatarUrl },
      update: { email: authUser.email ?? "", name, avatarUrl },
    });
  }

  private asOptionalString(value: unknown) {
    return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
  }
}
