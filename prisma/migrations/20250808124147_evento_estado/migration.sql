/*
  Warnings:

  - You are about to drop the `Evento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Evento";

-- CreateTable
CREATE TABLE "EventoEstado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL,

    CONSTRAINT "EventoEstado_pkey" PRIMARY KEY ("id")
);
