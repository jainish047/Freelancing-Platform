-- AlterTable
ALTER TABLE "clientIndividual" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumberVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "clientOrganization" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumberVerified" BOOLEAN NOT NULL DEFAULT false;
