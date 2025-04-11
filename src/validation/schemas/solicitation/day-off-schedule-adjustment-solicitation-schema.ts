import {z} from "zod"
import { daysOffScheduleSchema, workScheduleSchema } from "../work-schedule"
import { responsibleAggregateSchema } from "../global/responsible-aggregate-schema"

export const dayOffScheduleAdjustmentSolicitationSchema = z.object({
  id: z.string().optional(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  status: z.enum(["PENDING", "APPROVED", "DENIED"]).optional(),
  feedbackMessage: z.string().optional(),
  senderResponsible: responsibleAggregateSchema.optional(),
  replierResponsible: responsibleAggregateSchema.optional(),
  type: z.literal("WORK_SCHEDULE").optional(),
  dayOffScheduleDto: daysOffScheduleSchema
})
