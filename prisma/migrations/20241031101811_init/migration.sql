/*
  Warnings:

  - Added the required column `name` to the `production` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "production" ADD COLUMN     "name" TEXT NOT NULL;
