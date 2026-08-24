import { Injectable } from "@nestjs/common";
import type { User as SupabaseUser } from "@supabase/supabase-js";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MeService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateUser(authUser: SupabaseUser) {
    const metadata = authUser.user_metadata;
    const name = this.asOptionalString(metadata.full_name) ?? this.asOptionalString(metadata.name);
    const avatarUrl = this.asOptionalString(metadata.avatar_url);

    return this.prisma.user.upsert({
      where: { authUserId: authUser.id },
      create: {
        authUserId: authUser.id,
        email: authUser.email ?? "",
        name,
        avatarUrl,
      },
      update: {
        email: authUser.email ?? "",
        name,
        avatarUrl,
      },
    });
  }

  private asOptionalString(value: unknown) {
    return typeof value === "string" && value.length > 0 ? value : undefined;
  }
}
