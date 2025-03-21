import type { ApiResponse } from "@/@core/global/responses";
import type { PaginationResponse } from "@/@core/global/responses/pagination-response";
import type { WorkScheduleDto } from "@/@core/work-schedule/dtos";

export interface IWorkScheduleService {
  ListWorkSchedules(page: number): Promise<ApiResponse<PaginationResponse<WorkScheduleDto>>>
}
