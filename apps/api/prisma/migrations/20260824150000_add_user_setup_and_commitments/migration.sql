CREATE TYPE "SetupGoal" AS ENUM (
  'PRODUCTIVITY',
  'STUDY',
  'HEALTHY_HABITS',
  'MORE_FREE_TIME',
  'LIFE_ORGANIZATION'
);

CREATE TYPE "RoutinePeriod" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'ALL_DAY');
CREATE TYPE "AvailableTime" AS ENUM ('UNDER_30_MINUTES', 'FROM_30_TO_60_MINUTES', 'FROM_1_TO_2_HOURS', 'OVER_2_HOURS');
CREATE TYPE "CommitmentSource" AS ENUM ('SETUP');

CREATE TABLE "user_setups" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "goal" "SetupGoal",
  "routine" "RoutinePeriod",
  "availableTime" "AvailableTime",
  "currentStep" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "user_setups_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "user_setups_userId_key" UNIQUE ("userId"),
  CONSTRAINT "user_setups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "commitments" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "setupId" UUID,
  "title" TEXT NOT NULL,
  "startsAt" TIMESTAMP(3) NOT NULL,
  "source" "CommitmentSource" NOT NULL DEFAULT 'SETUP',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "commitments_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "commitments_setupId_key" UNIQUE ("setupId"),
  CONSTRAINT "commitments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "commitments_setupId_fkey" FOREIGN KEY ("setupId") REFERENCES "user_setups"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "commitments_userId_startsAt_idx" ON "commitments"("userId", "startsAt");

ALTER TABLE "user_setups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "commitments" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "user_setups", "commitments" FROM anon, authenticated;
