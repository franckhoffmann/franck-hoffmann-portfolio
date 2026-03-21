import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/hero-who.jpg`,
  frankPortrait: `${base}images/hero-who.jpg`,
  moose: `${base}images/portrait-franck-optimized.webp`,
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section
      className="relative flex h-[70vh] w-full flex-col overflow-hidden"
      aria-label="Who hero"
    >
      <img
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[75%_15%]"
        src={img.hero}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col justify-between pl-10 pr-6 pb-10 pt-16 md:pl-16 md:pr-12 md:pb-14 md:pt-20 lg:pb-16 lg:pt-24">

        {/* Upper-left: Proust quote — styled like Thaler quote on homepage */}
        <div>
          <h1 className="relative max-w-[300px] text-[2.1rem] font-bold leading-[1.1] tracking-[-0.04em] text-white md:max-w-[480px] xl:max-w-[700px] md:text-[2.75rem]">
            <span
              className="absolute -top-16 -left-4 select-none text-[18rem] leading-none text-white/[0.15]"
              aria-hidden
            >
              &ldquo;
            </span>
            <em className="relative z-10">
              We don't receive wisdom; we must discover it for ourselves after a journey that no one can take for us.
            </em>
          </h1>
          <p className="mt-4 text-base font-semibold text-white/60">— Marcel Proust</p>
        </div>

        {/* Bottom-left: tagline — styled like "Design Leader / Choice Architect / Team Builder" */}
        <div className="flex flex-col gap-0 text-[2rem] font-bold leading-tight text-white/80">
          <span>—</span>
          <span>Curious.</span>
          <span>Deliberate.</span>
          <span>Builder.</span>
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

        {/* Full first-person narrative */}
        <div className="flex flex-col gap-6">
          <p className="text-base font-light leading-[26px] text-neutral-700">
            I grew up in Paris, trained at the conservatory, and spent my early career directing films and commercials. I was drawn to the intersection of technology and human behavior long before I had a name for it.
          </p>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            A spontaneous move to New York changed everything. What started as a detour through photo retouching led me to Art + Commerce, one of the world's most influential photography agencies, where I found myself at the center of an industry shifting from analog to digital. I wasn't just watching that transformation. I was helping architect it.
          </p>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            That experience taught me something I've carried ever since: the most consequential design work happens at the layer beneath the interface. Not the pixels, but the systems, the decisions, the invisible architecture that shapes how people experience a product.
          </p>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            Over the next 20 years, I built and led design functions at companies navigating that same challenge at different scales. At Orange Logic, I transformed a platform already trusted by clients like BBC, Airbnb, and Boeing, evolving it into a scalable foundation that helped grow the business 300% into a $3.5B market. At Accenture, I worked with Uber and Salesforce on experiences where a single UX decision moved millions of dollars. At SailPoint, I led a lean team of 10 across 8 products, built a UX research practice from scratch, and contributed to a $7B acquisition. At Tekmetric, I'm scaling design inside a company that crossed $100M ARR, rebuilding the function, launching new products, and pioneering its first PLG motion.
          </p>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            What connects all of it is a consistent belief: that the best products are Clear, Human, Cohesive, and Effortless. Not as a checklist, but as a design standard that has to be earned at every decision point.
          </p>
          <p className="text-base font-light leading-[26px] text-neutral-700">
            I live in Austin with my two teenagers and an orange cat named Moose.
          </p>
        </div>

        {/* Moose photo */}
        <img
          src={img.moose}
          alt="Moose, an orange cat"
          className="w-full rounded-lg object-cover"
        />

      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Who() {
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
