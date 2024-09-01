import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "El DNI del paciente es obligatorio." },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        records: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Paciente no encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, patient }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving patient data:", error);
    return NextResponse.json(
      { success: false, message: "Error interno." },
      { status: 500 }
    );
  }
}
