/*
  Warnings:

  - The `chosen_food_option` column on the `plus_one` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `chosen_food_option` column on the `rsvp` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `food_allocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "food_allocation" DROP CONSTRAINT "food_allocation_food_option_id_fkey";

-- DropForeignKey
ALTER TABLE "food_allocation" DROP CONSTRAINT "food_allocation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "plus_one" DROP CONSTRAINT "plus_one_chosen_food_option_fkey";

-- DropForeignKey
ALTER TABLE "rsvp" DROP CONSTRAINT "rsvp_chosen_food_option_fkey";

-- AlterTable
ALTER TABLE "plus_one" DROP COLUMN "chosen_food_option",
ADD COLUMN     "chosen_food_option" INTEGER[];

-- AlterTable
ALTER TABLE "rsvp" DROP COLUMN "chosen_food_option",
ADD COLUMN     "chosen_food_option" INTEGER[];

-- DropTable
DROP TABLE "food_allocation";
