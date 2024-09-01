import React, { useState, useEffect } from "react";
import { Button } from "@/components/buttons";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

const isSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

const isFirefox = () => {
  return /firefox/i.test(navigator.userAgent);
};

export const PWAInstallBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (isIOS() || isSafari() || isFirefox()) {
      return;
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const installPreference = localStorage.getItem("pwaInstallPreference");
      if (!installPreference) {
        setShowBanner(true);
      }
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      localStorage.setItem("hasVisited", "true");
      setShowBanner(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      localStorage.setItem("pwaInstallPreference", outcome);
      setDeferredPrompt(null);
    }
    setShowBanner(false);
  };

  const handleClose = () => {
    localStorage.setItem("pwaInstallPreference", "dismissed");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-theme-secondary-100 border-t border-theme-secondary-200 p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-grow">
          <h2 className="text-base sm:text-lg mb-1">Instalar Diabeticontrol</h2>
          <p className="text-theme-secondary-700 text-xs sm:text-sm">
            Instala nuestra aplicación para una mejor experiencia y acceso
            rápido.
          </p>
        </div>
        <div className="sm:flex sm:w-fit gap-2 w-full grid grid-cols-2">
          <Button
            type="button"
            text="Cerrar"
            variant="secondary"
            onClick={handleClose}
          />
          <Button type="button" text="Instalar" onClick={handleInstall} />
        </div>
      </div>
    </div>
  );
};
