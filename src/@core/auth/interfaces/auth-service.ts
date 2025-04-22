import type { ApiResponse } from '../../global/responses'

export interface AuthService {
  login: (email: string, password: string) => Promise<ApiResponse<{ jwt: string }>>
  updateCollaboratorPassword: (
    collaboratorId: string,
    password: string,
  ) => Promise<ApiResponse<void>>
  disableCollaboratorAccount(collaboratorId: string): Promise<ApiResponse<void>>
  enableCollaboratorAccount(collaboratorId: string): Promise<ApiResponse<void>>
}
