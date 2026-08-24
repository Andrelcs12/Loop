CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "authUserId" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "setupCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_authUserId_key" ON "users"("authUserId");
CREATE INDEX "users_email_idx" ON "users"("email");

ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "users" FROM anon, authenticated;
