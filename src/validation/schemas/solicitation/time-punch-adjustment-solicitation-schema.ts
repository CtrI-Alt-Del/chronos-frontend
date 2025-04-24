import {z} from "zod"
import { daysOffScheduleSchema, workScheduleSchema } from "../work-schedule"
import { responsibleAggregateSchema } from "../global/responsible-aggregate-schema"

export const timePunchAdjustmentSolicitationSchema = z.object({
  id: z.string().optional(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  status: z.enum(["PENDING", "APPROVED", "DENIED"]).optional(),
  feedbackMessage: z.string().optional(),
  senderResponsible: responsibleAggregateSchema.optional(),
  replierResponsible: responsibleAggregateSchema.optional(),
  type: z.literal("TIME_PUNCH").optional(),
  time: z.string(),
  period: z.string(),
  workdayLogDate: z.coerce.date(),
  reason: z.string(),
})
