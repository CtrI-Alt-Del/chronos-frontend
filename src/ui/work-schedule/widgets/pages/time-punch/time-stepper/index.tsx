import React from "react";

interface TimePunchStepperProps {
  currentStep: number;
  complete: boolean;
}

const TimePunchStepper = ({ currentStep, complete }: TimePunchStepperProps) => {
  const steps = ["Entrada 1", "Saída 1", "Entrada 2", "Saída 2"];
  const times = ["08:00", "12:00", "13:00", "17:00"];

  return (
    <div className="flex justify-between mb-6">
      {steps?.map((step, i) => (
        <div
          key={i}
          className={`
            flex relative flex-col justify-center items-center w-20
            ${currentStep === i + 1 ? "active" : ""}
            ${i + 1 < currentStep || complete ? "complete" : ""}
          `}
        >
          <p className="mb-1 text-sm font-normal text-black">{step}</p>

          {i !== 0 && (
            <div
              className={`
                absolute w-full h-[2px] right-2/4 top-1/2 -translate-y-1/2
                ${
                  i + 1 <= currentStep || complete
                    ? "bg-[#1822D9]"
                    : "bg-[#848484]"
                }
              `}
            />
          )}

          <div
            className={`
              flex relative z-10 justify-center items-center w-7 h-7 
              rounded-full shadow-[0_4px_12px_rgba(24,34,217,0.25)]
              transition-all duration-300 ease-in-out
              ${
                i + 1 < currentStep || complete
                  ? "bg-[#1872D9] border-2 border-[#1822D9] shadow-[0_6px_16px_rgba(24,34,217,0.4)]"
                  : "bg-[#BFBFBF] border-2 border-[#848484]"
              }
            `}
          />

          <p className="mt-1 text-xs font-bold text-black">{times[i]}</p>
        </div>
      ))}
    </div>
  );
};

export default TimePunchStepper;
