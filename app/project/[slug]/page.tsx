import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  
  const project = await client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      client,
      category->{title, slug},
      date,
      mainImage,
      gallery,
      videoUrl,
      description
    }`,
    { slug }
  )

  if (!project) {
    notFound()
  }

  const mainImageUrl = project.mainImage
    ? urlFor(project.mainImage).width(1920).height(1080).url()
    : null

  return (
    <main className="pt-20 min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <Link
          href="/archive"
          className="inline-block mb-16 text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider"
        >
          ← Back to Archive
        </Link>

        <div className="mb-16">
          {project.category && (
            <span className="text-xs uppercase tracking-wider text-white/40 mb-6 block">
              {project.category.title}
            </span>
          )}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none mb-8">
            {project.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-lg sm:text-xl text-white/60">
            {project.client && (
              <p>for {project.client}</p>
            )}
            {project.date && (
              <span className="text-white/40">
                {new Date(project.date).getFullYear()}
              </span>
            )}
          </div>
        </div>

        {mainImageUrl && (
          <div className="relative aspect-video mb-20 overflow-hidden">
            <Image
              src={mainImageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {project.videoUrl && (
          <div className="mb-20 aspect-video">
            <iframe
              src={project.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {project.description && (
          <div className="max-w-4xl mb-20">
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-20">
            {project.gallery.map((image: any, index: number) => {
              const imageUrl = urlFor(image).width(1400).height(1000).url()
              return (
                <div key={index} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`${project.title} - Gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
