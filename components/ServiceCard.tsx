'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface ServiceCardProps {
  service: {
    _id: string
    title: string
    description?: string
    icon?: any
    order?: number
  }
  index?: number
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const iconUrl = service.icon
    ? urlFor(service.icon).width(64).height(64).url()
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group border-b border-white/10 pb-8 hover:border-white/30 transition-colors"
    >
      <div className="flex items-start gap-6">
        {service.order && (
          <span className="text-4xl sm:text-5xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
            {String(service.order).padStart(2, '0')}
          </span>
        )}
        <div className="flex-1">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:opacity-60 transition-opacity">
            {service.title}
          </h3>
          {service.description && (
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {service.description}
            </p>
          )}
        </div>
        {iconUrl && (
          <div className="w-12 h-12 relative">
            <Image
              src={iconUrl}
              alt={service.title}
              fill
              className="object-contain opacity-40 group-hover:opacity-60 transition-opacity"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

