-- CreateTable
CREATE TABLE `Participants` (
    `id` VARCHAR(191) NOT NULL,
    `conversation_id` VARCHAR(191) NOT NULL,
    `users_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Participants_conversation_id_key`(`conversation_id`),
    UNIQUE INDEX `Participants_users_id_key`(`users_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Participants` ADD CONSTRAINT `Participants_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `Conversations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participants` ADD CONSTRAINT `Participants_users_id_fkey` FOREIGN KEY (`users_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
