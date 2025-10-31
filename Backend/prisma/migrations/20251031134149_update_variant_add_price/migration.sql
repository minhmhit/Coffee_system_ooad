/*
  Warnings:

  - You are about to drop the column `value` on the `variants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `variants` DROP COLUMN `value`,
    ADD COLUMN `additionalPrice` DECIMAL(65, 30) NOT NULL DEFAULT 0;
