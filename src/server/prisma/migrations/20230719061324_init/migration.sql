-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT,
    "username" TEXT
);

-- CreateTable
CREATE TABLE "commands" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "response_type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "aliases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "command_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "aliases_command_id_fkey" FOREIGN KEY ("command_id") REFERENCES "commands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "commands_name_key" ON "commands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "aliases_name_key" ON "aliases"("name");
