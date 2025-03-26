'use client'

import { Table, TableBody, TableHeader, TableColumn, TableRow, TableCell } from "@heroui/table"
import { TimeInput } from "@heroui/date-input"
import { Clock } from "lucide-react"

export const CreateWorkSchedule = () => {
  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableColumn className="text-md pl-12">Dia</TableColumn>
          <TableColumn className="text-md pl-12">Entrada 1</TableColumn>
          <TableColumn className="text-md pl-12">Saída 1</TableColumn>
          <TableColumn className="text-md pl-12">Entrada 2</TableColumn>
          <TableColumn className="text-md pl-12">Saída 2</TableColumn>
        </TableHeader>
        <TableBody>
          {days.map((day, index) => (
            <TableRow key={index}>
              <TableCell>{day}</TableCell>
              <TableCell>
                <TimeInput startContent={<Clock />} hourCycle={24} />
              </TableCell>
              <TableCell>
                <TimeInput startContent={<Clock />} hourCycle={24} />
              </TableCell>
              <TableCell>
                <TimeInput startContent={<Clock />} hourCycle={24} />
              </TableCell>
              <TableCell>
                <TimeInput startContent={<Clock />} hourCycle={24} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
