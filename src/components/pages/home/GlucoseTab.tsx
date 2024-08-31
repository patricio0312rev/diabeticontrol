import { Button } from "@/components/buttons";
import { TextInput } from "@/components/inputs";
import React from "react";

export const GlucoseTab = ({
  handleSubmit,
  todayEntered,
}: {
  handleSubmit: (e: React.FormEvent) => void;
  todayEntered: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[40%_auto] sm:gap-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          className="space-y-1 sm:space-y-2"
          label="Nivel de glucosa"
          placeholder="Ingresa el nivel de glucosa del paciente"
          id="glucose_value"
        />

        <Button type="submit" text="Ingresar" disabled={todayEntered} />
      </form>

      <div className="bg-black w-full h-64" />
    </div>
  );
};
