/*
  Warnings:

  - You are about to drop the column `budgetRange` on the `project` table. All the data in the column will be lost.
  - Added the required column `maxBudget` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minBudget` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "budgetRange",
ADD COLUMN     "maxBudget" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "minBudget" DECIMAL(65,30) NOT NULL;
