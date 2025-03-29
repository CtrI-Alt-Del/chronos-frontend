import type { CollaboratorDto } from '../dtos'
import type { ApiResponse, PaginationResponse } from '../../global/responses'
import type { CollaboratorListParams } from '../types'

export interface ICollaborationService {
  listCollaborators(
    params: CollaboratorListParams,
  ): Promise<ApiResponse<PaginationResponse<CollaboratorDto>>>
  getCollaborator(collaboratorId: string): Promise<ApiResponse<CollaboratorDto>>
  registerCollaborator(
    collaborator: CollaboratorDto,
    password: String,
    workScheduleId: string,
  ): Promise<ApiResponse<void>>
  disableCollaborator(collaboratorId: string): Promise<ApiResponse<void>>
  enableCollaborator(collaboratorId: string): Promise<ApiResponse<void>>
}
