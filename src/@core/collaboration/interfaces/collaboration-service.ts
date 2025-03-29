import type { CollaboratorDto } from '../dtos'
import type { ApiResponse, PaginationResponse } from '../../global/responses'
import type { CollaboratorListParams } from '../types'

export interface ICollaborationService {
  listCollaborators(
    params: CollaboratorListParams,
  ): Promise<ApiResponse<PaginationResponse<CollaboratorDto>>>
  getCollaborator(collaboratorId: string): Promise<ApiResponse<CollaboratorDto>>
  updateCollaborator(
    collaborator: CollaboratorDto,
    workScheduleId: string,
  ): Promise<ApiResponse<CollaboratorDto>>
  createCollaborator(
    collaborator: CollaboratorDto,
    password: string,
    workScheduleId: string,
  ): Promise<ApiResponse<void>>
  disableCollaborator(collaboratorId: string): Promise<ApiResponse<void>>
  enableCollaborator(collaboratorId: string): Promise<ApiResponse<void>>
}
