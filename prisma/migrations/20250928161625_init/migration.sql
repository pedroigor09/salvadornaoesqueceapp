-- CreateTable
CREATE TABLE "victims" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "tribute" TEXT,
    "submittedBy" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "violence_data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "homicides" INTEGER NOT NULL DEFAULT 0,
    "latrocinio" INTEGER NOT NULL DEFAULT 0,
    "lesaoCorporal" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
