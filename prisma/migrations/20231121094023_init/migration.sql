-- AlterTable
ALTER TABLE `Users` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';
