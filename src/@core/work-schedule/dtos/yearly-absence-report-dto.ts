export type YearlyAbsenceReportDto = {
  monthlyAbsences: {
    collaboratorsAbsence: number
    managersAbsence: number
  }[]
}
