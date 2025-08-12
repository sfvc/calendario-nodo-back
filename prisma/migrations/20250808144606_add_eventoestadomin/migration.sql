/*
  Warnings:

  - You are about to drop the `EventoEstado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EventoEstado";

-- CreateTable
CREATE TABLE "Eventoestado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL,

    CONSTRAINT "Eventoestado_pkey" PRIMARY KEY ("id")
);
