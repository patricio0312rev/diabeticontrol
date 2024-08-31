"use client";
import { Button } from "@/components/buttons";
import { Container, TabNavigation } from "@/components/common";
import { TextInput } from "@/components/inputs";
import { SelectInput, TabOption } from "@/components/inputs/SelectInput";
import { AnimatedContainer, Navbar } from "@/components/layout";
import { GlucoseTab, PatientInfoTab } from "@/components/pages/home";
import { NUMERIC_REGEX } from "@/utils/constants";
import React, { useState, useEffect } from "react";

type DataPoint = {
  date: Date;
  value: number;
};

type TabData = {
  glucose: DataPoint[];
  triglycerides: DataPoint[];
  patient: DataPoint[];
};

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  registrationDate: Date;
  age: number;
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("patient");
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<TabData>({
    glucose: [],
    triglycerides: [],
    patient: [],
  });
  const [todayEntered, setTodayEntered] = useState<boolean>(false);
  const [patientId, setPatientId] = useState<string>("");
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayEntered(
      data[activeTab as "glucose" | "triglycerides"].some(
        (point) => point.date.toISOString().split("T")[0] === today
      )
    );
  }, [data, activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    const today = new Date();
    const newData = [
      ...data[activeTab as "glucose" | "triglycerides"],
      { date: today, value },
    ];
    setData((prevData) => ({ ...prevData, [activeTab]: newData }));
    setInputValue("");
    setTodayEntered(true);
  };

  const handleEdit = () => {
    setTodayEntered(false);
  };

  const handlePatientSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock patient data
    const mockPatient: Patient = {
      id: patientId,
      firstName: "John",
      lastName: "Doe",
      registrationDate: new Date("2023-01-01"),
      age: 35,
    };
    setPatient(mockPatient);
    setActiveTab("patient");
  };

  const handlePatientIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    NUMERIC_REGEX.test(e.target.value) && setPatientId(e.target.value);
  };

  const options: TabOption[] = [
    { value: "patient", label: "Info del Paciente" },
    { value: "glucose", label: "Glucosa", disabled: !patient },
    { value: "triglycerides", label: "Trigliceridos", disabled: !patient },
  ];

  return (
    <AnimatedContainer className="flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center">
        <Container className="max-w-4xl my-8">
          <div className="mb-8">
            <form
              onSubmit={handlePatientSearch}
              className="flex sm:gap-4 sm:flex-row flex-col gap-2 w-full"
            >
              <TextInput
                type="text"
                value={patientId}
                onChange={handlePatientIdChange}
                placeholder="Ingresa el DNI del paciente"
                label="Buscar paciente"
                className="flex-grow "
                wrapperClassName="w-full"
              />

              <Button
                text="Buscar"
                type="submit"
                className="w-auto"
                disabled={patientId.length < 7}
              />
            </form>
          </div>

          <div className="mb-6">
            <div className="sm:hidden">
              <SelectInput
                id="tabs"
                options={options}
                activeTab={activeTab}
                onChange={(e) => setActiveTab(e)}
              />
            </div>

            <div className="hidden sm:block">
              <TabNavigation
                options={options}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>

          {activeTab === "patient" && patient && <PatientInfoTab />}

          {activeTab === "glucose" && patient && (
            <GlucoseTab handleSubmit={handleSubmit} todayEntered={false} />
          )}
        </Container>
      </div>
    </AnimatedContainer>
  );
}
