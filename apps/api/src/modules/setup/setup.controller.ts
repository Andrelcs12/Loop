import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import type { User as SupabaseUser } from "@supabase/supabase-js";

import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { SupabaseAuthGuard } from "../../common/guards/supabase-auth.guard";
import { CompleteSetupDto } from "./dto/complete-setup.dto";
import { UpdateSetupDto } from "./dto/update-setup.dto";
import { SetupService } from "./setup.service";

@Controller("setup")
@UseGuards(SupabaseAuthGuard)
export class SetupController {
  constructor(private readonly setupService: SetupService) {}

  @Get()
  getSetup(@CurrentUser() authUser: SupabaseUser) {
    return this.setupService.getSetup(authUser);
  }

  @Patch()
  updateSetup(@CurrentUser() authUser: SupabaseUser, @Body() dto: UpdateSetupDto) {
    return this.setupService.updateSetup(authUser, dto);
  }

  @Post("complete")
  completeSetup(@CurrentUser() authUser: SupabaseUser, @Body() dto: CompleteSetupDto) {
    return this.setupService.completeSetup(authUser, dto);
  }
}
