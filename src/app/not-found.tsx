// pages/404.tsx
import React from "react";
import NotFoundIcon from "@/app/assets/svgs/not-found.svg";
import { Button } from "@/components/buttons";

const Custom404: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient bg-200 animate-gradient-bg"></div>
      <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-center px-8 sm:justify-center w-full max-w-[1000px]">
        <NotFoundIcon
          className="mx-auto md:max-w-[600px]"
          id="freepik_stories-404-error"
        />
        <div className="flex flex-col gap-4 sm:px-0 items-center sm:items-start">
          <h1 className="text-white">404</h1>
          <h2 className="text-white">Página no encontrada</h2>
          <p className="text-theme-secondary-100">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </p>
          <a href="/" className="block max-w-64">
            <Button type="button" text="Volver a la página de inicio" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
