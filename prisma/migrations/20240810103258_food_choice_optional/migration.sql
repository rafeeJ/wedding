-- DropForeignKey
ALTER TABLE "plus_one" DROP CONSTRAINT "plus_one_chosen_food_option_fkey";

-- DropForeignKey
ALTER TABLE "rsvp" DROP CONSTRAINT "rsvp_chosen_food_option_fkey";

-- AlterTable
ALTER TABLE "plus_one" ALTER COLUMN "chosen_food_option" DROP NOT NULL,
ALTER COLUMN "chosen_food_option" DROP DEFAULT;

-- AlterTable
ALTER TABLE "rsvp" ALTER COLUMN "chosen_food_option" DROP NOT NULL,
ALTER COLUMN "chosen_food_option" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "rsvp" ADD CONSTRAINT "rsvp_chosen_food_option_fkey" FOREIGN KEY ("chosen_food_option") REFERENCES "food_options"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plus_one" ADD CONSTRAINT "plus_one_chosen_food_option_fkey" FOREIGN KEY ("chosen_food_option") REFERENCES "food_options"("id") ON DELETE SET NULL ON UPDATE CASCADE;
