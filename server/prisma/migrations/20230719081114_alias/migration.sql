-- RedefineIndex
DROP INDEX "aliases_name_key";
CREATE UNIQUE INDEX "aliases_alias_key" ON "aliases"("alias");
