/*
  Warnings:

  - Added the required column `dept` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dept" TEXT NOT NULL,
ADD COLUMN     "studentNumber" TEXT NOT NULL;
