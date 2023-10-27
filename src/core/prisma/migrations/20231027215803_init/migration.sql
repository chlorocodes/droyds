/*
  Warnings:

  - Added the required column `avatar` to the `authors` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_authors" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT '1152770278582124685',
    "username" TEXT NOT NULL DEFAULT 'Graype',
    "avatar" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_authors" ("id", "username") SELECT "id", "username" FROM "authors";
DROP TABLE "authors";
ALTER TABLE "new_authors" RENAME TO "authors";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
