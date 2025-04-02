import { Time } from '../../../components/time'

type TimePunchStepperProps = {
  currentStep: number
  isClosed: boolean
  timesSchedule: string[]
  timesLog: string[]
  periods: string[]
}

export const TimePunchStepper = ({
  currentStep,
  isClosed,
  timesSchedule,
  timesLog,
  periods,
}: TimePunchStepperProps) => {
  return (
    <div className='flex justify-between mb-4 md:mb-8'>
      {periods?.map((step, index) => (
        <div
          key={String(index)}
          className={`
            flex relative flex-col justify-center items-center 
            w-14 md:w-24
            ${currentStep === index ? 'active' : ''}
            ${index + 1 < currentStep || isClosed ? 'isClosed' : ''}
          `}
        >
          <p className='mb-1 max-w-full text-xs font-normal text-black truncate md:mb-2 md:text-base'>{step}</p>

          {index !== 0 && (
            <div
              className={`
                absolute w-[120%] md:w-full h-[2.5px] md:h-[3px] right-[60%] md:right-2/4 top-[45px] md:top-[60px] -translate-y-3
                ${index <= currentStep || isClosed ? 'bg-[#1822D9]' : 'bg-[#848484]'}
              `}
            />
          )}

          <div
            className={`
              flex relative z-10 justify-center items-center 
              w-7 h-7 md:w-9 md:h-9 
              rounded-full shadow-[0_2px_8px_rgba(24,34,217,0.25)] md:shadow-[0_4px_12px_rgba(24,34,217,0.25)]
              transition-all duration-300 ease-in-out
              ${
                index < currentStep || isClosed
                  ? 'bg-[#1872D9] border-2 border-[#1822D9] shadow-[0_3px_10px_rgba(24,34,217,0.4)] md:shadow-[0_6px_16px_rgba(24,34,217,0.4)]'
                  : 'bg-[#BFBFBF] border-2 border-[#848484]'
              }
            `}
          />

          <Time className='my-1 text-xs font-bold text-black md:my-3 md:text-sm'>
            {timesSchedule[index]}
          </Time>
          <Time className='text-xs md:text-sm'>{timesLog[index]}</Time>
        </div>
      ))}
    </div>
  )
}
