import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/hero-why.jpg`,
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section
      className="relative flex h-[70vh] w-full flex-col overflow-hidden"
      aria-label="Why hero"
    >
      <img
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={img.hero}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full flex-col justify-between pl-10 pr-6 pb-10 pt-16 md:pl-16 md:pr-12 md:pb-14 md:pt-20 lg:pb-16 lg:pt-24">

        {/* Upper-left: quote */}
        <div>
          <h1 className="relative max-w-[300px] text-[2.1rem] font-bold leading-[1.1] tracking-[-0.04em] text-white md:max-w-[700px] md:text-[2.75rem]">
            <span
              className="absolute -top-16 -left-4 select-none text-[18rem] leading-none text-white/[0.15]"
              aria-hidden
            >
              &ldquo;
            </span>
            <em className="relative z-10">
              Design is choice architecture.{' '}<br />
              Done well, it's invisible.{' '}<br />
              Done poorly, it erodes trust one friction point at a time.
            </em>
          </h1>
        </div>

        {/* Bottom-left: tagline */}
        <div className="flex flex-col gap-0 text-[2rem] font-bold leading-tight text-white/80">
          <span>—</span>
          <span>Clear.</span>
          <span>Human.</span>
          <span>Effortless.</span>
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
      <div className="mx-auto flex max-w-[65ch] flex-col gap-6">

        <p className="text-base font-light leading-[26px] text-neutral-700">
          Design is choice architecture. Every screen, every flow, every interaction is a decision about what people see, what they do, and how they feel about it. Done well, it's invisible. Done poorly, it erodes trust one friction point at a time.
        </p>

        <p className="text-base font-light leading-[26px] text-neutral-700">
          That's what gets me out of bed. Not the craft for its own sake, but the compounding effect of getting it right: products that feel Clear, Human, Cohesive, and Effortless. Teams that know why those things matter, not just how to execute them. Organizations that treat design as a strategic lever, not a finishing step.
        </p>

        <p className="text-base font-light leading-[26px] text-neutral-700">
          I've spent 20 years making the case for that standard, in boardrooms and backlogs, with executives and engineers, at companies ranging from boutique agencies to $7B acquisitions. The context changes. The belief doesn't.
        </p>

      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Why() {
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
