import { Controller, Get, UseGuards } from "@nestjs/common";
import type { User as SupabaseUser } from "@supabase/supabase-js";

import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { SupabaseAuthGuard } from "../../common/guards/supabase-auth.guard";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("me")
  @UseGuards(SupabaseAuthGuard)
  async getMe(@CurrentUser() authUser: SupabaseUser) {
    const user = await this.authService.resolveUser(authUser);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      setupCompleted: user.setupCompleted,
    };
  }
}
