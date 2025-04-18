import type { ApiResponse } from '@/@core/global/responses'
import type { JustificationTypeDto } from '../dtos'

export interface IJustificationTypeService {
  listJustificationTypes(): Promise<ApiResponse<JustificationTypeDto[]>>
  createJustificationType(
    justificationType: JustificationTypeDto,
  ): Promise<ApiResponse<JustificationTypeDto>>
  updateJustificationType(
    justificationType: JustificationTypeDto,
    id: string,
  ): Promise<ApiResponse<JustificationTypeDto>>
  deleteJustificationType(id: string): Promise<ApiResponse<void>>
}
