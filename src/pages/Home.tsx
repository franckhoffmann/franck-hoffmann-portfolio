import { Link } from 'react-router'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import heroBg from '/hero-bg.jpg'

const CASE_STUDIES = [
  {
    label: 'SailPoint Dashboard',
    href: '/sailpoint-dashboard',
    description: 'Redesigning the first screen enterprise admins see every morning.',
    tag: 'Enterprise UX · 2023',
    available: true,
  },
  {
    label: 'SailPoint Workflows',
    href: '/sailpoint-workflows',
    description: 'Coming soon.',
    tag: 'Enterprise UX',
    available: false,
  },
  {
    label: 'Tekmetric',
    href: '/tekmetric',
    description: 'Coming soon.',
    tag: 'SaaS · Automotive',
    available: false,
  },
  {
    label: 'Uber',
    href: '/uber',
    description: 'Coming soon.',
    tag: 'Consumer',
    available: false,
  },
  {
    label: 'Orange Logic',
    href: '/orange-logic',
    description: 'Coming soon.',
    tag: 'DAM · Enterprise',
    available: false,
  },
  {
    label: 'Art + Commerce',
    href: '/art-commerce',
    description: 'Coming soon.',
    tag: 'Creative',
    available: false,
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1">
        {/* Hero with background image */}
        <section
          className="relative w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          {/* Hero text */}
          <div className="mx-auto max-w-[1280px] px-6 pb-0 pt-32 md:px-12">
            <h1 className="relative max-w-3xl text-4xl font-bold leading-tight tracking-[-0.04em] text-white md:text-5xl">
              <span className="absolute -top-8 -left-2 text-8xl leading-none text-white/30 select-none">&ldquo;</span>
              <em>A choice architect has the responsibility for organizing the context in which people make decisions.</em>
              <span className="text-8xl leading-none text-white/30 align-bottom select-none">&rdquo;</span>
            </h1>
            <p className="mt-4 text-base font-semibold text-white/60">
              — Richard Thaler, <em>Nudge</em>
            </p>
            <div className="mt-16 flex flex-col gap-0 text-[2rem] font-bold leading-tight text-white/80">
              <span>—</span>
              <span>Design Leader</span>
              <span>Choice Architect</span>
              <span>Team Builder</span>
            </div>
          </div>

          {/* Case study grid — overlaps bottom of hero image */}
          <div className="mx-auto max-w-[1280px] px-6 pb-0 pt-16 md:px-12">
            <div className="grid gap-px border border-neutral-200/60 bg-neutral-200/60 bg-[rgba(245,245,245,0.9)] sm:grid-cols-2 lg:grid-cols-3">
              {CASE_STUDIES.map(study => (
                study.available ? (
                  <Link
                    key={study.href}
                    to={study.href}
                    className="group flex flex-col gap-3 bg-[rgba(255,255,255,0.28)] p-8 transition-colors hover:bg-white/50"
                  >
                    <span className="font-['Liberation_Mono',monospace] text-xs uppercase tracking-wider text-neutral-400">
                      {study.tag}
                    </span>
                    <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-[#0055a5]">
                      {study.label} →
                    </h2>
                    <p className="text-sm leading-relaxed text-neutral-500">{study.description}</p>
                  </Link>
                ) : (
                  <div
                    key={study.href}
                    className="flex flex-col gap-3 bg-white p-8 opacity-50"
                  >
                    <span className="font-['Liberation_Mono',monospace] text-xs uppercase tracking-wider text-neutral-400">
                      {study.tag}
                    </span>
                    <h2 className="text-lg font-semibold text-neutral-400">{study.label}</h2>
                    <p className="text-sm leading-relaxed text-neutral-400">{study.description}</p>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Spacer so footer sits below the hero image */}
          <div className="h-24" />
        </section>
      </main>

      <Footer />
    </div>
  )
}
