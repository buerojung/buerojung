'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'

interface ProjectCardProps {
  project: {
    _id: string
    title: string
    slug: { current: string }
    client?: string
    category?: { title: string; slug: { current: string } }
    date?: string
    mainImage?: any
    description?: string
  }
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const imageUrl = project.mainImage
    ? urlFor(project.mainImage).width(1400).height(900).url()
    : null

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 w-[85vw] sm:w-[600px] lg:w-[700px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/project/${project.slug.current}`}>
        <div className="relative group cursor-pointer">
          <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
            {imageUrl ? (
              <>
                <Image
                  src={imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700"
                  style={{
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/40"
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 text-xl">
                No Image
              </div>
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-6 sm:p-8"
          >
            {project.category && (
              <span className="text-xs uppercase tracking-wider text-white/60 mb-2 block">
                {project.category.title}
              </span>
            )}
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {project.title}
            </h3>
            {project.client && (
              <p className="text-sm text-white/80">for {project.client}</p>
            )}
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

