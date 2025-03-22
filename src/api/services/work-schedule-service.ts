import type { IApiClient } from "@/@core/global/interfaces/api-client";
import type { PaginationResponse } from "@/@core/global/responses/pagination-response";
import type { WorkScheduleDto } from "@/@core/work-schedule/dtos";
import { IWorkScheduleService } from "@/@core/work-schedule/interfaces";

export const WorkScheduleService = (ApiClient: IApiClient): IWorkScheduleService => {
  const RESOURCES = 'work-schedules'

  return {
    async ListWorkSchedules(page) {
      return await ApiClient.get<PaginationResponse<WorkScheduleDto>>(`${RESOURCES}/schedules`)
    },
  }
}
