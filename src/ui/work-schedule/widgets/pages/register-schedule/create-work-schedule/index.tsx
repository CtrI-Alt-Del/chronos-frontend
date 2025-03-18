'use client'

import { TimeInput } from "@heroui/date-input";
import { Clock } from "lucide-react";

export const CreateWorkSchedule = () => {
  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]

  return (
    <div className="w-full">
      <div className="grid grid-cols-5 bg-zinc-100 pr-2 py-3 rounded-t-md text-center text-sm border">
        <h2 className=" font-semibold pr-4">Dias</h2>
        <h2 className=" font-semibold">Entrada 1</h2>
        <h2 className=" font-semibold">Saída 1</h2>
        <h2 className=" font-semibold">Entrada 2</h2>
        <h2 className=" font-semibold">Saída 2</h2>
      </div>

      <div className="bg-zinc-50 rounded-b-md border-b border-l border-r">
        {days.map((day, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 items-center py-2 px-4 text-sm border-b last:border-none">
            <span className="text-md font-medium">{day}</span>
            <TimeInput
              startContent={<Clock />}
            />
            <TimeInput
              startContent={<Clock />}
            />
            <TimeInput
              startContent={<Clock />}
            />
            <TimeInput
              startContent={<Clock />}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
