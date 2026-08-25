import { Module } from "@nestjs/common";

import { AuthModule } from "./modules/auth/auth.module";
import { SetupModule } from "./modules/setup/setup.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, AuthModule, SetupModule],
})
export class AppModule {}
