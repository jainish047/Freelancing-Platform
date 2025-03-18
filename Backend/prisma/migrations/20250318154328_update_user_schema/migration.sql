/*
  Warnings:

  - You are about to alter the column `maxBudget` on the `project` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `minBudget` on the `project` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "project" ALTER COLUMN "maxBudget" SET DATA TYPE INTEGER,
ALTER COLUMN "minBudget" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'local';
