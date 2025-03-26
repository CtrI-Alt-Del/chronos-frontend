import type { ReactNode } from "react";
import { cookies } from "next/headers";

import { PrivateLayout } from "@/ui/global/widgets/layouts/private-layout";
import { AuthContextProvider } from "@/ui/auth/contexts/auth-context/auth-context";
import { COOKIES } from "@/@core/global/constants/cookies";

type LayoutProps = {
  children: ReactNode;
};

const PrivateLayoutWrapper = async ({ children }: LayoutProps) => {
  const jwtCookie = (await cookies()).get(COOKIES.jwt.key);
  const jwt = jwtCookie?.value ?? null;

  return (
    <AuthContextProvider jwt={jwt}>
      <PrivateLayout>{children}</PrivateLayout>
    </AuthContextProvider>
  );
};

export default PrivateLayoutWrapper;
