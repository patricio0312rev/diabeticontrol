import { Button } from "@/components/buttons";
import { TextInput } from "@/components/inputs";
import { PatientTabs } from "@/utils/constants";
import { Record } from "@prisma/client";
import React from "react";

export const RecordTab = ({
  handleSubmit,
  todayEntered,
  data,
  type,
}: {
  handleSubmit: (e: React.FormEvent) => void;
  todayEntered: boolean;
  data: Record[];
  type: PatientTabs.GLUCOSE | PatientTabs.HOMOGLOBIN_A1C;
}) => {
  const lastUpdated = data[0]?.createdAt
    ? new Date(data[0].createdAt).toLocaleDateString("es-PE")
    : "N/A";

  return (
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[40%_auto] sm:gap-6">
      <div className="flex flex-col gap-2">
        <small className="text-theme-secondary-600 text-xs font-medium">
          Ult. vez actualizado: {lastUpdated}
        </small>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            className="space-y-1 sm:space-y-2"
            label="Nivel de glucosa"
            placeholder={`Ingresa el nivel de ${
              type === PatientTabs.GLUCOSE ? "glucosa" : "HbA1c"
            } del paciente`}
            id="value"
          />

          <Button type="submit" text="Ingresar" disabled={todayEntered} />
        </form>
      </div>

      <div className="bg-black w-full h-64" />
    </div>
  );
};
