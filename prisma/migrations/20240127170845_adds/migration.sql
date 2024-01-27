-- AlterTable
ALTER TABLE "approved_users" ADD COLUMN     "allowed_plus_one" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "food_allocation" ADD COLUMN     "plus_oneId" INTEGER;

-- CreateTable
CREATE TABLE "rsvp" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "attending_day" BOOLEAN NOT NULL DEFAULT false,
    "attending_night" BOOLEAN NOT NULL DEFAULT false,
    "plus_oneId" INTEGER,

    CONSTRAINT "rsvp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plus_one" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "attending_day" BOOLEAN NOT NULL DEFAULT false,
    "attending_night" BOOLEAN NOT NULL DEFAULT false,
    "allowed_plus_one" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "plus_one_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rsvp_user_id_key" ON "rsvp"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "plus_one_user_id_key" ON "plus_one"("user_id");

-- AddForeignKey
ALTER TABLE "rsvp" ADD CONSTRAINT "rsvp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "approved_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rsvp" ADD CONSTRAINT "rsvp_plus_oneId_fkey" FOREIGN KEY ("plus_oneId") REFERENCES "plus_one"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plus_one" ADD CONSTRAINT "plus_one_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "approved_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_allocation" ADD CONSTRAINT "food_allocation_plus_oneId_fkey" FOREIGN KEY ("plus_oneId") REFERENCES "plus_one"("id") ON DELETE SET NULL ON UPDATE CASCADE;
