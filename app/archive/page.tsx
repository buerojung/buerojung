'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import SectionHeading from '@/components/SectionHeading'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  client?: string
  category?: { title: string; slug: { current: string } }
  date?: string
  mainImage?: any
  description?: string
}

interface Category {
  _id: string
  title: string
  slug: { current: string }
}

export default function ArchivePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [projectsData, categoriesData] = await Promise.all([
          client.fetch(
            groq`*[_type == "project"] | order(date desc) {
              _id,
              title,
              slug,
              client,
              category->{title, slug},
              date,
              mainImage,
              description
            }`
          ),
          client.fetch(
            groq`*[_type == "category"] | order(title asc) {
              _id,
              title,
              slug
            }`
          ),
        ])
        setProjects(projectsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter(
          (project) => project.category?.slug?.current === selectedCategory
        )

  return (
    <main className="pt-20 min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="mb-12 sm:mb-16">
          <SectionHeading
            label="ARCHIVE"
            title="All Projects"
          />
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all uppercase tracking-wider ${
                selectedCategory === 'all'
                  ? 'bg-white text-[#0a0a0a]'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category.slug.current)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all uppercase tracking-wider ${
                  selectedCategory === category.slug.current
                    ? 'bg-white text-[#0a0a0a]'
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-24">
            <p className="text-white/60 text-lg">Loading projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
            >
              {filteredProjects.map((project, index) => {
                const imageUrl = project.mainImage
                  ? urlFor(project.mainImage).width(1000).height(750).url()
                  : null

                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link href={`/project/${project.slug.current}`}>
                      <div className="group cursor-pointer">
                        <div className="relative aspect-[4/3] overflow-hidden bg-white/5 mb-6">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20 text-xl">
                              No Image
                            </div>
                          )}
                        </div>
                        <div>
                          {project.category && (
                            <span className="text-xs uppercase tracking-wider text-white/40 mb-3 block">
                              {project.category.title}
                            </span>
                          )}
                          <h3 className="text-2xl sm:text-3xl font-bold mb-2 group-hover:opacity-60 transition-opacity leading-none">
                            {project.title}
                          </h3>
                          {project.client && (
                            <p className="text-base text-white/60">for {project.client}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-24">
            <p className="text-white/60 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
