import type { ReactNode } from 'react'
import { BackgroundSquare } from './background-square'
import Image from 'next/image'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative w-full h-screen bg-gradient-to-tr from-[#61D9DE] from-0% via-[#1200AF] via-100% flex items-center justify-center overflow-hidden'>
      <div className='hidden md:block'>
        <BackgroundSquare
          left={-308}
          top={-100}
          color='#7AB9FF'
          rotation={-25}
          animate={true}
          delay={2}
          key={1}
        />
      </div>
      <div className='hidden md:block'>
        <BackgroundSquare
          right={800}
          bottom={-390}
          color='#47D9F6'
          rotation={-32}
          animate={true}
          delay={4}
          key={2}
        />
      </div>
      <div className='hidden md:block'>
        <BackgroundSquare
          right={-360}
          top={240.2}
          color='#186BD9'
          rotation={-40}
          animate={true}
          delay={6}
          key={3}
        />
      </div>

      <div className='flex relative z-10 flex-col justify-center items-center pt-12 px-12 pb-6 w-full max-w-md bg-white rounded-xl shadow-xl'>
        <div className='flex gap-2 justify-center items-center mb-4'>
          <Image
            src='/images/logo.svg'
            className='mb-2 w-[40px] md:w-[56px]'
            alt='Chronos'
            width={56}
            height={56}
          />
          <h1 className='text-3xl font-bold'>Chronos</h1>
        </div>
        <div className='flex flex-col gap-4 w-full mt-1'>{children}</div>
      </div>
    </div>
  )
}
