import { Instagram, Twitter, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-xl tracking-[0.3em] text-primary font-light uppercase mb-6">
              sclapture
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Curating exceptional sculptures that transcend time. Each piece in our collection
              represents the pinnacle of artistic craftsmanship.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-10 w-10 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4 stroke-1" />
              </a>
              <a
                href="#"
                className="h-10 w-10 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-4 w-4 stroke-1" />
              </a>
              <a
                href="#"
                className="h-10 w-10 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4 stroke-1" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm tracking-[0.2em] text-foreground uppercase mb-6">
              Gallery
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Gold Collection
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Silver Collection
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Limited Editions
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm tracking-[0.2em] text-foreground uppercase mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Artisans
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-[0.2em] text-foreground uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="block text-foreground mb-1">Showroom</span>
                123 Gallery Lane<br />
                New York, NY 10001
              </li>
              <li>
                <span className="block text-foreground mb-1">Inquiries</span>
                <a href="mailto:hello@salsabeel.gallery" className="hover:text-primary transition-colors">
                  hello@salsabeel.gallery
                </a>
              </li>
              <li>
                <span className="block text-foreground mb-1">Phone</span>
                <a href="tel:+12125550100" className="hover:text-primary transition-colors">
                  +1 (212) 555-0100
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} sclapture. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Shipping & Returns
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
