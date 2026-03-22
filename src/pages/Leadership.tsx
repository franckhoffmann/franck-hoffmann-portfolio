import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/hero-leadership.jpg`,
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
      aria-label="Leadership hero"
    >
      <img
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={img.hero}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full flex-col justify-between pl-8 pr-6 pb-8 pt-14 md:pl-16 md:pr-12 md:pb-14 md:pt-20 lg:pb-16 lg:pt-24">

        {/* Upper-left: Iger quote */}
        <div>
          <h1 className="relative max-w-[260px] text-[1.5rem] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[1.75rem] md:text-[2.75rem] md:leading-[1.1] md:tracking-[-0.04em] md:max-w-[480px]">
            <span
              className="absolute -top-10 -left-3 select-none text-[10rem] leading-none text-white/[0.15] md:-top-16 md:-left-4 md:text-[18rem]"
              aria-hidden
            >
              &ldquo;
            </span>
            <em className="relative z-10">
              Take care of the people, hold a high bar, and the outcomes follow.
            </em>
          </h1>
        </div>

        {/* Bottom-left: tagline */}
        <div className="flex flex-col gap-0 text-[1.5rem] font-bold leading-tight text-white/80 md:text-[2rem]">
          <span>—</span>
          <span>Mentoring.</span>
          <span>Supporting.</span>
          <span>Facilitating.</span>
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
            I don't believe in leading from a distance.
          </p>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            The best thing a design leader can do is create the conditions for their team to do their best work. That means clarity of purpose, room to take risks, and enough psychological safety to say "I think we're solving the wrong problem" without it being a career risk.
          </p>
        </div>

        {/* Empowerment over direction */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Empowerment over direction</SectionLabel>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            Your expertise is why you're here. My job isn't to tell you what to do. It's to make sure you have what you need to make good decisions. That means clear context, honest feedback, and a leader who shields the team from noise rather than adding to it.
          </p>
        </div>

        {/* People first */}
        <div className="flex flex-col gap-4">
          <SectionLabel>People first, always</SectionLabel>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            Every 1:1 starts with the person, not the project. I want to know what you're trying to grow into, what's getting in your way, and what would make the work more meaningful. A team that feels seen does better work. That's not idealism. That's just true.
          </p>
        </div>

        {/* A clear standard */}
        <div className="flex flex-col gap-4">
          <SectionLabel>A clear standard</SectionLabel>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            I hold the team to a high bar: Clear, Human, Cohesive, and Effortless. Not as a checklist, but as a shared language for what good looks like. When everyone on the team can articulate why something isn't working yet, you stop having taste arguments and start having productive ones.
          </p>
        </div>

        {/* The role I'm actually playing */}
        <div className="flex flex-col gap-4">
          <SectionLabel>My role</SectionLabel>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            I think of leadership less as a position and more as a service. My success is measured by what the team ships, how they grow, and whether they'd choose to work together again. If those three things are true, everything else follows.
          </p>
        </div>

      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Leadership() {
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
