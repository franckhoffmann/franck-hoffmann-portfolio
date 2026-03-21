import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Image paths — assets live in public/images/ and are served from the base URL
const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/hero-sailpoint-office.png`,
  dashboardInterface: `${base}images/dashboard-interface.png`,
  miroProcess: `${base}images/miro-process.png`,
  oldDashboard: `${base}images/old-dashboard.png`,
  dashboardBig: `${base}images/dashboard-big.png`,
  processBig: `${base}images/process-big.png`,
  oldDashboardBig: `${base}images/old-dashboard-big.png`,
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
          What does an administrator actually need to see first thing in the morning?
        </h1>

        {/* Badge */}
        <div>
          <div className="inline-flex items-center gap-4 rounded-lg border border-white/10 bg-black/50 px-5 py-3.5 backdrop-blur-[2px]">
            <span className="font-['Liberation_Mono',monospace] text-xs font-bold uppercase tracking-[0.35px] text-white md:text-sm">
              SailPoint Dashboard
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#0055a5]" aria-hidden />
            <span className="text-xs text-neutral-300 md:text-sm">
              Designing the first thing you see in the morning
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
              src={img.dashboardInterface}
              alt="New SailPoint dashboard interface"
              onClick={() => openLightbox(img.dashboardBig, 'New SailPoint dashboard — full view')}
            />
            <SituationText />
          </div>

          {/* The Call */}
          <div className="flex flex-col gap-8">
            <CaseImage
              src={img.miroProcess}
              alt="Research and design process board"
              onClick={() => openLightbox(img.processBig, 'Research and design process — full view')}
            />
            <TheCallText />
          </div>

          {/* The Outcome */}
          <div className="flex flex-col gap-8">
            <CaseImage
              src={img.oldDashboard}
              alt="Old dashboard vs new dashboard comparison"
              onClick={() => openLightbox(img.oldDashboardBig, 'Old vs new dashboard — full view')}
            />
            <TheOutcomeText />
          </div>
        </div>

        {/* ── Desktop: two-column grid (images | text) ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_438px] lg:gap-16">
          {/* Left: images stacked */}
          <div className="flex flex-col gap-[70px]">
            <CaseImage
              src={img.dashboardInterface}
              alt="New SailPoint dashboard interface"
              onClick={() => openLightbox(img.dashboardBig, 'New SailPoint dashboard — full view')}
            />
            <CaseImage
              src={img.miroProcess}
              alt="Research and design process board"
              onClick={() => openLightbox(img.processBig, 'Research and design process — full view')}
            />
            <CaseImage
              src={img.oldDashboard}
              alt="Old dashboard vs new dashboard comparison"
              onClick={() => openLightbox(img.oldDashboardBig, 'Old vs new dashboard — full view')}
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
          Every morning, the person responsible for securing digital identities across an enterprise — who can access what, across thousands of employees, systems, and applications — opens their dashboard. For companies running SailPoint, one of the world's leading identity security platforms, that first screen sets the tone for the day.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          The problem was that the screen they were opening wasn't built for them.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          The existing dashboard had been built without user research — it displayed data because data was available, not because anyone had asked what administrators actually needed to know. Customers called it a black box. Valuable insights existed inside the platform. They just couldn't find them, couldn't act on them, and eventually stopped looking.
        </p>
        <p className="text-base leading-[26px] text-neutral-900">
          The brief was to fix that.
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
          We started where we always start: with the people who would use it. Through iterative research sessions, we mapped what administrators actually needed at the start of their day — not what the data team found interesting, not what engineering could surface easily, but what created genuine value for the person sitting down with their morning coffee.
        </p>
        <SideQuote>
          That research gave us two things: a clear point of view on which widgets mattered most, and the credibility to have difficult conversations with the Data Intelligence and API teams about what would actually need to be built to support them.
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
          Rather than building a fixed dashboard, we created a widget architecture that any SailPoint product team could extend independently — no dependencies on the platform team. The same architecture opened the door to customer and partner-built widgets, and eventually, a widget marketplace.
        </p>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          The old dashboard was a table of data. MySailPoint was a tool for making decisions.
        </p>
        <SideQuote>
          "This is a game changer in the industry." — Customer, during research
        </SideQuote>
        <p className="text-base font-light leading-[26px] text-neutral-700">
          MySailPoint launched at SailPoint's annual Navigate conference in October 2023.
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
          "When you build for the data you have instead of the decisions people need to make, you don't have a dashboard. You have a black box."
        </blockquote>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SailPointDashboard() {
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
