-- CreateTable
CREATE TABLE "developer" (
    "id" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "skills" TEXT[],
    "location" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "dateJoined" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientIndividual" (
    "id" TEXT NOT NULL,
    "organization" BOOLEAN NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "clientIndividual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientOrganization" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "industry" TEXT NOT NULL,

    CONSTRAINT "clientOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "developer_email_key" ON "developer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clientIndividual_email_key" ON "clientIndividual"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clientOrganization_companyName_key" ON "clientOrganization"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "clientOrganization_email_key" ON "clientOrganization"("email");
