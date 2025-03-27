import type { PaginationResponse } from '@/@core/global/responses'
import type { WorkScheduleDto } from '../dtos'

export interface IWorkScheduleService {
  listWorkSchedules(): Promise<PaginationResponse<WorkScheduleDto>>
}
