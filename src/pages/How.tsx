import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/hero-how.jpg`,
  riskClarity: `${base}images/how-risk-clarity.png`,
}

// ---------------------------------------------------------------------------
// Section label
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['Liberation_Mono',monospace] text-xs font-bold uppercase tracking-[1.4px] text-[#0055a5] md:text-sm">
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
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={img.hero}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full flex-col justify-between pl-10 pr-6 pb-10 pt-16 md:pl-16 md:pr-12 md:pb-14 md:pt-20 lg:pb-16 lg:pt-24">

        {/* Upper-left: Franck's process philosophy quote */}
        <div>
          <h1 className="relative max-w-[300px] text-[2.1rem] font-bold leading-[1.1] tracking-[-0.04em] text-white md:max-w-[480px] md:text-[2.75rem]">
            <span
              className="absolute -top-16 -left-4 select-none text-[18rem] leading-none text-white/[0.15]"
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
        <div className="flex flex-col gap-0 text-[2rem] font-bold leading-tight text-white/80">
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
  return (
    <div className="bg-[#f9fafb] px-6 pb-16 pt-16 md:px-12 md:pb-20 md:pt-20 lg:pt-24 lg:pb-24">
      <div className="mx-auto flex max-w-[65ch] flex-col gap-10">

        {/* Opening */}
        <div className="flex flex-col gap-6">
          <p className="text-base font-light leading-[26px] text-neutral-700">
            Process is only useful if it serves people, not the other way around. At its core, I think of design as choice architecture. Every decision shapes what people see, what they do, and how they feel. The frameworks I use exist to serve that belief, not the other way around.
          </p>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            I don't have a fixed methodology. I have a set of convictions about what good design process looks like, and I adapt from there depending on the team, the problem, and the constraints.
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
            The best design process in the world fails without a team that's motivated, aligned, and psychologically safe enough to push back. In every 1:1, I start with the person, not the project. Understanding what someone is trying to grow into is as important as understanding what they're working on.
          </p>
        </div>

        {/* Know when to let go */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Know when to let go of the framework</SectionLabel>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            The Double Diamond, Design Thinking, Jobs to Be Done. These are tools, not rules. I use them when they serve the work. When they don't, I set them aside. What matters is the outcome, not the methodology used to get there.
          </p>
        </div>

      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function How() {
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
