-- AlterTable
ALTER TABLE "project" ADD COLUMN     "inProjectPaymentMethod" TEXT,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "purpose" TEXT,
ALTER COLUMN "averageBidBudget" SET DEFAULT 0,
ALTER COLUMN "noOfBids" SET DEFAULT 0;
