import type { Viewport } from 'next'
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  minimumScale: 1,
  viewportFit: 'cover',
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fff" }],
}

export const metadata = {
  title: "Diabeticontrol",
  description: "Diabeticontrol | App para controlar tu nivel de glucosa en sangre",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["diabeticontrol", "patricio0312rev", "diabetes", "glucosa", "control", "app"],
  authors: [
    { name: "Juan Patricio Marroquin Gavelan" },
    {
      name: "Juan Patricio Marroquin Gavelan",
      url: "https://www.linkedin.com/in/patricio0312rev/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/apple-touch-icon.png" },
    { rel: "icon", url: "icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { rel: "icon", url: "icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { rel: "mask-icon", url: "icons/safari-pinned-tab.svg", color: "#e91e63" },
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
        <title>{metadata.title}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content={metadata.description} />
        <meta name="generator" content={metadata.generator} />
        <link rel="manifest" href={metadata.manifest} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        {metadata.authors.map(({ name, url }, index) => (
          <meta key={index} name="author" content={name} {...(url && { href: url })} />
        ))}
        <meta name="apple-mobile-web-app-title" content="Diabeticontrol" />
        <meta name="application-name" content="Diabeticontrol"/>
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
