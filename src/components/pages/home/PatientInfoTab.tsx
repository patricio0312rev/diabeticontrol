import { InfoSection } from "@/components/common";
import React from "react";

export const PatientInfoTab = () => {
  return (
    <div className="mb-6">
      <h2>Información del Paciente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoSection label="Nombre" value={"Patricio"} />
        <InfoSection label="Apellido" value={"Marroquin"} />
        <InfoSection label="DNI" value={"75603331"} />
        <InfoSection label="Fecha de Registro" value={"03/12/1999"} />
        <InfoSection label="Edad" value={"24"} />
        {/* <InfoSection
          label="Fecha de Registro"
          value={patient.registrationDate.toLocaleDateString()}
        />
        <InfoSection label="Edad" value={patient.age.toString()} /> */}
      </div>
    </div>
  );
};
