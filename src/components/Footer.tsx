export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full border-t border-neutral-100 bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-8 md:px-12">
        <p className="font-['Liberation_Mono',monospace] text-sm text-neutral-400">
          © {new Date().getFullYear()} Franck Hoffmann
        </p>
        <button
          onClick={scrollToTop}
          className="text-sm font-semibold text-neutral-800 transition-colors hover:text-[#0055a5]"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  )
}
