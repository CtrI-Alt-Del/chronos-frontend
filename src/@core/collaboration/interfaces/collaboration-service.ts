import type { CollaboratorDto } from '../dtos'
import type { ApiResponse, PaginationResponse } from '../../global/responses'
import type { CollaboratorListParams } from '../types'

export interface ICollaborationService {
  listCollaborators(
    params: CollaboratorListParams,
  ): Promise<ApiResponse<PaginationResponse<CollaboratorDto>>>
  getCollaborator(collaboratorId: string): Promise<ApiResponse<CollaboratorDto>>
  updateCollaborator(
    collaboratorId: string,
    collaborator: CollaboratorDto,
  ): Promise<ApiResponse<CollaboratorDto>>
  createCollaborator(
    collaborator: CollaboratorDto,
    password: string,
  ): Promise<ApiResponse<{ collaboratorId: string }>>
}
