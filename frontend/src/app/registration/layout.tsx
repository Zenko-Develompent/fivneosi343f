import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "",
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}