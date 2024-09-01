import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json(
      { success: true, message: "Cesión cerrada satisfactoriamente." },
      {
        status: 200,
        headers: {
          "Set-Cookie": "token=; HttpOnly; Path=/; Max-Age=0",
        },
      }
    );
  } catch (error) {
    console.error("Error durante el logout:", error);
    return NextResponse.json(
      { success: false, message: "Error interno." },
      { status: 500 }
    );
  }
}
