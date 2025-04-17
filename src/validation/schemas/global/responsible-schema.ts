import { z } from "zod"

export const responsibleSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  sector: z.string()
})

