import { Link } from 'react-router'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="text-center">
          <p className="font-['Liberation_Mono',monospace] text-xs uppercase tracking-widest text-neutral-400">
            Coming soon
          </p>
          <h1 className="mt-4 text-3xl font-bold text-neutral-900 md:text-4xl">{title}</h1>
          <p className="mt-4 text-base text-neutral-500">This page is under construction.</p>
          <Link
            to="/"
            className="mt-8 inline-block text-sm font-semibold text-[#0055a5] hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
