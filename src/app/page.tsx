"use client";
import React, { useState } from "react";
import Logo from "@/app/assets/svgs/logo.svg";
import { AnimatedContainer, PWAInstallBanner } from "@/components/layout";
import { Button, TextLink } from "@/components/buttons";
import Eye from "@/app/assets/svgs/eye.svg";
import EyeClose from "@/app/assets/svgs/eye-close.svg";
import { Checkbox, TextInput } from "@/components/inputs";
import { Container, Loader } from "@/components/common";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface LoginValues {
  password: string;
  rememberMe: boolean;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

type ErrorResponse = {
  message: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginValues
  >({
    mutationFn: async (values: LoginValues) => {
      const response = await axiosInstance.post<LoginResponse>(
        "/login",
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push("/home");
      } else {
        return false;
      }
    },
    onError: (error) => {
      return error;
    },
  });

  const loginValidationSchema = Yup.object().shape({
    password: Yup.string().required("La contraseña es obligatoria."),
    keepConnected: Yup.boolean(),
  });

  const formik = useFormik<LoginValues>({
    initialValues: {
      password: "",
      rememberMe: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values, {
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

  return (
    <AnimatedContainer className="items-center justify-center">
      <Container>
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <Logo className="h-12 w-12 text-theme-primary-600 transition-all ease-in-out duration-300" />
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={formik.handleSubmit}>
          <TextInput
            type={showPassword ? "text" : "password"}
            id="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            trailingIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-theme-secondary-500 hover:text-theme-secondary-800 transition-all ease-in-out duration-300"
              >
                {showPassword ? (
                  <EyeClose className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className="flex items-center justify-between flex-wrap gap-2">
            <Checkbox
              id="rememberMe"
              label="Mantener sesión"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <TextLink
              className="text-sm"
              text="¿Olvidaste tu contraseña?"
              href="mailto:juan.marroquin1@unmsm.edu.pe"
            />
          </div>

          <Button
            type="submit"
            text={
              loginMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  Cargando... <Loader />
                </span>
              ) : (
                "Ingresar"
              )
            }
            disabled={formik.isSubmitting || loginMutation.isPending}
          />
        </form>
      </Container>
      <PWAInstallBanner />
    </AnimatedContainer>
  );
}
