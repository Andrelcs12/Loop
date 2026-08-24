import { Module } from "@nestjs/common";

import { SupabaseAuthGuard } from "./supabase-auth.guard";
import { SupabaseAuthService } from "./supabase-auth.service";

@Module({
  providers: [SupabaseAuthGuard, SupabaseAuthService],
  exports: [SupabaseAuthGuard, SupabaseAuthService],
})
export class AuthModule {}
