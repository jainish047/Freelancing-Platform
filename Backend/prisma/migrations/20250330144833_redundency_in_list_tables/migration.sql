/*
  Warnings:

  - A unique constraint covering the columns `[userId,projectId]` on the table `bookmark` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,projectId]` on the table `like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `list` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[listId,projectId,userId]` on the table `listItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "averageBidBudget" INTEGER,
ADD COLUMN     "noOfBids" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "bookmark_userId_projectId_key" ON "bookmark"("userId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "like_userId_projectId_key" ON "like"("userId", "projectId");

-- CreateIndex
CREATE INDEX "list_userId_idx" ON "list"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "list_userId_name_key" ON "list"("userId", "name");

-- CreateIndex
CREATE INDEX "listItem_listId_idx" ON "listItem"("listId");

-- CreateIndex
CREATE INDEX "listItem_projectId_idx" ON "listItem"("projectId");

-- CreateIndex
CREATE INDEX "listItem_userId_idx" ON "listItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "listItem_listId_projectId_userId_key" ON "listItem"("listId", "projectId", "userId");
