import { Award, Gem, Truck, Shield } from 'lucide-react'

export function AboutSection() {
  const features = [
    {
      icon: Gem,
      title: 'Premium Materials',
      description: 'Only the finest gold and silver alloys, sourced from certified suppliers.',
    },
    {
      icon: Award,
      title: 'Master Artisans',
      description: 'Each piece crafted by artisans with decades of expertise in metalwork.',
    },
    {
      icon: Shield,
      title: 'Lifetime Warranty',
      description: 'Every sculpture comes with our comprehensive lifetime guarantee.',
    },
    {
      icon: Truck,
      title: 'White Glove Delivery',
      description: 'Secure, insured shipping with professional installation available.',
    },
  ]

  return (
    <section id="about" className="relative isolate overflow-hidden py-24 md:py-32 bg-card/30">
      <div className="philosophy-ornaments" aria-hidden="true">
        <span className="philosophy-shape philosophy-diamond" />
        <span className="philosophy-shape philosophy-ring" />
        <span className="philosophy-shape philosophy-spark" />
        <span className="philosophy-shape philosophy-orbit" />
        <span className="philosophy-shape philosophy-dash" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.4em] text-muted-foreground uppercase mb-4">
            Our Philosophy
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6 text-balance">
            The Art of <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed text-pretty">
            At sclapture, we believe that true luxury lies in the marriage of exceptional 
            craftsmanship and timeless design. Each sculpture tells a story of dedication, skill, 
            and artistic vision.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 border border-border bg-background/50 hover:border-primary/50 transition-all duration-300"
            >
              <div className="h-12 w-12 mb-6 border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <feature.icon className="h-5 w-5 stroke-1 text-primary" />
              </div>
              <h3 className="text-lg font-light text-foreground mb-3 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="mt-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/artisan.jpg"
              alt="Artisan crafting a sculpture"
              className="w-full h-full object-cover"
            />
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-primary/20 -z-10" />
          </div>
          <div>
            <p className="text-sm tracking-[0.4em] text-muted-foreground uppercase mb-4">
              Our Story
            </p>
            <h3 className="text-3xl md:text-4xl font-light text-foreground mb-6 text-balance">
              A Legacy of <span className="text-primary">Artistry</span>
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 1987, sclapture began as a small atelier dedicated to 
                preserving the ancient art of metalwork sculpture. What started as a passion 
                project has grown into one of the world&apos;s most respected collections of 
                contemporary metal art.
              </p>
              <p>
                Today, we collaborate with master artisans from around the globe, each bringing 
                their unique perspective while honoring traditional techniques passed down through 
                generations. Our commitment to excellence ensures that every piece meets the 
                highest standards of quality and aesthetic refinement.
              </p>
              <p>
                Whether you&apos;re a seasoned collector or discovering fine art for the first time, 
                we invite you to experience the extraordinary craftsmanship that defines the 
                sclapture collection.
              </p>
            </div>
            <a
              href="#gallery"
              className="inline-flex items-center mt-8 text-sm tracking-[0.2em] uppercase text-primary hover:text-primary/80 transition-colors"
            >
              Explore the Collection
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
