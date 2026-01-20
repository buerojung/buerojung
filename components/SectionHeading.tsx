'use client'

import { motion } from 'framer-motion'

interface SectionHeadingProps {
  label: string
  title: string
  className?: string
}

export default function SectionHeading({ label, title, className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-12 ${className}`}
    >
      <span className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-medium">
        {label}
      </span>
      <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none">
        {title}
      </h2>
    </motion.div>
  )
}

