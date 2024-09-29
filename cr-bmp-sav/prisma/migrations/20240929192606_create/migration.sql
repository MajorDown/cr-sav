/*
  Warnings:

  - You are about to drop the column `actualStatus` on the `SAV` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Refurbishment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "corner" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "log" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SAV" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "corner" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientContact" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "log" TEXT NOT NULL
);
INSERT INTO "new_SAV" ("clientContact", "clientName", "corner", "id", "log", "product") SELECT "clientContact", "clientName", "corner", "id", "log", "product" FROM "SAV";
DROP TABLE "SAV";
ALTER TABLE "new_SAV" RENAME TO "SAV";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
