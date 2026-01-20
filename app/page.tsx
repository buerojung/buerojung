import Link from 'next/link'
import { getFeaturedProjects, getServices, getSettings } from '@/lib/sanity/queries'
import Hero from '@/components/Hero'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import ServiceCard from '@/components/ServiceCard'

export default async function Home() {
  const featuredProjects = await getFeaturedProjects()
  const services = await getServices()
  const settings = await getSettings()

  return (
    <main className="bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects Section */}
      {featuredProjects && featuredProjects.length > 0 && (
        <section className="py-20 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto mb-12 sm:mb-16">
            <SectionHeading
              label="OUR WORK"
              title="Selected Projects"
            />
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 sm:gap-8 px-6 sm:px-8 lg:px-12">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-12 sm:mt-16 px-6 sm:px-8 lg:px-12">
            <Link
              href="/archive"
              className="inline-block text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors"
            >
              View all projects →
            </Link>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services && services.length > 0 && (
        <section className="py-20 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 sm:mb-16">
              <SectionHeading
                label="SERVICES"
                title="What We Do"
              />
            </div>

            <div className="space-y-8 sm:space-y-12">
              {services.map((service, index) => (
                <ServiceCard key={service._id} service={service} index={index} />
              ))}
            </div>

            <div className="mt-12 sm:mt-16">
              <Link
                href="/service"
                className="inline-block text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors"
              >
                View all services →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About/Agency Section */}
      <section className="py-20 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-medium">
              ABOUT US
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none mb-8 sm:mb-12">
            We are a creative agency focused on digital excellence.
          </h2>
          <div className="space-y-6 text-lg sm:text-xl text-white/60 leading-relaxed">
            <p>
              At buerojung, we combine strategic thinking with creative execution to deliver
              exceptional digital experiences. Our team of designers, developers, and strategists
              work together to bring your vision to life.
            </p>
            <p>
              We believe in the power of great design and innovative technology to create meaningful
              connections between brands and their audiences.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-medium">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none mb-8 sm:mb-12">
            Let's work together
          </h2>
          <p className="text-lg sm:text-xl text-white/60 mb-12 leading-relaxed">
            Ready to start your next project? Get in touch and let's create something amazing.
          </p>

          <form className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Your email"
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white text-lg placeholder:text-white/40"
              />
            </div>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacy"
                required
                className="mt-1 w-5 h-5 bg-white/5 border border-white/10 rounded focus:ring-2 focus:ring-white/20"
              />
              <label htmlFor="privacy" className="text-sm text-white/60 leading-relaxed">
                I agree to the privacy policy and terms of service.
              </label>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#0a0a0a] rounded-full text-lg font-bold hover:bg-white/90 transition-colors"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-block text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors"
            >
              Or contact us directly →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
