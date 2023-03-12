-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Setlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "qrcode" TEXT NOT NULL DEFAULT '',
    "authorId" INTEGER,
    "categoryId" INTEGER,
    CONSTRAINT "Setlist_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Setlist_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Setlist" ("categoryId", "createdAt", "description", "id", "name", "qrcode", "updatedAt") SELECT "categoryId", "createdAt", "description", "id", "name", "qrcode", "updatedAt" FROM "Setlist";
DROP TABLE "Setlist";
ALTER TABLE "new_Setlist" RENAME TO "Setlist";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
