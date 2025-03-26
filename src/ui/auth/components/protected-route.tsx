"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../contexts/auth-context/hooks/use-auth-context";
import { useAuthorization } from "../contexts/auth-context/hooks/use-authorization";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredPermission?: string;
};

export function ProtectedRoute({
  children,
  requiredPermission,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const { canAccessRoute } = useAuthorization();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (
      !isLoading &&
      isAuthenticated &&
      requiredPermission &&
      !canAccessRoute(requiredPermission)
    ) {
      router.push("/unauthorized");
    }
  }, [isLoading, isAuthenticated, requiredPermission, canAccessRoute, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-4 animate-spin border-t-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredPermission && !canAccessRoute(requiredPermission)) {
    return null;
  }

  return <>{children}</>;
}
