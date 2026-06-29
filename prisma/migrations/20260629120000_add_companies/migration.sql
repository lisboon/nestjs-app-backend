-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_slug_key" ON "companies"("slug");

-- CreateIndex
CREATE INDEX "companies_active_idx" ON "companies"("active");

-- Backfill: guarantee a default company so the required users.company_id can be set
INSERT INTO "companies" ("id", "name", "slug", "updated_at")
VALUES ('00000000-0000-4000-8000-000000000001', 'Default Company', 'default', CURRENT_TIMESTAMP)
ON CONFLICT ("slug") DO NOTHING;

-- AlterTable: add column as nullable first so existing rows can be backfilled
ALTER TABLE "users" ADD COLUMN "company_id" TEXT;

-- Backfill existing users into the default company
UPDATE "users" SET "company_id" = '00000000-0000-4000-8000-000000000001' WHERE "company_id" IS NULL;

-- Enforce NOT NULL once every row has a company
ALTER TABLE "users" ALTER COLUMN "company_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "users_company_id_idx" ON "users"("company_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
