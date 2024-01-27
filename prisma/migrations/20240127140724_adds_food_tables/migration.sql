/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "public"."Post";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."food_options" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "food_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."food_allocation" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "food_option_id" INTEGER NOT NULL,

    CONSTRAINT "food_allocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "food_options_name_key" ON "public"."food_options"("name");

-- CreateIndex
CREATE INDEX "food_allocation_user_id_food_option_id_unique" ON "public"."food_allocation"("user_id", "food_option_id");

-- AddForeignKey
ALTER TABLE "public"."food_allocation" ADD CONSTRAINT "food_allocation_food_option_id_fkey" FOREIGN KEY ("food_option_id") REFERENCES "public"."food_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."food_allocation" ADD CONSTRAINT "food_allocation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
