import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { type, value } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "DNI del paciente es obligatorio." },
        { status: 400 }
      );
    }

    if (!type || !value) {
      return NextResponse.json(
        {
          success: false,
          message: "Tipo y valor del record son obligatorios.",
        },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Paciente no encontrado." },
        { status: 404 }
      );
    }

    const record = await prisma.record.create({
      data: {
        patientId: id,
        type,
        value,
      },
    });

    return NextResponse.json({ success: true, record }, { status: 201 });
  } catch (error) {
    console.error("Error creando record de paciente:", error);
    return NextResponse.json(
      { success: false, message: "Error interno." },
      { status: 500 }
    );
  }
}
