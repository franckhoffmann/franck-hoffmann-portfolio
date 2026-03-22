import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Image paths — assets live in public/images/ and are served from the base URL
const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/orange-logic-hero-optimized.webp`,
  screenshot1: `${base}images/orange-logic-screenshot-1.jpg`,
  screenshot2: `${base}images/orange-logic-screenshot-2.jpg`,
  screenshot3: `${base}images/orange-logic-screenshot-3.jpg`,
  before: `${base}images/orange-logic-before.jpg`,
  after: `${base}images/orange-logic-after.jpg`,
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
          Evolving a platform trusted by the world's most demanding media organizations.
        </h1>

        <div>
          <div className="inline-flex items-center gap-4 rounded-lg border border-white/10 bg-black/50 px-5 py-3.5 backdrop-blur-[2px]">
            <span className="font-['Liberation_Mono',monospace] text-xs font-bold uppercase tracking-[0.35px] text-white md:text-sm">
              Orange Logic
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#0055a5]" aria-hidden />
            <span className="text-xs text-neutral-300 md:text-sm">
              Seven years of careful, compounding design
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
// Vimeo embed with caption
// ---------------------------------------------------------------------------

function VimeoEmbed() {
  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src="https://player.vimeo.com/video/1175753445?h=566953d30a&badge=0&autopause=0&player_id=0&app_id=58479"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          title="Meet Orange Logic The Complete DAM Solution"
        />
      </div>
      <p className="mt-2 text-xs text-neutral-400">
        A platform walkthrough of Cortex, Orange Logic's digital asset management platform. The video captures the breadth of the system — asset management, rights management, project management, AI-powered tagging, and collaboration tools — all within a single platform.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Image with caption
// ---------------------------------------------------------------------------

function CaptionedImage({
  src,
  alt,
  caption,
  onClick,
}: {
  src: string
  alt: string
  caption: string
  onClick: () => void
}) {
  return (
    <div>
      <CaseImage src={src} alt={alt} onClick={onClick} />
      <p className="mt-2 text-xs text-neutral-400">{caption}</p>
    </div>
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
          <VimeoEmbed />

          {/* Situation */}
          <div className="flex flex-col gap-8">
            <SituationText />
            <CaseImage
              src={img.screenshot1}
              alt="Cortex gallery view"
              onClick={() => openLightbox(img.screenshot1, 'Cortex gallery view — full view')}
            />
          </div>

          {/* The Call — interleaved */}
          <div className="flex flex-col gap-8">
            <div>
              <SectionLabel>The Call</SectionLabel>
              <div className="mt-6">
                <p className="text-base font-light leading-[26px] text-neutral-700">
                  The first challenge was navigation and information architecture. Users were getting lost inside a product they used every day. We mapped their actual workflows, identified where the friction lived, and restructured the experience around how people thought about their work rather than how the system was organized.
                </p>
              </div>
            </div>
            <CaseImage
              src={img.screenshot2}
              alt="Cortex project status workflow"
              onClick={() => openLightbox(img.screenshot2, 'Cortex project status workflow — full view')}
            />
            <p className="text-base font-light leading-[26px] text-neutral-700">
              The second challenge was scalability. Orange Logic's clients ranged from independent media studios to global broadcasters. A single interface had to serve radically different use cases without becoming a bloated, compromised experience for everyone. The answer was a modular design system: components that could be configured and extended per client without requiring custom development for every deployment.
            </p>
            <CaseImage
              src={img.screenshot3}
              alt="Cortex AI recognition view"
              onClick={() => openLightbox(img.screenshot3, 'Cortex AI recognition view — full view')}
            />
          </div>

          {/* The Outcome — interleaved */}
          <div className="flex flex-col gap-8">
            <div>
              <SectionLabel>The Outcome</SectionLabel>
              <div className="mt-6">
                <p className="text-base font-light leading-[26px] text-neutral-700">
                  That system became one of Orange Logic's most significant competitive advantages. It compressed implementation timelines, reduced client onboarding friction, and made it possible to serve enterprise clients at a scale that wasn't previously possible.
                </p>
              </div>
            </div>
            <CaptionedImage
              src={img.before}
              alt="Cortex interface, 2012"
              caption="Cortex, 2012"
              onClick={() => openLightbox(img.before, 'Cortex, 2012')}
            />
            <p className="text-base font-light leading-[26px] text-neutral-700">
              Over seven years, the results compounded. Orange Logic grew 300%, entered a $3.5B market, and expanded its client portfolio to over 50 accounts including BBC, Facebook, Airbnb, and Boeing. I was promoted to Partner, joining the CEO and CTO on the leadership team.
            </p>
            <CaptionedImage
              src={img.after}
              alt="Cortex interface, 2019"
              caption="Cortex, 2019"
              onClick={() => openLightbox(img.after, 'Cortex, 2019')}
            />
          </div>
        </div>

        {/* ── Desktop: two-column grid (images | text) ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_438px] lg:gap-16">
          {/* Left: video, screenshot-1, screenshot-2, screenshot-3, before, after */}
          <div className="flex flex-col gap-[70px]">
            <VimeoEmbed />
            <CaseImage
              src={img.screenshot1}
              alt="Cortex asset detail view"
              onClick={() => openLightbox(img.screenshot1, 'Cortex asset detail view — full view')}
            />
            <CaseImage
              src={img.screenshot2}
              alt="Cortex project status workflow"
              onClick={() => openLightbox(img.screenshot2, 'Cortex project status workflow — full view')}
            />
            <CaseImage
              src={img.screenshot3}
              alt="Cortex asset library view"
              onClick={() => openLightbox(img.screenshot3, 'Cortex asset library view — full view')}
            />
            <CaptionedImage
              src={img.before}
              alt="Cortex interface, 2012"
              caption="Cortex, 2012"
              onClick={() => openLightbox(img.before, 'Cortex, 2012')}
            />
            <CaptionedImage
              src={img.after}
              alt="Cortex interface, 2019"
              caption="Cortex, 2019"
              onClick={() => openLightbox(img.after, 'Cortex, 2019')}
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
          Digital Asset Management sounds straightforward until you're managing hundreds of millions of assets across organizations like BBC, Facebook, Airbnb, and Boeing. At that scale, every design decision has consequences. A confusing workflow doesn't just frustrate a user. It costs hours across thousands of people, every day.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          I joined Orange Logic in 2012 as their first dedicated product designer, originally having come from the client side. I knew the product from the inside out: its strengths, its friction points, and the gap between what it could do and how easily people could actually do it.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          The platform was called Cortex. It was powerful, technically sophisticated, and genuinely trusted by some of the world's most demanding media organizations. My job wasn't to tear it down and rebuild it. It was to evolve it carefully, continuously, and without breaking what was already working.
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
          The first challenge was navigation and information architecture. Users were getting lost inside a product they used every day. We mapped their actual workflows, identified where the friction lived, and restructured the experience around how people thought about their work rather than how the system was organized.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          The second challenge was scalability. Orange Logic's clients ranged from independent media studios to global broadcasters. A single interface had to serve radically different use cases without becoming a bloated, compromised experience for everyone. The answer was a modular design system: components that could be configured and extended per client without requiring custom development for every deployment.
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
          That system became one of Orange Logic's most significant competitive advantages. It compressed implementation timelines, reduced client onboarding friction, and made it possible to serve enterprise clients at a scale that wasn't previously possible.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          Over seven years, the results compounded. Orange Logic grew 300%, entered a $3.5B market, and expanded its client portfolio to over 50 accounts including BBC, Facebook, Airbnb, and Boeing. I was promoted to Partner, joining the CEO and CTO on the leadership team.
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
          "The most durable design work isn't the most dramatic. It's the kind that earns trust incrementally, respects what came before, and scales without falling apart."
        </blockquote>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OrangeLogic() {
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
