import { useContext } from "react";

import { AppError } from "@/@core/global/errors";
import type { AuthContextValue } from "../types";
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
