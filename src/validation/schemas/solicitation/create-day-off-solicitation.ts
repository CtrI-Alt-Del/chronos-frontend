import { z } from "zod";

export const createDayOffSolicitationSchema = z.object({
  dayOff: z.string().min(1, 'Data obrigatória'),
  justificationType: z.object({
    id: z.string(),
    name: z.string(),
    needsAttachment: z.string()
  }),
  description: z.string().min(5, 'Descrição muito curta'),
  file: z.instanceof(File).optional()
})

