-- CreateTable
CREATE TABLE "Droyd" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT,
    "username" TEXT
);

-- CreateTable
CREATE TABLE "server_states" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "server_id" TEXT NOT NULL,
    "current_story_id" TEXT NOT NULL,
    "last_author_id" TEXT NOT NULL,
    "last_word" TEXT NOT NULL,
    CONSTRAINT "server_states_current_story_id_fkey" FOREIGN KEY ("current_story_id") REFERENCES "stories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "server_states_last_author_id_fkey" FOREIGN KEY ("last_author_id") REFERENCES "authors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "is_complete" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "authors" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT '1311745612902957107',
    "username" TEXT NOT NULL DEFAULT 'Vybe',
    "avatar" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "words" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "discord_message_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "words_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "words_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "server_states_server_id_key" ON "server_states"("server_id");

-- CreateIndex
CREATE INDEX "words_story_id_idx" ON "words"("story_id");
