import { motion } from 'framer-motion'

type AnimatedButtonProps = {
  isSubmitting: boolean
  showAnimation: boolean
}

export const AnimatedButtonView = ({
  isSubmitting,
  showAnimation,
}: AnimatedButtonProps) => {
  return (
    <button
      type='submit'
      className='px-4 py-2.5 md:py-3 w-full text-white text-sm md:text-base font-medium rounded-full bg-gradient-to-r from-[#61D9DE] to-[#1200AF] transition-all hover:opacity-90 hover:shadow-x'
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Carregando...' : 'Login'}
      {showAnimation && !isSubmitting && (
        <motion.div
          key='button-animation'
          className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30'
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100%', opacity: [0, 0.5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 7,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      )}
    </button>
  )
}
