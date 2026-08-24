import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

@Injectable()
export class SupabaseAuthService {
  private readonly client: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

    if (!url || !publishableKey) {
      throw new InternalServerErrorException("Supabase Auth não está configurado na API.");
    }

    this.client = createClient(url, publishableKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
  }

  async getUserFromAccessToken(accessToken: string): Promise<User> {
    const { data, error } = await this.client.auth.getUser(accessToken);

    if (error || !data.user) {
      throw new UnauthorizedException("Token de acesso inválido ou expirado.");
    }

    return data.user;
  }
}
