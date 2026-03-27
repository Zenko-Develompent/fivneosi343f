import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход",
  description: "",
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}