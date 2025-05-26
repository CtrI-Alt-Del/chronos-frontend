'use client'

import type { WorkdayStatusReportDto } from '@/@core/work-schedule/dtos'
import { CardHeader } from '@heroui/react'
import { CardBody } from '@heroui/react'
import { Card } from '@heroui/react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

type WorkdayStatusChartViewProps = {
  workdayStatus: WorkdayStatusReportDto
}

const COLORS = ['#2ECC71', '#FFF3B0', '#FFB6C1']

export function WorkdayStatusChartView({ workdayStatus }: WorkdayStatusChartViewProps) {
  const data = [
    {
      name: 'Ativos',
      value: workdayStatus.activateCollaborators,
      percentage:
        (workdayStatus.activateCollaborators /
          (workdayStatus.activateCollaborators +
            workdayStatus.vacationCollaborators +
            workdayStatus.withdrawCollaborators)) *
        100,
    },
    {
      name: 'Férias',
      value: workdayStatus.vacationCollaborators,
      percentage:
        (workdayStatus.vacationCollaborators /
          (workdayStatus.activateCollaborators +
            workdayStatus.vacationCollaborators +
            workdayStatus.withdrawCollaborators)) *
        100,
    },
    {
      name: 'Afastados',
      value: workdayStatus.withdrawCollaborators,
      percentage:
        (workdayStatus.withdrawCollaborators /
          (workdayStatus.activateCollaborators +
            workdayStatus.vacationCollaborators +
            workdayStatus.withdrawCollaborators)) *
        100,
    },
  ]

  return (
    <Card>
      <CardHeader className='px-6 pt-6'>
        <h3 className='text-xl font-semibold'>Status dos Colaboradores</h3>
      </CardHeader>
      <CardBody>
        <div className='w-full h-[300px] relative'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey='value'
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className='flex absolute bottom-0 gap-6 justify-center w-full'>
            {data.map((entry, index) => (
              <div key={`legend-${index}`} className='flex gap-2 items-center'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span>{entry.name}</span>
                <span>{entry.percentage.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
