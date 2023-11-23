-- AlterTable
ALTER TABLE `Conversations` MODIFY `channel_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Messages` MODIFY `attachment_thumb_url` VARCHAR(191) NULL,
    MODIFY `attachment_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `verification_code` VARCHAR(191) NULL;
