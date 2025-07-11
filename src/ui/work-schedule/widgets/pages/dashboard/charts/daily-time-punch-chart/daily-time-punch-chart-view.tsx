import { DateInput } from '@/ui/global/widgets/components/date-input'
import { Card, CardBody, CardHeader } from '@heroui/react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type DailyTimePunchChartViewProps = {
  dailyPunchs: Array<{
    hour: string
    Entradas: number
    Saídas: number
  }>
  startDate: Date
  handleStartDateInputChange: (date: Date) => void
}

export function DailyTimePunchChartView({
  dailyPunchs,
  startDate,
  handleStartDateInputChange,
}: DailyTimePunchChartViewProps) {
  return (
    <Card>
      <CardHeader className='px-6 pt-6'>
        <h3 className='text-xl font-semibold'>Horas batidas por dia</h3>
      </CardHeader>
      <CardBody>
        <DateInput
          defualtDate={startDate}
          onChange={handleStartDateInputChange}
        />
        <div className='w-full h-[400px] rounded-2xl'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={dailyPunchs}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='4 4' stroke='#d1d5db' />
              <XAxis
                dataKey='hour'
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: 'Qtd de pontos batidos',
                  angle: -90,
                  position: 'insideLeft',
                  offset: -10,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                }}
                labelStyle={{ fontWeight: 'bold' }}
                cursor={{ stroke: '#9ca3af', strokeWidth: 1 }}
              />
              <Legend
                verticalAlign='top'
                align='center'
                iconType='circle'
                wrapperStyle={{ paddingBottom: 10 }}
              />
              <Line
                type='monotone'
                dataKey='Entradas'
                stroke='#207ea9'
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type='monotone'
                dataKey='Saídas'
                stroke='#bc2525'
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}
