import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("Admin password is not set in environment variables.");
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "User",
      username: "admin",
      password: hashedPassword,
      email: "admin@example.com",
    },
  });

  await prisma.patient.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      firstName: "Juan Patricio",
      lastName: "Marroquin Gavelan",
      birthDate: new Date("1999-12-03"),
    },
  });

  await prisma.record.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      patientId: "1",
      type: "glucose",
      value: "70",
      createdAt: new Date("2024-08-01"),
    },
  });

  await prisma.record.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      patientId: "1",
      type: "glucose",
      value: "80",
      createdAt: new Date("2024-07-02"),
    },
  });

  await prisma.record.upsert({
    where: { id: "3" },
    update: {},
    create: {
      id: "3",
      patientId: "1",
      type: "glucose",
      value: "60",
      createdAt: new Date("2024-06-03"),
    },
  });

  await prisma.record.upsert({
    where: { id: "4" },
    update: {},
    create: {
      id: "4",
      patientId: "1",
      type: "glucose",
      value: "70",
      createdAt: new Date("2024-05-04"),
    },
  });

  await prisma.record.upsert({
    where: { id: "5" },
    update: {},
    create: {
      id: "5",
      patientId: "1",
      type: "homoglobin-a1c",
      value: "5.7",
      createdAt: new Date("2024-04-05"),
    },
  });

  await prisma.record.upsert({
    where: { id: "6" },
    update: {},
    create: {
      id: "6",
      patientId: "1",
      type: "homoglobin-a1c",
      value: "5.8",
      createdAt: new Date("2024-05-06"),
    },
  });

  await prisma.record.upsert({
    where: { id: "7" },
    update: {},
    create: {
      id: "7",
      patientId: "1",
      type: "homoglobin-a1c",
      value: "5.9",
      createdAt: new Date("2024-06-07"),
    },
  });

  await prisma.record.upsert({
    where: { id: "8" },
    update: {},
    create: {
      id: "8",
      patientId: "1",
      type: "homoglobin-a1c",
      value: "7.0",
      createdAt: new Date("2024-07-08"),
    },
  });

  await prisma.record.upsert({
    where: { id: "9" },
    update: {},
    create: {
      id: "9",
      patientId: "1",
      type: "homoglobin-a1c",
      value: "5.1",
      createdAt: new Date("2024-08-09"),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
