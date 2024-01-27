-- CreateTable
CREATE TABLE "approved_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "approved_users_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "food_allocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "approved_users_id_key" ON "approved_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "approved_users_email_key" ON "approved_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "food_options_name_key" ON "food_options"("name");

-- AddForeignKey
ALTER TABLE "food_allocation" ADD CONSTRAINT "food_allocation_food_option_id_fkey" FOREIGN KEY ("food_option_id") REFERENCES "food_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_allocation" ADD CONSTRAINT "food_allocation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "approved_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
