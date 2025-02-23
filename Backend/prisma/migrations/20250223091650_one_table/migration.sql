/*
  Warnings:

  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `budget` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `client_type` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `project` table. All the data in the column will be lost.
  - You are about to drop the `clientIndividual` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clientOrganization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `developer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[assignedTo]` on the table `project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `budgetRange` to the `project` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `paymentMethod` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('HOURLY', 'FIXED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('WORK', 'HIRE');

-- AlterEnum
ALTER TYPE "ProjectStatus" ADD VALUE 'CANCELED';

-- AlterTable
ALTER TABLE "project" DROP CONSTRAINT "project_pkey",
DROP COLUMN "budget",
DROP COLUMN "client_id",
DROP COLUMN "client_type",
DROP COLUMN "created_at",
DROP COLUMN "project_id",
DROP COLUMN "updated_at",
ADD COLUMN     "assignedTo" TEXT,
ADD COLUMN     "budgetRange" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "documents" TEXT[],
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" "PaymentType" NOT NULL,
ADD COLUMN     "skillsRequired" TEXT[],
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ADD CONSTRAINT "project_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "clientIndividual";

-- DropTable
DROP TABLE "clientOrganization";

-- DropTable
DROP TABLE "developer";

-- DropEnum
DROP TYPE "ClientType";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "profilePic" TEXT,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "password" TEXT,
    "phoneNumber" TEXT,
    "bio" TEXT,
    "skills" TEXT[],
    "location" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "dob" TIMESTAMP(3),
    "languages" TEXT[],
    "experience" JSONB,
    "dateJoined" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneNumberVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bid" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "proposal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "project_assignedTo_key" ON "project"("assignedTo");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
