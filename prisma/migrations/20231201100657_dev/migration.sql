-- CreateIndex
CREATE INDEX `conversation_id_index` ON `Messages`(`conversation_id`);

-- CreateIndex
CREATE INDEX `sender_id_index` ON `Messages`(`sender_id`);
