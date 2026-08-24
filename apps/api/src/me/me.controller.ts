import { Controller, Get, Req, UseGuards } from "@nestjs/common";

import type { AuthenticatedRequest } from "../auth/authenticated-request";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { MeService } from "./me.service";

@Controller()
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get("me")
  @UseGuards(SupabaseAuthGuard)
  async getMe(@Req() request: AuthenticatedRequest) {
    const user = await this.meService.getOrCreateUser(request.supabaseUser);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      setupCompleted: user.setupCompleted,
    };
  }
}
