"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import TimePunchStepper from "./time-stepper";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";

export function TimePunchPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePunchRegister = () => {
    if (currentStep === 4) {
      setCurrentStep(1);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="flex justify-center items-center p-6 h-full rounded-lg border border-gray-border">
      <div className="text-center">
        <Avatar
          alt="User"
          className="mx-auto mb-10 w-36 h-36"
          radius="md"
          color="primary"
          isBordered
        />
        <div className="mb-14 text-2xl font-medium">
          <p>Bem-vindo, Thigszin!</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-500">
            {format(currentTime, "EEEE, dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
        </div>
        <div className="mb-10">
          <p className="text-5xl font-medium">{format(currentTime, "HH:mm")}</p>
        </div>
        <TimePunchStepper currentStep={currentStep} complete={complete} />
        <div className="mt-8">
          <Button
            className="w-52 h-12 text-white cursor-pointer bg-primary"
            onPress={handlePunchRegister}
            disabled={complete}
          >
            <p className="text-lg font-semibold">
              {complete ? "Ponto Finalizado" : "Registrar Ponto"}
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}
