import { Button } from "@/components/buttons";
import { TextInput } from "@/components/inputs";
import axiosInstance from "@/utils/axios";
import { PatientTabs } from "@/utils/constants";
import { Patient, Record } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface RecordValues {
  value: string;
}

interface RecordResponse {
  success: boolean;
  token?: string;
  message?: string;
}

type ErrorResponse = {
  message: string;
};

export const RecordTab = ({
  todayEntered,
  data,
  type,
  patientId,
}: {
  todayEntered: boolean;
  data: Record[];
  type: PatientTabs.GLUCOSE | PatientTabs.HOMOGLOBIN_A1C;
  patientId: Patient["id"];
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const recordMutation = useMutation<
    RecordResponse,
    AxiosError<ErrorResponse>,
    RecordValues
  >({
    mutationFn: async (values: RecordValues) => {
      const formValues = {
        type,
        value: values.value,
      };
      const response = await axiosInstance.post<RecordResponse>(
        `/patients/${patientId}/records`,
        formValues
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["patient", patientId] });
        return true;
      } else {
        return false;
      }
    },
    onError: (error) => {
      return error;
    },
  });

  const recordValidationSchema = Yup.object().shape({
    value: Yup.string().required("El valor es obligatorio."),
  });

  const formik = useFormik<RecordValues>({
    initialValues: {
      value: "",
    },
    validationSchema: recordValidationSchema,
    onSubmit: (values) => {
      recordMutation.mutate(values, {
        onSuccess: (data) => {
          formik.setSubmitting(false);
          if (data.success) {
            router.push("/home");
            toast.success(data.message);
          }
          formik.resetForm();
        },
        onError: (error) => {
          formik.setSubmitting(false);
          toast.error(error.response?.data?.message || "Algo salió mal");
        },
      });
    },
  });

  const lastUpdated = data[0]?.createdAt
    ? new Date(data[0].createdAt).toLocaleDateString("es-PE")
    : "N/A";

  const recordType =
    type === PatientTabs.GLUCOSE ? "glucosa" : "hemoglobina glicosilada";

  return (
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[40%_auto] sm:gap-6">
      <div className="flex flex-col gap-2">
        <small className="text-theme-secondary-600 text-xs font-medium">
          Ult. vez actualizado: {lastUpdated}
        </small>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <TextInput
            className="space-y-1 sm:space-y-2"
            label={`Nivel de ${recordType}`}
            placeholder={`Ingresa el nivel de ${recordType} del paciente`}
            id="value"
            value={formik.values.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Button
            type="submit"
            text="Ingresar"
            disabled={formik.isSubmitting || recordMutation.isPending}
          />
        </form>
      </div>

      <div className="bg-black w-full h-64" />
    </div>
  );
};
