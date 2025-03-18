'use client'

import { TimeInput } from "@heroui/date-input";
import { JSX, SVGProps } from "react";

export const ClockCircleLinearIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

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
              startContent={
                <ClockCircleLinearIcon className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            <TimeInput
              startContent={
                <ClockCircleLinearIcon className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            <TimeInput
              startContent={
                <ClockCircleLinearIcon className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            <TimeInput
              startContent={
                <ClockCircleLinearIcon className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}
