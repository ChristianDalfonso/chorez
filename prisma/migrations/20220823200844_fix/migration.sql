-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_groupId_fkey";

-- DropForeignKey
ALTER TABLE "SubGroup" DROP CONSTRAINT "SubGroup_groupId_fkey";

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubGroup" ADD CONSTRAINT "SubGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
