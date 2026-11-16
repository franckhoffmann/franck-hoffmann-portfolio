import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Maximize2 } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { StackLightbox, STACK_ALT, stackImages } from '@/components/StackLightbox'

const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/hero-how2.webp`,
  riskClarity: `${base}images/how-risk-clarity.png`,
}

// ---------------------------------------------------------------------------
// Section label
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['Liberation_Mono','Cousine',monospace] text-xs font-bold uppercase tracking-[1.4px] text-[#0055a5] md:text-sm">
      {children}
    </p>
  )
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section
      className="relative flex h-[70vh] w-full flex-col overflow-hidden"
      aria-label="How hero"
    >
      <img
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[72%_center] md:object-center"
        src={img.hero}
      />
      {/* Phones: an even tint. Wider screens: darker behind the text and the handwriting, lighter over the screen on the right */}
      <div className="absolute inset-0 bg-black/50 md:bg-transparent md:bg-linear-to-r md:from-black/85 md:from-0% md:via-black/65 md:via-35% md:to-black/10 md:to-100%" />

      <div className="relative z-10 flex h-full flex-col justify-between pl-8 pr-6 pb-8 pt-14 md:pl-16 md:pr-12 md:pb-14 md:pt-20 lg:pb-16 lg:pt-24">

        {/* Upper-left: Franck's process philosophy quote */}
        <div>
          <h1 className="relative max-w-[260px] text-[1.5rem] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[1.75rem] md:text-[2.75rem] md:leading-[1.1] md:tracking-[-0.04em] md:max-w-[480px]">
            <span
              className="absolute -top-10 -left-3 select-none text-[10rem] leading-none text-white/[0.15] md:-top-16 md:-left-4 md:text-[18rem]"
              aria-hidden
            >
              &ldquo;
            </span>
            <em className="relative z-10">
              Process is only useful if it serves people, not the other way around.
            </em>
          </h1>
        </div>

        {/* Bottom-left: tagline */}
        <div className="flex flex-col gap-0 text-[1.5rem] font-bold leading-tight text-white/80 md:text-[2rem]">
          <span>—</span>
          <span>People.</span>
          <span>Priorities.</span>
          <span>Process.</span>
        </div>

      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

function Body() {
  const [stackOpen, setStackOpen] = useState(false)
  return (
    <div className="bg-[#f9fafb] px-6 pb-16 pt-16 md:px-12 md:pb-20 md:pt-20 lg:pt-24 lg:pb-24">
      <div className="mx-auto flex max-w-[65ch] flex-col gap-10">

        {/* Opening */}
        <div className="flex flex-col gap-6">
          <p className="text-base font-light leading-[26px] text-neutral-700">
            Process is only useful if it serves people, not the other way around. At its core, I think of design as choice architecture. Every decision shapes what people see, what they do, and how they feel. The frameworks I use exist to serve that belief, not the other way around.
          </p>
        </div>

        {/* Start with Who */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Start with Who, not What</SectionLabel>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            Before any problem gets defined, any solution gets sketched, or any line of code gets written, the most important product question is: who are we actually designing for? Not a persona on a slide, but a real person with real constraints, real workflows, and real frustrations. I invest early in getting that answer with rigor, because every assumption made in its absence compounds downstream. The gap between what we think we know about users and what is actually true is where most design failures originate.
          </p>
        </div>

        {/* Prioritize ruthlessly */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Prioritize ruthlessly</SectionLabel>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            Not all problems are worth solving, and not all solutions are worth building. Before committing resources, I push teams to align on what matters most. A useful tool for that conversation is a simple risk matrix that maps design work against two variables: how well we understand the problem, and how much is at stake if we get it wrong.
          </p>
          <img
            src={img.riskClarity}
            alt="Risk vs. clarity matrix for design prioritization"
            className="w-full rounded-lg"
          />
          <p className="text-base font-light leading-[26px] text-neutral-700">
            Low clarity, high risk? Research heavy. High clarity, low risk? Move fast. The matrix doesn't make the decision, it makes the conversation honest.
          </p>
        </div>

        {/* Iterate with intent */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Iterate with intent</SectionLabel>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            I believe in MVPs, but not as an excuse to ship something half-formed. The goal is to learn fast, with the smallest investment that produces a meaningful signal. Every iteration should answer a specific question, not just add polish.
          </p>
        </div>

        {/* Lead people */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Lead people, not just projects</SectionLabel>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            The best design process in the world fails without a team that's motivated, aligned, and safe enough to push back. In every 1:1, I start with the person, not the project. Understanding what someone is trying to grow into is as important as understanding what they're working on.
          </p>
        </div>

        {/* Use the right tool */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Use the right tool for the job</SectionLabel>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            The Double Diamond, Design Thinking, Jobs to Be Done, Opportunity Solution Trees, Design Sprints — I've worked with them all, and I've learned that no single framework fits every problem. The skill isn't in picking one and following it faithfully. It's in knowing which lens clarifies the problem in front of you, when to blend approaches, and when to invent something new from first principles. What matters is the outcome, not methodological purity.
          </p>
        </div>

        {/* The design agent: the practice above, written down for an agent */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Write the judgment down</SectionLabel>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            At Tekmetric, I built a design agent on Claude Code. It starts where this page does, with who we design for, then adds our 4 design principles, the rules for settling trade-offs, and a design system read from production code. It drafts, checks its own work, and brings every real decision back to a designer. It's choice architecture again, this time for an agent. 8 designers use it today.
          </p>
          <button
            onClick={() => setStackOpen(true)}
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-neutral-200 bg-[#f3eee4] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0055a5] focus-visible:ring-offset-2"
            aria-label="Open the design agent's stack graphic full size"
          >
            <img
              src={stackImages.preview}
              alt={STACK_ALT}
              width={2560}
              height={1364}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors group-hover:bg-neutral-100 md:bottom-3 md:right-3">
              Open full size
              <Maximize2 className="h-3.5 w-3.5" aria-hidden />
            </span>
          </button>
          <Link
            to="/what/tekmetric-design-agent"
            className="self-start text-base font-medium leading-[26px] text-[#0055a5] underline-offset-4 transition hover:text-[#003d7a] hover:underline"
          >
            See how the design agent works →
          </Link>
        </div>

      </div>

      {stackOpen && <StackLightbox isOpen onClose={() => setStackOpen(false)} />}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function How() {
  useEffect(() => { document.title = 'How I Work — Franck Hoffmann' }, [])
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Body />
      </main>
      <Footer />
    </div>
  )
}
