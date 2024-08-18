-- CreateTable
CREATE TABLE "approved_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "allowed_plus_one" BOOLEAN NOT NULL DEFAULT false,
    "allowed_day_invite" BOOLEAN NOT NULL DEFAULT false,
    "allowed_night_invite" BOOLEAN NOT NULL DEFAULT false,
    "plus_one_allowed_day" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "approved_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rsvp" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "attending_day" BOOLEAN NOT NULL DEFAULT false,
    "attending_night" BOOLEAN NOT NULL DEFAULT false,
    "plus_oneId" INTEGER,
    "dietary_requirements" TEXT DEFAULT '',
    "chosen_food_option" INTEGER NOT NULL DEFAULT 3,

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
    "dietary_requirements" TEXT DEFAULT '',
    "chosen_food_option" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "plus_one_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_options" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "food_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_allocation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "food_option_id" INTEGER NOT NULL,
    "plus_oneId" INTEGER,

    CONSTRAINT "food_allocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "approved_users_id_key" ON "approved_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "approved_users_email_key" ON "approved_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rsvp_user_id_key" ON "rsvp"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "plus_one_user_id_key" ON "plus_one"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "food_options_name_key" ON "food_options"("name");

-- AddForeignKey
ALTER TABLE "rsvp" ADD CONSTRAINT "rsvp_chosen_food_option_fkey" FOREIGN KEY ("chosen_food_option") REFERENCES "food_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rsvp" ADD CONSTRAINT "rsvp_plus_oneId_fkey" FOREIGN KEY ("plus_oneId") REFERENCES "plus_one"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rsvp" ADD CONSTRAINT "rsvp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "approved_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plus_one" ADD CONSTRAINT "plus_one_chosen_food_option_fkey" FOREIGN KEY ("chosen_food_option") REFERENCES "food_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plus_one" ADD CONSTRAINT "plus_one_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "approved_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_allocation" ADD CONSTRAINT "food_allocation_food_option_id_fkey" FOREIGN KEY ("food_option_id") REFERENCES "food_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_allocation" ADD CONSTRAINT "food_allocation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "approved_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

