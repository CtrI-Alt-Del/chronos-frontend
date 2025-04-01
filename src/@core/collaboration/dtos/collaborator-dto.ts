export type CollaboratorDto = {
  id?: string
  name: string
  email: string
  password?: string
  cpf: string
  isActive: boolean
  role: string
  sector?: string
  workScheduleId: string
}
