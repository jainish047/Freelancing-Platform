/*
  Warnings:

  - Added the required column `type` to the `list` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ListType" AS ENUM ('PROJECT', 'USER');

-- AlterTable
ALTER TABLE "list" ADD COLUMN     "type" "ListType" NOT NULL;

-- AlterTable
ALTER TABLE "listItem" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "listItem" ADD CONSTRAINT "listItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
