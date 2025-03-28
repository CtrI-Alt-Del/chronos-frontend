import { AuthLayout } from "@/ui/global/widgets/layouts/auth-layout";
import type { ReactNode } from "react";

export default function AuthLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
