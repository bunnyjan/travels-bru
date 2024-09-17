/*
  Warnings:

  - You are about to drop the column `addresss` on the `Place` table. All the data in the column will be lost.
  - Added the required column `address` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Place` DROP COLUMN `addresss`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;
