import { Link } from 'react-router'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

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
        {/* Hero */}
        <section className="mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-32">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            Product Design,<br />at scale.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-neutral-500">
            I lead design for complex enterprise products — identity, security, and the systems that help people do their best work.
          </p>
        </section>

        {/* Case study grid */}
        <section className="mx-auto max-w-[1280px] px-6 pb-24 md:px-12">
          <div className="grid gap-px border border-neutral-100 bg-neutral-100 sm:grid-cols-2 lg:grid-cols-3">
            {CASE_STUDIES.map(study => (
              study.available ? (
                <Link
                  key={study.href}
                  to={study.href}
                  className="group flex flex-col gap-3 bg-white p-8 transition-colors hover:bg-neutral-50"
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
