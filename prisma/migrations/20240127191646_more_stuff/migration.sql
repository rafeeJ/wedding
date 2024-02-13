-- DropForeignKey
ALTER TABLE "food_allocation" DROP CONSTRAINT "food_allocation_plus_oneId_fkey";

-- AlterTable
ALTER TABLE "approved_users" ADD COLUMN     "allowed_day_invite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allowed_night_invite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "plus_one_allowed_day" BOOLEAN NOT NULL DEFAULT false;
