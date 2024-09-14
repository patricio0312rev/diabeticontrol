import { PrismaClient } from "@prisma/client";
import { existsSync, readFileSync } from "fs";
import path from "path";
import bcrypt from "bcrypt";

const GLUCOSE = "glucose";
const HOMOGLOBIN_A1C = "homoglobin-a1c";

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
    where: { id: "75603331" },
    update: {},
    create: {
      id: "75603331",
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
      patientId: "75603331",
      type: GLUCOSE,
      value: "70",
      createdAt: new Date("2024-08-01"),
    },
  });

  await prisma.record.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      patientId: "75603331",
      type: GLUCOSE,
      value: "80",
      createdAt: new Date("2024-07-02"),
    },
  });

  await prisma.record.upsert({
    where: { id: "3" },
    update: {},
    create: {
      id: "3",
      patientId: "75603331",
      type: GLUCOSE,
      value: "60",
      createdAt: new Date("2024-06-03"),
    },
  });

  await prisma.record.upsert({
    where: { id: "4" },
    update: {},
    create: {
      id: "4",
      patientId: "75603331",
      type: GLUCOSE,
      value: "70",
      createdAt: new Date("2024-05-04"),
    },
  });

  await prisma.record.upsert({
    where: { id: "5" },
    update: {},
    create: {
      id: "5",
      patientId: "75603331",
      type: HOMOGLOBIN_A1C,
      value: "5.7",
      createdAt: new Date("2024-04-05"),
    },
  });

  await prisma.record.upsert({
    where: { id: "6" },
    update: {},
    create: {
      id: "6",
      patientId: "75603331",
      type: HOMOGLOBIN_A1C,
      value: "5.8",
      createdAt: new Date("2024-05-06"),
    },
  });

  await prisma.record.upsert({
    where: { id: "7" },
    update: {},
    create: {
      id: "7",
      patientId: "75603331",
      type: HOMOGLOBIN_A1C,
      value: "5.9",
      createdAt: new Date("2024-06-07"),
    },
  });

  await prisma.record.upsert({
    where: { id: "8" },
    update: {},
    create: {
      id: "8",
      patientId: "75603331",
      type: HOMOGLOBIN_A1C,
      value: "7.0",
      createdAt: new Date("2024-07-08"),
    },
  });

  await prisma.record.upsert({
    where: { id: "9" },
    update: {},
    create: {
      id: "9",
      patientId: "75603331",
      type: HOMOGLOBIN_A1C,
      value: "5.1",
      createdAt: new Date("2024-08-09"),
    },
  });

  // Load JSON data
  const patientDataPath = path.join(__dirname, "../json/patientsSeeder.json");

  if (existsSync(patientDataPath)) {
    const rawData = readFileSync(patientDataPath, "utf-8");
    const patients = JSON.parse(rawData);

    for (const patient of patients) {
      await prisma.patient.upsert({
        where: { id: patient.id },
        update: {},
        create: {
          id: patient.id,
          firstName: patient.firstName,
          lastName: patient.lastName,
          birthDate: patient.birthDate ? new Date(patient.birthDate) : null,
          phone: patient.phone,
          clinicId: patient.clinicId,
          diabetesType: patient.diabetesType,
        },
      });
    }
  } else {
    console.log("The patientsSeeder.json file does not exist.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
