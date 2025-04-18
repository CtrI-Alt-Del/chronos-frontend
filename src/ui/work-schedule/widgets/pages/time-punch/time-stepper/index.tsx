import { Time } from '../../../components/time'

type TimePunchStepperProps = {
  currentStep: number
  isClosed: boolean
  times: string[]
  periods: string[]
}

export const TimePunchStepper = ({
  currentStep,
  isClosed,
  times,
  periods,
}: TimePunchStepperProps) => {
  return (
    <div className='flex justify-between mb-8'>
      {periods?.map((step, index) => (
        <div
          key={String(index)}
          className={`
            flex relative flex-col justify-center items-center w-24
            ${currentStep === index ? 'active' : ''}
            ${index + 1 < currentStep || isClosed ? 'isClosed' : ''}
          `}
        >
          <p className='mb-2 text-base font-normal text-black'>{step}</p>

          {index !== 0 && (
            <div
              className={`
                absolute w-full h-[3px] right-2/4 top-[60px] -translate-y-3
                ${index <= currentStep || isClosed ? 'bg-[#1822D9]' : 'bg-[#848484]'}
              `}
            />
          )}

          <div
            className={`
              flex relative z-10 justify-center items-center w-9 h-9 
              rounded-full shadow-[0_4px_12px_rgba(24,34,217,0.25)]
              transition-all duration-300 ease-in-out
              ${
                index < currentStep || isClosed
                  ? 'bg-[#1872D9] border-2 border-[#1822D9] shadow-[0_6px_16px_rgba(24,34,217,0.4)]'
                  : 'bg-[#BFBFBF] border-2 border-[#848484]'
              }
            `}
          />
          <Time className='mt-6'>{times[index]}</Time>
        </div>
      ))}
    </div>
  )
}
