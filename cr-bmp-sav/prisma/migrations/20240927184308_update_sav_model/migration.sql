/*
  Warnings:

  - Added the required column `corner` to the `SAV` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SAV" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "corner" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientContact" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "actualStatus" TEXT NOT NULL,
    "log" TEXT NOT NULL
);
INSERT INTO "new_SAV" ("actualStatus", "clientContact", "clientName", "id", "log", "product") SELECT "actualStatus", "clientContact", "clientName", "id", "log", "product" FROM "SAV";
DROP TABLE "SAV";
ALTER TABLE "new_SAV" RENAME TO "SAV";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
