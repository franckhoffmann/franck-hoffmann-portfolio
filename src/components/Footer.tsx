export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full border-t border-neutral-200 bg-[#f9fafb]">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-12">

        {/* Two-column row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

          {/* Left column */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-black">Franck Hoffmann</span>
            <span className="text-xs text-neutral-400">Product Design Leader · Austin, TX · Remote</span>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-1 md:items-end">
            <a
              href="mailto:franck.hoffmann@gmail.com"
              className="text-xs text-neutral-400 transition-colors hover:text-black hover:underline"
            >
              franck.hoffmann@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/franckhoffmann"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 transition-colors hover:text-black hover:underline"
            >
              linkedin.com/in/franckhoffmann
            </a>
            <a
              href="tel:+16463319777"
              className="text-xs text-neutral-400 transition-colors hover:text-black hover:underline"
            >
              (646) 331-9777
            </a>
          </div>

        </div>

        {/* Bottom row */}
        <div className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-6">
          <p className="font-['Liberation_Mono',monospace] text-xs text-neutral-400">
            © {new Date().getFullYear()} Franck Hoffmann
          </p>
          <button
            onClick={scrollToTop}
            className="font-['Liberation_Mono',monospace] text-xs text-neutral-400 transition-colors hover:text-neutral-700"
          >
            Back to Top ↑
          </button>
        </div>

      </div>
    </footer>
  )
}
