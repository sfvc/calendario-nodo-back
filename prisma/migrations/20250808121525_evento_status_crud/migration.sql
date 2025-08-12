-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);
