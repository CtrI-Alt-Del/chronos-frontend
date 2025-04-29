import { z } from "zod";

export const createDayOffSolicitationSchema = z.object({
  dayOff: z.string().min(1, 'Data obrigatória'),
  workload: z.number().min(1, 'Carga horária obrigatória').optional(),
})

