/*
  Warnings:

  - You are about to drop the column `taskId` on the `SubGroup` table. All the data in the column will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `due` to the `SubGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `task` to the `SubGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubGroup" DROP CONSTRAINT "SubGroup_taskId_fkey";

-- DropIndex
DROP INDEX "SubGroup_taskId_key";

-- AlterTable
ALTER TABLE "SubGroup" DROP COLUMN "taskId",
ADD COLUMN     "due" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "task" TEXT NOT NULL;

-- DropTable
DROP TABLE "Task";
