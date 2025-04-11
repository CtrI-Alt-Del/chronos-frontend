import type { SolicitationDto } from "./solicitation-dto"
import type { DayOffScheduleDto } from "@/@core/work-schedule/dtos"

export type DayOffScheduleAdjustmentSolicitationDto = SolicitationDto & {
  dayOffScheduleDto: DayOffScheduleDto
}
