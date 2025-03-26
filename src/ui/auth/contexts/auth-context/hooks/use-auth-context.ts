import { useContext } from "react";
import { AuthContextValue } from "@/@core/auth/types";
import { AppError } from "@/@core/global/errors";
import { AuthContext } from "../auth-context";

export function useAuthContext(): AuthContextValue {
    const context = useContext(AuthContext);

    if (!context) {
        throw new AppError(
            "AuthContext",
            "useAuthContext must be used within an AuthContextProvider"
        );
    }

    return context;
}
