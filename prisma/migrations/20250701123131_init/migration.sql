/*
  Warnings:

  - You are about to drop the `Personal` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('CANCELADO', 'FIN_DE_SEMANA', 'ESPERANDO_RTA', 'INFO_SOLICITADA', 'INTERNO_NODO');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('REUNION', 'TAREA', 'CAPACITACION', 'OTRO');

-- DropTable
DROP TABLE "Personal";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "EventStatus" NOT NULL,
    "type" "EventType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
