import type { JustificationDto } from "./justification-dto"
import type { SolicitationDto } from "./solicitation-dto"
import type { DayOffScheduleDto } from "@/@core/work-schedule/dtos"

export type DayOffSolicitationDto = SolicitationDto & {
  dayOff: string 
  justification: JustificationDto
}
