/*
  Warnings:

  - Added the required column `password` to the `clientOrganization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientOrganization" ADD COLUMN     "active" BOOLEAN,
ADD COLUMN     "password" TEXT NOT NULL;
