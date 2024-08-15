/*
  Warnings:

  - Added the required column `category` to the `food_options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `food_options` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "food_categories" AS ENUM ('STARTER', 'MAIN', 'DESSERT');

-- DropIndex
DROP INDEX "food_options_name_key";

-- AlterTable
ALTER TABLE "food_options" ADD COLUMN     "category" "food_categories" NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
