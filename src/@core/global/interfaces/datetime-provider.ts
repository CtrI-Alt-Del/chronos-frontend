export interface IDatetimeProvider {
  formatCompleteDate(date: Date): string
  formatTime(date: Date | string): string
  inZonedTime(date: Date): Date
}
