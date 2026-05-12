import { motion, useScroll } from 'framer-motion'

/**
 * Thin progress bar pinned to the bottom of the fixed nav.
 * Tracks vertical scroll progress (0 → 1) using framer-motion's useScroll().
 */
export default function WBScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 z-[51] origin-left pointer-events-none"
      style={{
        top: 64,
        height: 2,
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, rgba(173,235,255,0.6) 0%, rgba(255,255,255,0.9) 100%)',
      }}
    />
  )
}
