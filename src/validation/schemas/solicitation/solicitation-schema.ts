import {z} from "zod"
import { responsibleAggregateSchema } from "../global/responsible-aggregate-schema"

export const solicitationSchema = z.object({
  id: z.string().optional(),
  description: z.string().optional().nullable(),
  date: z.coerce.date().optional(),
  status: z.enum(["DENIED", "APPROVED"]),
  feedbackMessage: z.string().optional().nullable(),
  senderResponsible: responsibleAggregateSchema.optional(),
  replierResponsible: responsibleAggregateSchema.nullable().optional(),
  type: z.enum(["DAY_OFF_SCHEDULE", "TIME_PUNCH"]).optional(),
})
