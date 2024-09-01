"use client";
import { Button } from "@/components/buttons";
import { Container, TabNavigation } from "@/components/common";
import { TextInput } from "@/components/inputs";
import { SelectInput, TabOption } from "@/components/inputs/SelectInput";
import { AnimatedContainer, Navbar } from "@/components/layout";
import { RecordTab, PatientInfoTab } from "@/components/pages/home";
import {
  GLUCOSE,
  HOMOGLOBIN_A1C,
  NUMERIC_REGEX,
  PatientTabs,
} from "@/utils/constants";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Patient, Record } from "@prisma/client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

interface PatientResponse extends Patient {
  records: Record[];
}

const usePatient = (id: string) => {
  return useQuery<PatientResponse, Error>({
    queryKey: ["patient", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/patients/${id}`);
      return data.patient;
    },
    enabled: !!id && id.length === 8,
    retry: 0,
  });
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("patient");
  const [patientId, setPatientId] = useState<string>("");

  const { data: patient, isSuccess, error, isError } = usePatient(patientId);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Paciente cargado correctamente.");
    } else if (isError && error) {
      toast.error(`Error al buscar paciente: ${error.message}`);
    }
  }, [isSuccess, isError, error]);

  const getPatientValidationSchema = Yup.object().shape({
    patientId: Yup.string()
      .matches(NUMERIC_REGEX, "El DNI debe ser numérico.")
      .length(8, "El DNI debe tener 8 dígitos.")
      .required("El DNI es obligatorio."),
  });

  const formik = useFormik<{ patientId: string }>({
    initialValues: {
      patientId: "",
    },
    validationSchema: getPatientValidationSchema,
    onSubmit: (values) => {
      setPatientId(values.patientId);
    },
  });

  const options: TabOption[] = [
    { value: PatientTabs.PATIENT, label: "Información del Paciente" },
    { value: PatientTabs.GLUCOSE, label: "Glucosa", disabled: !patient },
    {
      value: PatientTabs.HOMOGLOBIN_A1C,
      label: "Homoglobina Glicosilada",
      disabled: !patient,
    },
  ];

  return (
    <AnimatedContainer className="flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center">
        <Container className="max-w-4xl my-8">
          <div className="mb-8">
            <form
              onSubmit={formik.handleSubmit}
              className="flex sm:gap-4 sm:flex-row flex-col gap-2 w-full"
            >
              <TextInput
                type="text"
                name="patientId"
                onChange={formik.handleChange}
                placeholder="Ingresa el DNI del paciente"
                label="Buscar paciente"
                className="flex-grow"
                wrapperClassName="w-full"
                value={formik.values.patientId}
                onBlur={formik.handleBlur}
              />

              <Button
                text="Buscar"
                type="submit"
                className="w-auto"
                disabled={formik.values.patientId.length < 8 || !formik.isValid}
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

          {activeTab === PatientTabs.PATIENT && patient && (
            <PatientInfoTab patient={patient} />
          )}

          {activeTab === PatientTabs.GLUCOSE && patient && (
            <RecordTab
              handleSubmit={() => {}}
              data={patient.records.filter((r) => r.type === GLUCOSE)}
              todayEntered={false}
              type={PatientTabs.GLUCOSE}
            />
          )}

          {activeTab === PatientTabs.HOMOGLOBIN_A1C && patient && (
            <RecordTab
              handleSubmit={() => {}}
              data={patient.records.filter((r) => r.type === HOMOGLOBIN_A1C)}
              todayEntered={false}
              type={PatientTabs.HOMOGLOBIN_A1C}
            />
          )}
        </Container>
      </div>
    </AnimatedContainer>
  );
}
