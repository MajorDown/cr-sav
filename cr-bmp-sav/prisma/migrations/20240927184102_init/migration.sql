-- CreateTable
CREATE TABLE "Corner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cornerName" TEXT NOT NULL,
    "cornerContact" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SAV" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientName" TEXT NOT NULL,
    "clientContact" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "actualStatus" TEXT NOT NULL,
    "log" TEXT NOT NULL
);
