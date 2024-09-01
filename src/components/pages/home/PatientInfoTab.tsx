import { InfoSection } from "@/components/common";
import { Patient } from "@prisma/client";
import React from "react";

export const PatientInfoTab = ({ patient }: { patient: Patient }) => {
  const birthDate = patient.birthDate
    ? `${new Date().getFullYear() - new Date(patient.birthDate).getFullYear()}`
    : "N/A";
  const createdAt = new Date(patient.createdAt).toLocaleDateString();
  return (
    <div className="mb-6">
      <h2>Información del Paciente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoSection label="Nombre" value={patient.firstName} />
        <InfoSection label="Apellido" value={patient.lastName} />
        <InfoSection label="DNI" value={patient.id} />
        <InfoSection label="Fecha de Registro" value={createdAt} />
        <InfoSection label="Edad" value={birthDate} />
      </div>
    </div>
  );
};
