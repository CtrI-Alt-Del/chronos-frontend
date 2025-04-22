import { z } from "zod";

export const justificationTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  shouldHaveAttachment: z.boolean(),
})
