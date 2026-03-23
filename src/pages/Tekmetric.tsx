import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Image paths — assets live in public/images/ and are served from the base URL
const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/tekmetric-hero.jpg`,
  plg: `${base}images/tekmetric-plg-optimized.webp`,
  dashboard: `${base}images/tekmetric-marketing-dashboard-optimized.webp`,
  booking: `${base}images/tekmetric-booking-tool.jpg`,
  campaigns: `${base}images/tekmetric-customer-campaigns-optimized.webp`,
  filters: `${base}images/tekmetric-filters-optimized.webp`,
  googleReviews: `${base}images/tekmetric-google-reviews-black-header-optimized.webp`,
}

// ---------------------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------------------

function ImageLightbox({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
}: {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <VisuallyHidden.Root>
            <Dialog.Title>{imageAlt}</Dialog.Title>
            <Dialog.Description>Full size image view</Dialog.Description>
          </VisuallyHidden.Root>
          {/* Container: scrollable so tall images don't overflow the viewport */}
          <div
            className="relative max-h-[90vh] overflow-y-auto rounded-lg"
            style={{ width: 'min(2500px, calc(100vw - 64px))' }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="block h-auto w-full rounded-lg"
            />
            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section
      className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden"
      aria-label="Case study hero"
    >
      {/* Background image */}
      <img
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        src={img.hero}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full max-w-[1280px] flex-col justify-between px-6 pb-10 pt-16 md:px-12 md:pb-14 md:pt-20 lg:pb-16 lg:pt-32">
        <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.813rem] lg:leading-[1] lg:tracking-[-1.8px]">
          Built for the shop.<br />Designed for growth.
        </h1>

        {/* Badge */}
        <div>
          <div className="inline-flex items-center gap-4 rounded-lg border border-white/10 bg-black/50 px-5 py-3.5 backdrop-blur-[2px]">
            <span className="font-['Liberation_Mono',monospace] text-xs font-bold uppercase tracking-[0.35px] text-white md:text-sm">
              Tekmetric Marketing Suite
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#0055a5]" aria-hidden />
            <span className="text-xs text-neutral-300 md:text-sm">
              Shipping a new product under pressure
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Section label (mono uppercase blue)
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-['Liberation_Mono',monospace] text-xs font-bold uppercase tracking-[1.4px] text-[#0055a5] md:text-sm">
      {children}
    </h2>
  )
}

// ---------------------------------------------------------------------------
// Blockquote with left blue border
// ---------------------------------------------------------------------------

function SideQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-[#0055a5] py-1 pl-5">
      <p className="text-base leading-[26px] text-neutral-900">{children}</p>
    </blockquote>
  )
}

// ---------------------------------------------------------------------------
// Clickable image (opens lightbox)
// ---------------------------------------------------------------------------

function CaseImage({
  src,
  alt,
  onClick,
}: {
  src: string
  alt: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full cursor-zoom-in text-left focus:outline-none"
      aria-label={`Enlarge: ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        className="h-auto w-full object-contain transition-opacity group-hover:opacity-90"
      />
    </button>
  )
}

// ---------------------------------------------------------------------------
// Main body — images left, text right (desktop) / stacked (mobile)
// ---------------------------------------------------------------------------

function CaseStudyBody({
  openLightbox,
}: {
  openLightbox: (src: string, alt: string) => void
}) {
  return (
    <div className="bg-[#f9fafb]">
      <div className="mx-auto max-w-[1280px] px-6 pt-16 pb-12 md:px-12 md:pt-24 lg:px-32 lg:pt-32">

        {/* ── Mobile / tablet: each section is image → text ── */}
        <div className="flex flex-col gap-16 lg:hidden">
          {/* Situation */}
          <div className="flex flex-col gap-8">
            <CaseImage
              src={img.dashboard}
              alt="Tekmetric Marketing Suite dashboard"
              onClick={() => openLightbox(img.dashboard, 'Tekmetric Marketing Suite dashboard — full view')}
            />
            <SituationText />
          </div>

          {/* The Product */}
          <div className="flex flex-col gap-8">
            <CaseImage
              src={img.booking}
              alt="Tekmetric online booking tool"
              onClick={() => openLightbox(img.booking, 'Tekmetric online booking tool — full view')}
            />
            <TheProductText />
          </div>

          {/* The Challenge */}
          <div className="flex flex-col gap-8">
            <CaseImage
              src={img.filters}
              alt="Tekmetric campaign audience filters"
              onClick={() => openLightbox(img.filters, 'Tekmetric campaign filters — full view')}
            />
            <TheChallengeText />
          </div>

          {/* The Outcome */}
          <div className="flex flex-col gap-8">
            <CaseImage
              src={img.googleReviews}
              alt="Tekmetric Google Reviews integration"
              onClick={() => openLightbox(img.googleReviews, 'Tekmetric Google Reviews — full view')}
            />
            <TheOutcomeText />
          </div>
        </div>

        {/* ── Desktop: two-column grid (images | text) ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_438px] lg:gap-16">
          {/* Left: images stacked */}
          <div className="flex flex-col gap-[70px]">
            <CaseImage
              src={img.dashboard}
              alt="Tekmetric Marketing Suite dashboard"
              onClick={() => openLightbox(img.dashboard, 'Tekmetric Marketing Suite dashboard — full view')}
            />
            <CaseImage
              src={img.booking}
              alt="Tekmetric online booking tool"
              onClick={() => openLightbox(img.booking, 'Tekmetric online booking tool — full view')}
            />
            <CaseImage
              src={img.filters}
              alt="Tekmetric campaign audience filters"
              onClick={() => openLightbox(img.filters, 'Tekmetric campaign filters — full view')}
            />
            <CaseImage
              src={img.googleReviews}
              alt="Tekmetric Google Reviews integration"
              onClick={() => openLightbox(img.googleReviews, 'Tekmetric Google Reviews — full view')}
            />
          </div>

          {/* Right: all text sections stacked */}
          <div className="flex flex-col gap-16">
            <SituationText />
            <TheProductText />
            <TheChallengeText />
            <TheOutcomeText />
          </div>
        </div>
      </div>

      {/* Quote section */}
      <LessonSection />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Text sections
// ---------------------------------------------------------------------------

function SituationText() {
  return (
    <section aria-labelledby="section-situation">
      <SectionLabel>The Situation</SectionLabel>
      <div className="mt-6 flex flex-col gap-6">
        <p className="text-base font-light leading-[26px] text-neutral-700">
          Tekmetric had a problem and an opportunity at the same time.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          The problem: shop owners were juggling multiple disconnected tools to run their marketing. Separate platforms for booking, reviews, campaigns, and customer communication. Every tool meant another login, another invoice, another thing to learn.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          The opportunity: Tekmetric already lived at the center of how these shops operated. Every repair order, every customer record, every appointment was already in the platform. The data to power a marketing suite was already there. It just needed a product built around it.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          Tekmetric made the strategic decision to build that product from scratch rather than integrate an acquired solution. The new Marketing Suite had to launch on a fixed date. A cross-selling motion was already lined up, and the business was counting on it.
        </p>
        <p className="text-base leading-[26px] text-neutral-900">
          As the Director of Product Design, my role was to create the conditions for the team to ship something worth shipping.
        </p>
      </div>
    </section>
  )
}

function TheProductText() {
  return (
    <section aria-labelledby="section-product">
      <SectionLabel>The Product</SectionLabel>
      <div className="mt-6 flex flex-col gap-6">
        <p className="text-base font-light leading-[26px] text-neutral-700">
          For a shop owner, running marketing used to mean juggling three or four separate tools — one for booking, one for reviews, one for campaigns, each with its own login and its own learning curve. The Marketing Suite collapsed all of that into a single place: the platform they were already in every day.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          Customers can book appointments 24/7 directly from the shop's website. Campaigns reach the right customers automatically. Google reviews surface in one place and can be responded to without switching tabs. It sounds simple. That's the point.
        </p>
      </div>
    </section>
  )
}

function TheChallengeText() {
  return (
    <section aria-labelledby="section-challenge">
      <SectionLabel>The Challenge</SectionLabel>
      <div className="mt-6 flex flex-col gap-6">
        <p className="text-base font-light leading-[26px] text-neutral-700">
          A new product. A fixed deadline. A designer who needed support, not a new boss.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          My job was to stay close enough to know where the friction was, and far enough to let the team do their work. That meant weekly design reviews focused on the highest-leverage decisions. Not pixel reviews, but interaction decisions that would affect adoption. It meant partnering closely with the Director of PM to understand the release timeline and where design could add value without adding risk. It meant knowing when to push for quality and when to protect the deadline.
        </p>
        <SideQuote>
          Not every battle is worth fighting. Part of design leadership is knowing which ones are.
        </SideQuote>
      </div>
    </section>
  )
}

function TheOutcomeText() {
  return (
    <section aria-labelledby="section-outcome">
      <SectionLabel>The Outcome</SectionLabel>
      <div className="mt-6 flex flex-col gap-6">
        <p className="text-base font-light leading-[26px] text-neutral-700">
          The Marketing Suite launched on time. The cross-selling motion worked.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          In under six months: $4.7M ARR added. Across all shops, $609K in posted repair order revenue is directly attributable to Marketing Suite campaigns and automations. Year to date, 201K unique customers have viewed the online booking widget, up 172% from the previous three months.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          The adoption curve tells its own story. Roughly two thirds of shops are actively using the online booking services every month. Some shops sent their first campaign within 24 hours of joining the platform.
        </p>
        <SideQuote>
          "From an operational standpoint, having everything on one platform streamlines my workflow and allows me to spend more time with my customers." — Kellyn, Karr Automotive
        </SideQuote>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Lesson / pull quote
// ---------------------------------------------------------------------------

function LessonSection() {
  return (
    <div className="border-t border-neutral-200 px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-[1046px]">
        <blockquote className="text-center text-2xl font-bold leading-snug tracking-tight text-neutral-900 md:text-4xl lg:text-[48px] lg:leading-[1.1] lg:tracking-[-1.2px]">
          "The product that ships is always better than the perfect product that doesn't."
        </blockquote>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Tekmetric() {
  useEffect(() => { document.title = 'Tekmetric Marketing Suite — Franck Hoffmann' }, [])
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <CaseStudyBody openLightbox={(src, alt) => setLightbox({ src, alt })} />
      </main>
      <Footer />

      {lightbox && (
        <ImageLightbox
          isOpen
          onClose={() => setLightbox(null)}
          imageSrc={lightbox.src}
          imageAlt={lightbox.alt}
        />
      )}
    </div>
  )
}
