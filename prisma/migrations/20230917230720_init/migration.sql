-- CreateTable
CREATE TABLE "state" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "current_story_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "stories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "is_complete" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "authors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    CONSTRAINT "authors_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
