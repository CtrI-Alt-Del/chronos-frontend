import {z} from "zod"
import { workScheduleSchema } from "../work-schedule"
import { responsibleAggregateSchema } from "../global/responsible-aggregate-schema"

export const dayOffScheduleAdjustmentSolicitationSchema = z.object({
  id: z.string().optional(),
  description: z.string(),
  date: z.coerce.date(),
  status: z.enum(["PENDING", "APPROVED", "DENIED"]),
  feedbackMessage: z.string(),
  senderResponsible: responsibleAggregateSchema,
  replierResponsible: responsibleAggregateSchema.optional(),
  type: z.literal("WORK_SCHEDULE"),
  dayOffSchedule: workScheduleSchema
})
