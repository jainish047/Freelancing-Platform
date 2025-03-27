-- CreateTable
CREATE TABLE "like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listItem" (
    "id" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "like_userId_idx" ON "like"("userId");

-- CreateIndex
CREATE INDEX "like_projectId_idx" ON "like"("projectId");

-- CreateIndex
CREATE INDEX "bookmark_userId_idx" ON "bookmark"("userId");

-- CreateIndex
CREATE INDEX "bookmark_projectId_idx" ON "bookmark"("projectId");

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listItem" ADD CONSTRAINT "listItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listItem" ADD CONSTRAINT "listItem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
