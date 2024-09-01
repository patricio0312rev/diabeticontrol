/*
  Warnings:

  - Added the required column `value` to the `record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "record" ADD COLUMN     "value" TEXT NOT NULL;
