import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Diabeticontrol",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
