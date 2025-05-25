import { workScheduleActions } from '@/server/next-safe-action'
import { WorkdayStatusChartView } from './workday-status-chart-view'

export const WorkdayStatusChart = async () => {
  const response = await workScheduleActions.getWorkdayStatusReport()
  if (!response?.data) return
  const workdayStatusReport = response.data

  return <WorkdayStatusChartView workdayStatus={workdayStatusReport} />
}
