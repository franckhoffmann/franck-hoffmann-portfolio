import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const base = import.meta.env.BASE_URL

// ---------------------------------------------------------------------------
// Reviews — same order as /endorsements, starting with Joel
// ---------------------------------------------------------------------------

const REVIEWS = [
  {
    quote: "His skill and experience are awesome but my favorite part about Franck is how good a human he is. He is a natural leader and is always putting other people on the team first.",
    name: "Joel D Harper",
    title: "Digital Product Leader at Apple",
    avatar: `${base}images/endorsement-joel-harper.jpg`,
  },
  {
    quote: "Franck created a UX culture by introducing structure and a collaborative environment. He balances the urgent with the strategic and is a good and caring leader. He would be an excellent addition to any UX team.",
    name: "Dan Martillotti",
    title: "VP of Product Management at SailPoint",
    avatar: `${base}images/endorsement-dan-martillotti.jpg`,
  },
  {
    quote: "Franck's maturity in UX principles, psychology, and strategy is highly sophisticated. What is highly differentiating is his approach to people leadership and the inclusion of empathy not only in his craft but also his leadership.",
    name: "Jeffrey Robbins",
    title: "Sr. UX Researcher at SailPoint",
    avatar: `${base}images/endorsement-jeffrey-robbins.jpg`,
  },
  {
    quote: "Franck is thoughtful, well-read, patient, and a high EQ UX leader. He is excellent at connecting, attracting, retaining, and growing UI and UX talent. If you are looking for a user experience change agent, leader — give Franck a call.",
    name: "Amar Rama",
    title: "SVP of Product Management at BackBox",
    avatar: `${base}images/endorsement-amar-rama.jpg`,
  },
  {
    quote: "Through Franck's leadership, our user experience has grown tremendously. Every mature product needs someone as dedicated as Franck on their team!",
    name: "Neil McGlennon",
    title: "Global Field CTO at SailPoint",
    avatar: `${base}images/endorsement-neil-mcglennon.jpg`,
  },
  {
    quote: "Franck was instrumental in driving the product's UX vision. Under his leadership, we were able to make many strides in improving the customer experience and have common design language. Working alongside him has been a privilege.",
    name: "Stefan Estrada",
    title: "Senior Engineering Manager at SailPoint",
    avatar: `${base}images/endorsement-stefan-estrada.jpg`,
  },
  {
    quote: "Franck is constantly questioning the status quo and pushing the boundaries of what's possible. He is a design thinker who utilizes his strong quantitative and qualitative skills to inspire innovative ideas.",
    name: "Randall Gibson",
    title: "Director of Growth at Matillion",
    avatar: `${base}images/endorsement-randall-gibson.jpg`,
  },
  {
    quote: "Franck has the ability to develop ideas that manifest themselves in smart ways while expressing them through beauty and simplicity. His thoughtful designs are inviting, approachable and intuitive. Relentless in his pursuit of great, he always pushes for an outstanding outcome.",
    name: "John Militello",
    title: "Head of Creative at Google",
    avatar: `${base}images/endorsement-john-militello.jpg`,
  },
  {
    quote: "Franck is a passionate, thoughtful UX leader. Working alongside him to understand business problems was thought-provoking.",
    name: "Christine Whitlock",
    title: "Sr. Product Manager at SailPoint",
    avatar: `${base}images/endorsement-christine-whitlock.jpg`,
  },
  {
    quote: "Franck has a wealth of experience with UX principles, and he is a master at breaking down complex problems into their core issues. He is also an excellent communicator and facilitator, and he is able to get everyone on the same page quickly and easily.",
    name: "Scott Phillips",
    title: "Staff Software Engineer at SailPoint",
    avatar: `${base}images/endorsement-scott-phillips.jpg`,
  },
  {
    quote: "Franck always brings a spirit of collaboration and open ideation to every meeting. It was great to see the wonderful progress that SailPoint achieved under his guidance. As an engineer, it was great to see my input well received and understood by my UX partner.",
    name: "Ben Coble",
    title: "Staff UI Developer at SailPoint",
    avatar: `${base}images/endorsement-ben-coble.jpg`,
  },
  {
    quote: "Franck is a creative and a technician who is always able to find unexpected and valuable ways to solve problems elegantly.",
    name: "Becky Lewis",
    title: "VP at Art + Commerce",
    avatar: `${base}images/endorsement-becky-lewis.jpg`,
  },
]

// ---------------------------------------------------------------------------
// Hero (70vh — matches /who /how /why /leadership /endorsements)
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section
      className="relative flex h-[70vh] w-full flex-col overflow-hidden"
      aria-label="Home hero"
    >
      <img
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={`${base}hero-bg.jpg`}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full flex-col justify-between pl-10 pr-6 pb-10 pt-16 md:pl-16 md:pr-12 md:pb-14 md:pt-20 lg:pb-16 lg:pt-24">

        {/* Upper-left: Thaler quote */}
        <div>
          <h1 className="relative max-w-[300px] text-[2.1rem] font-bold leading-[1.1] tracking-[-0.04em] text-white md:max-w-[600px] md:text-[2.75rem]">
            <span
              className="absolute -top-16 -left-4 select-none text-[18rem] leading-none text-white/[0.15]"
              aria-hidden
            >
              &ldquo;
            </span>
            <em className="relative z-10">
              A choice architect has the responsibility for organizing the context in which people make decisions.
            </em>
          </h1>
          <p className="mt-4 text-sm font-semibold text-white/60">
            — Richard Thaler, <em>Nudge</em>
          </p>
        </div>

        {/* Bottom-left: tagline */}
        <div className="flex flex-col gap-0 text-[2rem] font-bold leading-tight text-white/80">
          <span>—</span>
          <span>Design Leader.</span>
          <span>Choice Architect.</span>
          <span>Team Builder.</span>
        </div>

      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Carousel
// ---------------------------------------------------------------------------

function ReviewCarousel() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pausedRef = useRef(false)

  const goTo = useCallback((idx: number) => {
    if (fading) return
    setFading(true)
    setTimeout(() => {
      setCurrent(idx)
      setVisible(idx)
      setFading(false)
    }, 300)
  }, [fading])

  const next = useCallback(() => {
    goTo((current + 1) % REVIEWS.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + REVIEWS.length) % REVIEWS.length)
  }, [current, goTo])

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) next()
    }, 6000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [next])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prev, next])

  const review = REVIEWS[visible]

  return (
    <div
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      {/* Quote area — fixed min-height keeps nav row stable */}
      <div className="relative mx-auto max-w-3xl">

        {/* Decorative " — left-aligned, absolute so it takes no vertical space */}
        <span
          className="absolute -top-2 left-0 select-none font-serif text-[5rem] leading-none text-neutral-200"
          aria-hidden
        >
          &ldquo;
        </span>

        {/* Quote + attribution, fades on change */}
        <div
          className="min-h-[13rem] pl-14 transition-opacity duration-300 md:pl-16"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <div className="mb-5 flex items-center gap-3">
            <img
              src={review.avatar}
              alt={review.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-semibold text-neutral-900">{review.name}</div>
              <div className="text-xs text-neutral-400">{review.title}</div>
            </div>
          </div>

          <blockquote className="text-lg font-light leading-relaxed text-neutral-800 md:text-xl md:leading-relaxed">
            {review.quote}
          </blockquote>
        </div>
      </div>

      {/* Nav row — always same position, never jumps */}
      <div className="-mt-7 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous review"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition hover:border-neutral-400 hover:text-neutral-700"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="10 4 6 8 10 12" />
          </svg>
        </button>

        <div className="flex gap-2">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-neutral-700' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next review"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition hover:border-neutral-400 hover:text-neutral-700"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 4 10 8 6 12" />
          </svg>
        </button>
      </div>

      {/* Link */}
      <div className="mt-6 text-center">
        <Link
          to="/endorsements"
          className="font-['Liberation_Mono',monospace] text-xs uppercase tracking-[1.4px] text-[#0055a5] transition hover:text-[#003d7a]"
        >
          Read full endorsements →
        </Link>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1">

        {/* 70vh hero — same template as all other pages */}
        <Hero />

        {/* Content section */}
        <div className="bg-[#f9fafb] px-6 pb-20 pt-16 md:px-12 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-[1280px]">

            {/* Carousel */}
            <ReviewCarousel />

            {/* Bio */}
            <div className="mx-auto mt-16 max-w-2xl border-t border-neutral-200 pt-12">
              <div className="flex items-center gap-5">
                <img
                  src={`${base}images/home-portrait.jpg`}
                  alt="Franck Hoffmann"
                  className="h-44 w-44 flex-shrink-0 rounded-full object-cover object-top"
                />
                <p className="text-base font-light leading-[26px] text-neutral-700">
                  I've spent 20+ years leading product design at B2B and B2B2C SaaS companies where design was treated as a strategic lever. I build high-performing teams, ship products that move business outcomes, and pioneer experiences that earn trust. Currently Director of Product Design at Tekmetric.
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
