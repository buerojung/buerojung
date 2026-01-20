import { getServices } from '@/lib/sanity/queries'
import SectionHeading from '@/components/SectionHeading'
import ServiceCard from '@/components/ServiceCard'

export default async function ServicePage() {
  const services = await getServices()

  return (
    <main className="pt-20 min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="mb-12 sm:mb-16">
          <SectionHeading
            label="SERVICES"
            title="What We Offer"
          />
        </div>

        {services && services.length > 0 ? (
          <div className="space-y-8 sm:space-y-12">
            {services.map((service, index) => (
              <ServiceCard key={service._id} service={service} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-white/60 text-lg">No services available.</p>
          </div>
        )}
      </div>
    </main>
  )
}
