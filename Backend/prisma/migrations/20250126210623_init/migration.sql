-- AlterTable
ALTER TABLE "developer" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumberVerified" BOOLEAN NOT NULL DEFAULT false;
