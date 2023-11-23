/*
  Warnings:

  - You are about to drop the column `receiveuserID` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sendserID` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `_ingroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userID` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_receiveuserID_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_sendserID_fkey`;

-- DropForeignKey
ALTER TABLE `_ingroup` DROP FOREIGN KEY `_ingroup_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ingroup` DROP FOREIGN KEY `_ingroup_B_fkey`;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `receiveuserID`,
    DROP COLUMN `sendserID`,
    ADD COLUMN `userID` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_ingroup`;

-- CreateTable
CREATE TABLE `UserInGroup` (
    `userId` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `addedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `addedID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `groupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInGroup` ADD CONSTRAINT `UserInGroup_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInGroup` ADD CONSTRAINT `UserInGroup_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInGroup` ADD CONSTRAINT `UserInGroup_addedID_fkey` FOREIGN KEY (`addedID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
