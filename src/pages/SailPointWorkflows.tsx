import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Image paths — assets live in public/images/ and are served from the base URL
const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/workflows-hero-optimized.webp`,
  interface: `${base}images/workflows-interface-optimized.webp`,
  operatorSetup: `${base}images/workflows-operator-setup-optimized.mp4`,
  operatorFields: `${base}images/workflows-operator-fields-optimized.mp4`,
  actions: `${base}images/workflows-actions-optimized.mp4`,
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
          What happens when engineering starts before research does.
        </h1>

        {/* Badge */}
        <div>
          <div className="inline-flex items-center gap-4 rounded-lg border border-white/10 bg-black/50 px-5 py-3.5 backdrop-blur-[2px]">
            <span className="font-['Liberation_Mono',monospace] text-xs font-bold uppercase tracking-[0.35px] text-white md:text-sm">
              SailPoint Workflows
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#0055a5]" aria-hidden />
            <span className="text-xs text-neutral-300 md:text-sm">
              Rescuing a product from its own technology
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

function CaseVideo({ src, alt }: { src: string; alt: string }) {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      aria-label={alt}
      className="h-auto w-full object-contain"
    />
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
              src={img.interface}
              alt="SailPoint Workflows interface"
              onClick={() => openLightbox(img.interface, 'SailPoint Workflows interface — full view')}
            />
            <SituationText />
          </div>

          {/* The Call */}
          <div className="flex flex-col gap-8">
            <CaseVideo src={img.operatorSetup} alt="Operator setup workflow demonstration" />
            <CaseVideo src={img.operatorFields} alt="Operator fields workflow demonstration" />
            <TheCallText />
          </div>

          {/* The Outcome */}
          <div className="flex flex-col gap-8">
            <CaseVideo src={img.actions} alt="Workflow actions demonstration" />
            <TheOutcomeText />
          </div>
        </div>

        {/* ── Desktop: two-column grid (images | text) ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_438px] lg:gap-16">
          {/* Left: images stacked */}
          <div className="flex flex-col gap-[70px]">
            <CaseImage
              src={img.interface}
              alt="SailPoint Workflows interface"
              onClick={() => openLightbox(img.interface, 'SailPoint Workflows interface — full view')}
            />
            <CaseVideo src={img.operatorSetup} alt="Operator setup workflow demonstration" />
            <CaseVideo src={img.operatorFields} alt="Operator fields workflow demonstration" />
            <CaseVideo src={img.actions} alt="Workflow actions demonstration" />
          </div>

          {/* Right: all text sections stacked */}
          <div className="flex flex-col gap-16">
            <SituationText />
            <TheCallText />
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
          Every time an employee joins a company, changes roles, or leaves, someone has to manage their access. Who can get into which systems, which applications, which data. At enterprise scale, that work is relentless. SailPoint needed a tool that would let administrators automate those workflows without writing a single line of code. Intuitive enough for a non-technical user. Powerful enough for enterprise security at scale.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          The vision was clear. The execution had already started without us.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          By the time my team was engaged, nearly two quarters of engineering had been invested in a technical model that didn't match how users actually thought about their work. The product was being built for the technology, not for the people who would use it.
        </p>
        <p className="text-base leading-[26px] text-neutral-900">
          We started research immediately.
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
          What we found was significant enough to change direction. Users didn't think in terms of the technical model engineering had assumed. Their mental model was fundamentally different, and designing to it rather than around it meant redirecting the product before it was too late.
        </p>
        <SideQuote>
          It was an uncomfortable conversation. It was also the right one.
        </SideQuote>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          This is one of the clearest examples I can point to of what happens when UX research is engaged before development begins versus after. Two quarters of rework, avoided. A product launched on the right foundation instead of a corrected one.
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
          Workflows launched in October 2022 as part of SailPoint's Business Plus suite. Within the first few months it had delivered 100% above its set Key Results — not by accident, but because the foundation was right.
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
          "The most expensive design decision a company can make is treating UX as a finishing step rather than a starting point."
        </blockquote>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SailPointWorkflows() {
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
