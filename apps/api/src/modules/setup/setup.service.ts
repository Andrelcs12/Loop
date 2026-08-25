import { BadRequestException, Injectable } from "@nestjs/common";
import type { User as SupabaseUser } from "@supabase/supabase-js";

import { AuthService } from "../auth/auth.service";
import { PrismaService } from "../../prisma/prisma.service";
import type { CompleteSetupDto } from "./dto/complete-setup.dto";
import type { UpdateSetupDto } from "./dto/update-setup.dto";

@Injectable()
export class SetupService {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async getSetup(authUser: SupabaseUser) {
    const user = await this.authService.resolveUser(authUser);
    const setup = await this.prisma.userSetup.findUnique({ where: { userId: user.id } });
    return { setup, setupCompleted: user.setupCompleted };
  }

  async updateSetup(authUser: SupabaseUser, dto: UpdateSetupDto) {
    const user = await this.authService.resolveUser(authUser);
    const setup = await this.prisma.userSetup.upsert({
      where: { userId: user.id },
      create: { userId: user.id, ...dto },
      update: dto,
    });

    return { setup, setupCompleted: user.setupCompleted };
  }

  async completeSetup(authUser: SupabaseUser, dto: CompleteSetupDto) {
    const user = await this.authService.resolveUser(authUser);
    const { initialCommitment, ...setupValues } = dto;

    if (initialCommitment && Number.isNaN(new Date(initialCommitment.startsAt).valueOf())) {
      throw new BadRequestException("A data do compromisso inicial é inválida.");
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const setup = await tx.userSetup.upsert({
        where: { userId: user.id },
        create: { userId: user.id, ...setupValues, currentStep: 4 },
        update: { ...setupValues, currentStep: 4 },
      });

      if (initialCommitment) {
        await tx.commitment.upsert({
          where: { setupId: setup.id },
          create: {
            userId: user.id,
            setupId: setup.id,
            title: initialCommitment.title.trim(),
            startsAt: new Date(initialCommitment.startsAt),
          },
          update: {
            title: initialCommitment.title.trim(),
            startsAt: new Date(initialCommitment.startsAt),
          },
        });
      }

      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: { setupCompleted: true },
      });

      return { setup, user: updatedUser };
    });

    return { setup: result.setup, setupCompleted: result.user.setupCompleted };
  }
}
