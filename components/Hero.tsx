'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] flex flex-col">
      {/* Main Hero Content */}
      <div className="flex-1 flex items-center px-6 sm:px-8 lg:px-12 py-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side - Label and Title */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-medium mb-6 block"
              >
                [SERVICES]
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none text-white"
              >
                How We Help You
                <br />
                Rebuild the Narrative
              </motion.h1>
            </div>

            {/* Right Side - Description */}
            <div className="flex items-start">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-xl"
              >
                We help you safely navigate, reframe, and reintegrate your memories, ethically, safely, and with intention.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
