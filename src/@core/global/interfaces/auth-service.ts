import type { ApiResponse } from "../responses";

export interface IAuthService {
  login: (email: string, password: string) => Promise<ApiResponse<{ jwt: string }>>
}