import type { ApiResponse } from '../../global/responses'

export interface AuthService {
  login(otpCode: string): Promise<ApiResponse<{ jwt: string }>>
  requestAuthentication(email: string, password: string): Promise<ApiResponse>
  updateCollaboratorPassword: (
    collaboratorId: string,
    password: string,
  ) => Promise<ApiResponse<void>>
  disableCollaboratorAccount(collaboratorId: string): Promise<ApiResponse<void>>
  enableCollaboratorAccount(collaboratorId: string): Promise<ApiResponse<void>>
}
