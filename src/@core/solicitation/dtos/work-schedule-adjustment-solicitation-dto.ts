import type { ResponsibleAggregateDto } from "@/@core/global/dtos/ResponsibleAggregateDto"
import { SolicitationDto } from "./solicitation-dto"

export type WorkScheduleAdjustmentSolicitationDto = SolicitationDto & {
  workScheduleId: string
}
