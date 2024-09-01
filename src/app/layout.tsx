import type { Viewport } from "next";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  minimumScale: 1,
  viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fff" }],
};

export const metadata = {
  title: "Diabeticontrol | Lleva control de tus niveles de azucar en la sangre",
  description:
    "Diabeticontrol | Lleva control de tus niveles de azucar en la sangre",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "diabeticontrol",
    "patricio0312rev",
    "diabetes",
    "glucosa",
    "control",
    "app",
  ],
  authors: [
    { name: "Juan Patricio Marroquin Gavelan" },
    {
      name: "Juan Patricio Marroquin Gavelan",
      url: "https://www.linkedin.com/in/patricio0312rev/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/apple-touch-icon.png" },
    {
      rel: "icon",
      url: "icons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "icons/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "mask-icon",
      url: "icons/safari-pinned-tab.svg",
      color: "#e91e63",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="apple-mobile-web-app-title" content="Diabeticontrol" />
        <meta name="application-name" content="Diabeticontrol" />
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <ReactQueryProvider>
        <body>
          {children}
          <ToastContainer position="bottom-right" />
          <SpeedInsights />
        </body>
      </ReactQueryProvider>
    </html>
  );
}
