import { WorkdayStatusChart } from './charts/workday-status-chart'
import { YearlyUserAbsenceChart } from './charts/yearly-user-absence-chart'
import { DailyTimePunchChart } from './charts/daily-time-punch-chart'
import { CollaboratorsMissingTimeChart } from './charts/collaborators-missing-time-chart'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <YearlyUserAbsenceChart />
        <DailyTimePunchChart />
        <WorkdayStatusChart />
        <CollaboratorsMissingTimeChart />
      </div>
    </div>
  )
}
