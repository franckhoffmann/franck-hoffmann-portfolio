import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Image paths — assets live in public/images/ and are served from the base URL
const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/uber-hero.jpg`,
  blog: `${base}images/uber-blog-optimized.webp`,
  latam: `${base}images/uber-latam-optimized.webp`,
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
      <img
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        src={img.hero}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full w-full max-w-[1280px] flex-col justify-between px-6 pb-10 pt-16 md:px-12 md:pb-14 md:pt-20 lg:pb-16 lg:pt-32">
        <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.813rem] lg:leading-[1] lg:tracking-[-1.8px]">
          Optimizing the B2B experiences with the confidence of evidence-based design.
        </h1>

        <div>
          <div className="inline-flex items-center gap-4 rounded-lg border border-white/10 bg-black/50 px-5 py-3.5 backdrop-blur-[2px]">
            <span className="font-['Liberation_Mono',monospace] text-xs font-bold uppercase tracking-[0.35px] text-white md:text-sm">
              Uber
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#0055a5]" aria-hidden />
            <span className="text-xs text-neutral-300 md:text-sm">
              Finding the bug that changed everything
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
          <div className="flex flex-col gap-8">
            <CaseImage
              src={img.blog}
              alt="Uber driver onboarding data analysis"
              onClick={() => openLightbox(img.blog, 'Uber driver onboarding analysis — full view')}
            />
            <SituationText />
          </div>

          <div className="flex flex-col gap-8">
            <CaseImage
              src={img.latam}
              alt="Uber LATAM brand redesign"
              onClick={() => openLightbox(img.latam, 'Uber LATAM brand redesign — full view')}
            />
            <TheCallText />
          </div>

          <div className="flex flex-col gap-8">
            <TheOutcomeText />
          </div>
        </div>

        {/* ── Desktop: two-column grid (images | text) ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_438px] lg:gap-16">
          {/* Left: images stacked */}
          <div className="flex flex-col gap-[70px]">
            <CaseImage
              src={img.blog}
              alt="Uber driver onboarding data analysis"
              onClick={() => openLightbox(img.blog, 'Uber driver onboarding analysis — full view')}
            />
            <CaseImage
              src={img.latam}
              alt="Uber LATAM brand redesign"
              onClick={() => openLightbox(img.latam, 'Uber LATAM brand redesign — full view')}
            />
          </div>

          {/* Right: all text sections stacked */}
          <div className="flex flex-col gap-16">
            <SituationText />
            <TheCallText />
            <TheOutcomeText />
          </div>
        </div>
      </div>

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
          No drivers, no rides. No rides, no business. Uber's entire model depended on a steady supply of people willing to get behind the wheel, and the cost of acquiring each one was eating into margins. The digital marketing team had a single metric that mattered: drivers onboarded divided by total marketing spend.
        </p>
        <p className="text-base leading-[26px] text-neutral-900">
          The ask was simple: move that number through UX.
        </p>
      </div>
    </section>
  )
}

function TheCallText() {
  return (
    <section aria-labelledby="section-call">
      <SectionLabel>The Call</SectionLabel>
      <div className="mt-6 flex flex-col gap-6">
        <p className="text-base font-light leading-[26px] text-neutral-700">
          Over several months, my team ran 39 A/B experiments on the driver onboarding flow. Most moved the needle. One didn't, and that's where the real story starts.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          We tested a hypothesis that many potential drivers were already Uber riders. If true, letting them use an existing account would skip large parts of the onboarding flow, dramatically reducing friction and accelerating sign-ups. The data came back discouraging. Thirty percent of users downloaded the app, but only two percent completed onboarding. By any measure, the experiment had failed.
        </p>
        <SideQuote>
          Except something didn't add up.
        </SideQuote>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          I couldn't accept that 98% of people who downloaded the app would simply abandon it. I consulted with my analyst and account manager. We suspected existing riders who become drivers weren't being counted correctly, which would mean the entire measurement program was built on flawed data. Uber's measurement team assured us that wasn't the case and denied our request to run a follow-up experiment.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          So I ran my own.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          Since I already had an Uber account, I went through the driver onboarding process myself and asked Uber's digital marketing team to track my specific account through the flow. What we found confirmed everything we suspected: existing riders converting to drivers were not being tracked due to a bug.
        </p>
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
          That discovery changed the entire story of the optimization program that year. The digital marketing lead was promoted to oversee Uber's entire digital marketing program on the strength of what we uncovered.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          The numbers: 35,000 organic driver sign-ups and $1.9M in reduced marketing spend in a single quarter.
        </p>
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
          "The most valuable thing a UX team can do isn't always design. Sometimes it's refusing to accept a number that doesn't make sense."
        </blockquote>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Uber() {
  useEffect(() => { document.title = 'Uber — Franck Hoffmann' }, [])
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
