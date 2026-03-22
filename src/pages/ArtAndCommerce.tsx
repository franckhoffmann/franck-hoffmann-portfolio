import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Image paths — assets live in public/images/ and are served from the base URL
const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/art-commerce-hero-optimized.webp`,
  img001: `${base}images/art-commerce-001.jpg`,
  img018: `${base}images/art-commerce-018.jpg`,
  img019: `${base}images/art-commerce-019.jpg`,
  img021: `${base}images/art-commerce-021.jpg`,
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
          The most sought-after photographers in the world.
        </h1>

        <div>
          <div className="inline-flex items-center gap-4 rounded-lg border border-white/10 bg-black/50 px-5 py-3.5 backdrop-blur-[2px]">
            <span className="font-['Liberation_Mono',monospace] text-xs font-bold uppercase tracking-[0.35px] text-white md:text-sm">
              Art + Commerce
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#0055a5]" aria-hidden />
            <span className="text-xs text-neutral-300 md:text-sm">
              Built to last
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

        {/* ── Mobile / tablet ── */}
        <div className="flex flex-col gap-16 lg:hidden">
          <div className="flex flex-col gap-8">
            <CaseImage src={img.img001} alt="Art + Commerce homepage" onClick={() => openLightbox(img.img001, 'Art + Commerce homepage — full view')} />
            <CaseImage src={img.img018} alt="Art + Commerce image archive page" onClick={() => openLightbox(img.img018, 'Art + Commerce image archive page — full view')} />
            <SituationText />
          </div>
          <div className="flex flex-col gap-8">
            <TheCallText />
          </div>
          <div className="flex flex-col gap-8">
            <CaseImage src={img.img019} alt="Art + Commerce image archive lightbox selection" onClick={() => openLightbox(img.img019, 'Art + Commerce image archive lightbox selection — full view')} />
            <CaseImage src={img.img021} alt="Art + Commerce reorder portfolios" onClick={() => openLightbox(img.img021, 'Art + Commerce reorder portfolios — full view')} />
            <TheOutcomeText />
          </div>
        </div>

        {/* ── Desktop: two-column grid (images | text) ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_438px] lg:gap-16">
          {/* Left: all images stacked */}
          <div className="flex flex-col gap-[70px]">
            <CaseImage src={img.img001} alt="Art + Commerce homepage" onClick={() => openLightbox(img.img001, 'Art + Commerce homepage — full view')} />
            <CaseImage src={img.img018} alt="Art + Commerce image archive page" onClick={() => openLightbox(img.img018, 'Art + Commerce image archive page — full view')} />
            <CaseImage src={img.img019} alt="Art + Commerce image archive lightbox selection" onClick={() => openLightbox(img.img019, 'Art + Commerce image archive lightbox selection — full view')} />
            <CaseImage src={img.img021} alt="Art + Commerce reorder portfolios" onClick={() => openLightbox(img.img021, 'Art + Commerce reorder portfolios — full view')} />
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
          Art + Commerce was, and remains, one of the most influential photographer representation agencies in the world. Annie Leibovitz. Steven Meisel. The photographers whose images define how we see culture, fashion, and public life.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          When I joined in 2004, the agency was navigating one of the most consequential shifts in its history: the move from analog to digital. The challenge wasn't just aesthetic. It was infrastructural. Photography at this scale means managing licensing rights, royalty tracking, usage permissions, and digital distribution across hundreds of photographers and thousands of images. Every decision had legal and financial consequences.
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
          I collaborated closely with Creative Director Lisa Naftolin, a board member of AIGA New York, to ensure the digital vision was as considered as the creative one.
        </p>
        <SideQuote>
          The platform I helped build had to handle image archiving, licensing, and royalty management in a single coherent system — reliably, at scale, and in a way that the agency could actually operate without a technical team looking over their shoulder every day. It had to be powerful enough for the complexity of the work, and simple enough for the people doing it.
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
          The platform launched in 2004 and is still running today.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          That kind of longevity doesn't happen by accident. It happens when the architecture is right, when the decisions made under pressure hold up over time, and when the people building it understand that good design isn't about what's impressive at launch.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          It's about what still works twenty years later.
        </p>
        <p className="text-base leading-[26px] text-neutral-900">
          Art + Commerce was where I learned that. Everything I've built since has been shaped by it.
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
          "Good design isn't about what's impressive at launch. It's about what still works twenty years later."
        </blockquote>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ArtAndCommerce() {
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
