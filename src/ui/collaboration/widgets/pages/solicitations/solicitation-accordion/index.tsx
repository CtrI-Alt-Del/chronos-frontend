"use client"

import { Accordion, AccordionItem } from "@heroui/accordion"
import { ChevronDown } from "lucide-react"

export const SolicitationAccordion = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

  const statusColors: Record<string, string> = {
    "Pendente": "text-yellow-500 bg-yellow-500",
    "Aprovado": "text-green-500 bg-green-500",
    "Recusado": "text-red-500 bg-red-500",
  }

  const pedidos = [
    { id: "1", data: "10-01-2025", hora: "09:15", status: "Pendente" },
    { id: "2", data: "11-01-2025", hora: "14:30", status: "Aprovado" },
    { id: "3", data: "12-01-2025", hora: "16:45", status: "Recusado" },
  ]

  return (
    <div>
      <Accordion className="border border-gray-border rounded-lg px-4">
        {pedidos.map((pedido) => (
          <AccordionItem
            key={pedido.id}
            aria-label={`Accordion ${pedido.id}`}
            startContent={<div className={`w-3 h-3 rounded-full ${statusColors[pedido.status].split(" ")[1]}`} />}
            title={
              <div className="flex items-center justify-between w-full">
                <span className="text-gray-500 text-sm">{pedido.data}</span>
                <div className="flex items-center justify-center">
                  <span className={`block translate-y-3 text-base ${statusColors[pedido.status].split(" ")[0]}`}>
                    {pedido.status}
                  </span>
                </div>
              </div>
            }
            subtitle={
              <div>
                <span className="text-black text-lg">{pedido.hora}</span>
                <span className="text-black pl-8">Lorem ipsum dolor sit amet consectetur</span>
              </div>
            }
            indicator={<ChevronDown className="w-4 h-4" />}
          >
            {defaultContent}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
