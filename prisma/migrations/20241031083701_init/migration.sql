/*
  Warnings:

  - You are about to alter the column `estimated_time` on the `production` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `prod_time` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "production" ALTER COLUMN "estimated_time" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "prod_time" SET DATA TYPE INTEGER;
