import type {Variants} from 'framer-motion'

export const dashboardNavVariant: Variants = {
    animate: {
      width: '80px',
      transition: {
        type: 'spring',
        duration: 0.8,
        damping: 8,
        mass: 0.4,
        stiffness: 100
      }
    },
    initial: {
      width: '250px',
      transition: {
        type: 'spring',
        duration: 0.8,
        damping: 8,
        mass: 0.4,
        stiffness: 100,
      }
    }
  }

export const logoVariants: Variants = {
  initial: {
      opacity: 0
  },
  animate: {
      opacity: 1,
      transition: {
          duration: 0.4,
      }
  }
}