import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { password, rememberMe } = await req.json();

    if (!password) {
      return NextResponse.json(
        { success: false, message: "La contraseña es obligatoria." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username: "admin" },
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido correctamente.");
    }

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: rememberMe ? "7d" : "1h",
      });

      return NextResponse.json(
        { success: true, message: `Bienvenido,  ${user.username}`, token },
        {
          status: 200,
          headers: {
            "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${rememberMe ? 604800 : 3600}`,
          },
        }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Credenciales inválidas." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { success: false, message: "Error interno." },
      { status: 500 }
    );
  }
}
