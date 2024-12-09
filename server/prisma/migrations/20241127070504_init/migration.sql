-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data_start" TEXT NOT NULL,
    "data_end" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "products" TEXT NOT NULL
);
