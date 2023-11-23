/*
  Warnings:

  - You are about to alter the column `message_type` on the `Messages` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.
  - You are about to alter the column `role` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Messages` MODIFY `message_type` ENUM('image', 'audio', 'text', 'url') NOT NULL DEFAULT 'text';

-- AlterTable
ALTER TABLE `Users` MODIFY `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
