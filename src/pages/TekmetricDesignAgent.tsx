import { useState, useEffect, useRef, useCallback } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import {
  X,
  Calendar,
  Users,
  ClipboardList,
  Package,
  ChartColumn,
  BookOpen,
  Phone,
  CreditCard,
  LayoutDashboard,
  Maximize2,
  Plus,
  Minus,
} from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Assets live in public/ and are served from the base URL
const base = import.meta.env.BASE_URL
const media = {
  video: `${base}videos/tekmetric-design-agent.mp4`,
  poster: `${base}images/tekmetric-design-agent-poster.jpg`,
  stack: `${base}images/tekmetric-design-agent-stack.webp`,
  stackBig: `${base}images/tekmetric-design-agent-stack-big.webp`,
}

const VIDEO_ALT =
  'One prompt in Claude Code, then the agent rebuilds a phone screen on the pen.dev canvas and makes a new version beside it. From a hackathon concept for the technician app.'

const mono = "font-['Liberation_Mono','Cousine',monospace]"

// ---------------------------------------------------------------------------
// Shared pieces
// ---------------------------------------------------------------------------

function SectionLabel({
  children,
  tone = 'blue',
}: {
  children: React.ReactNode
  tone?: 'blue' | 'light' | 'grey'
}) {
  const color = { blue: 'text-[#0055a5]', light: 'text-[#8fbbe8]', grey: 'text-neutral-500' }[tone]
  return (
    <h2 className={`${mono} text-xs font-bold uppercase tracking-[1.4px] ${color} md:text-sm`}>
      {children}
    </h2>
  )
}

function SectionHeading({
  label,
  title,
  intro,
  dark = false,
}: {
  label: string
  title: React.ReactNode
  intro?: string
  dark?: boolean
}) {
  return (
    <div className="flex flex-col gap-4">
      <SectionLabel tone={dark ? 'light' : 'blue'}>{label}</SectionLabel>
      <p
        className={`text-2xl font-bold leading-tight tracking-tight md:text-[36px] md:leading-[1.15] md:tracking-[-0.8px] ${
          dark ? 'text-white' : 'text-neutral-900'
        }`}
      >
        {title}
      </p>
      {intro && (
        <p
          className={`max-w-[680px] text-base font-light leading-[26px] ${
            dark ? 'text-white/80' : 'text-neutral-700'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}

function SideQuote({
  children,
  cite,
  large = false,
}: {
  children: React.ReactNode
  cite?: string
  large?: boolean
}) {
  return (
    <blockquote className="border-l-4 border-[#0055a5] py-1 pl-5 md:pl-6">
      <p
        className={
          large
            ? 'text-lg leading-[1.5] text-neutral-900 md:text-xl'
            : 'text-base leading-[26px] text-neutral-900'
        }
      >
        {children}
      </p>
      {cite && <footer className="mt-2 text-sm font-light text-neutral-500">{cite}</footer>}
    </blockquote>
  )
}

const container = 'mx-auto max-w-[1280px] px-6 md:px-12 lg:px-32'

// ---------------------------------------------------------------------------
// Video: framed loop in the hero, full size in a dialog
// ---------------------------------------------------------------------------

function VideoLightbox({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <VisuallyHidden.Root>
            <Dialog.Title>The design agent at work</Dialog.Title>
            <Dialog.Description>{VIDEO_ALT}</Dialog.Description>
          </VisuallyHidden.Root>
          <div className="relative" style={{ width: 'min(1440px, calc(100vw - 64px), calc(90vh * 1.377))' }}>
            <video
              src={media.video}
              poster={media.poster}
              className="block h-auto w-full rounded-lg"
              controls
              autoPlay
              muted
              loop
              playsInline
            />
            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function HeroVideo({ onOpen }: { onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null)

  // Loop silently, unless the visitor asked for reduced motion
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.play().catch(() => {})
  }, [])

  return (
    <button
      onClick={onOpen}
      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/15 bg-black text-left shadow-[0_24px_60px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      aria-label="Watch the design agent at work, full size"
    >
      <video
        ref={ref}
        src={media.video}
        poster={media.poster}
        className="block aspect-[1440/1046] h-auto w-full transition-opacity group-hover:opacity-90"
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={VIDEO_ALT}
      />
    </button>
  )
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

const STATS = [
  { value: '8', label: 'designers use it' },
  { value: '~5×', label: 'faster than Figma (est.)' },
  { value: 'More teams', label: 'same design headcount' },
]

function Hero({ onOpenVideo }: { onOpenVideo: () => void }) {
  return (
    <section
      className="w-full bg-[linear-gradient(180deg,#0c1a1c_0%,#1d3b3f_60%,#2b5156_100%)]"
      aria-label="Case study hero"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-6 pb-10 pt-16 md:px-12 md:pb-14 md:pt-20 lg:min-h-[660px] lg:justify-between lg:pb-16 lg:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-12">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.813rem] lg:leading-[1] lg:tracking-[-1.8px]">
              Choice architecture,
              <br />
              for an agent.
            </h1>
            <p className="max-w-[540px] text-base font-light leading-[26px] text-white/85 md:text-lg md:leading-[29px]">
              I don't design screens with AI. I design the context it designs in: our judgment
              written down, our design system read from production code, and a harness that keeps
              the agent honest. 8 Tekmetric designers, me included, now work this way.
            </p>
          </div>
          <HeroVideo onOpen={onOpenVideo} />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Badge */}
          <div>
            <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-white/10 bg-black/50 px-5 py-3.5 backdrop-blur-[2px]">
              <span className={`${mono} text-xs font-bold uppercase tracking-[0.35px] text-white md:text-sm`}>
                Tekmetric Design Agent
              </span>
              <span className="hidden h-1.5 w-1.5 rounded-full bg-[#0055a5] sm:inline-block" aria-hidden />
              <span className="text-xs text-neutral-300 md:text-sm">
                Built by its Director of Product Design
              </span>
            </div>
          </div>

          {/* Stats */}
          <dl className="flex flex-wrap gap-x-12 gap-y-6">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col-reverse gap-1">
                <dt className="text-[15px] text-white/80">{s.label}</dt>
                <dd className="text-[40px] font-bold leading-[1.2] tracking-[-1px] text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// The shift + the system
// ---------------------------------------------------------------------------

const LAYERS = [
  {
    title: 'Judgment',
    question: 'What good looks like',
    contents:
      'Effortless → Clear → Cohesive → Human. 3 personas, from owner to technician. Voice. The accessibility floor.',
  },
  {
    title: 'Authority',
    question: 'What it may decide alone',
    contents:
      'Reversible choices move fast. Irreversible ones wait for a person. Conflicts are surfaced, never settled quietly.',
  },
  {
    title: 'Ground truth',
    question: 'What is actually true',
    contents:
      'Every colour, component and spacing value read out of the production code. Code wins every conflict.',
    highlight: true,
  },
  {
    title: 'Memory',
    question: 'What it learned',
    contents:
      'A decision log, a list of designer flags only the designer can close, and corrections promoted into rules.',
  },
]

function ContextCard() {
  return (
    <figure className="rounded-md border border-neutral-200 bg-white p-5 md:p-6">
      <figcaption className={`${mono} text-xs font-bold uppercase tracking-[1.2px] text-neutral-500`}>
        The context the agent decides in
      </figcaption>
      <div className="mt-4 flex flex-col gap-2">
        {LAYERS.map(l => (
          <div
            key={l.title}
            className={`flex flex-col gap-2 rounded border p-4 sm:flex-row sm:gap-5 ${
              l.highlight ? 'border-[#0055a5] bg-[#eef4fb]' : 'border-neutral-200 bg-[#f9fafb]'
            }`}
          >
            <div className="flex shrink-0 flex-col gap-0.5 sm:w-[120px]">
              <span className={`text-[15px] font-bold ${l.highlight ? 'text-[#0055a5]' : 'text-neutral-900'}`}>
                {l.title}
              </span>
              <span className="text-[12.5px] font-light leading-[1.35] text-neutral-500">{l.question}</span>
            </div>
            <p className="text-sm font-light leading-[1.5] text-neutral-700">{l.contents}</p>
          </div>
        ))}
      </div>
      <p className={`${mono} mt-4 text-xs text-[#0055a5]`}>
        The agent is Claude. The context is the design work.
      </p>
    </figure>
  )
}

function ShiftSection() {
  return (
    <div className={`${container} py-16 md:py-24 lg:pb-28 lg:pt-32`}>
      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[522px_1fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <ContextCard />
        </div>
        <div className="order-1 flex flex-col gap-16 lg:order-2">
          <section>
            <SectionLabel>The Shift</SectionLabel>
            <div className="mt-6 flex flex-col gap-6">
              <p className="text-base font-light leading-[26px] text-neutral-700">
                An AI tool can make a screen in seconds. The trouble is that the screen is plausible:
                the wrong colour from a screenshot, an invented pattern, a layout that looks like the
                product and isn't. Plausible got cheap. Right didn't.
              </p>
              <p className="text-base font-light leading-[26px] text-neutral-700">
                So the scarce skill in design moved. It isn't making the artifact any more. It's
                deciding what the machine knows, what it's allowed to decide, and how it proves its
                work.
              </p>
              <SideQuote cite="Richard Thaler, Nudge. The same is true for an agent.">
                "A choice architect has the responsibility for organizing the context in which people
                make decisions."
              </SideQuote>
            </div>
          </section>
          <section>
            <SectionLabel>The System</SectionLabel>
            <div className="mt-6 flex flex-col gap-6">
              <p className="text-base font-light leading-[26px] text-neutral-700">
                I built that context for Tekmetric's design team on Claude Code. Our principles,
                personas, voice, accessibility floor and layout rules are written down. The design
                system is read straight from production code, never from a screenshot. 24 skills cover
                the work from framing a problem to the engineering spec.
              </p>
              <p className="text-base leading-[26px] text-neutral-900">
                A designer brings a brief, a sketch or a half-formed idea. The agent frames it, builds
                it on whichever surface answers the question, checks its own work, and brings every
                real decision back to a person.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Inside the stack: the graphic, and a full-size view that zooms and pans
// ---------------------------------------------------------------------------

const STACK_ALT =
  'The design agent as a stack of 4 layers. 1, Foundation: 9 files read by everything, from CLAUDE.md and the 4 principles to the design tokens. 2, Settle conflicts: intake, brainstorming and journey mapping. 3, Define good: critique skills and 2 critique sub-agents. 4, Build: prototypes in HTML, on the Pen canvas, in the real app and in Figma. Beside each layer, the files it reads and writes. Off to the side, 7 copy and lookup skills that plug into any layer.'

const STACK_BIG = { width: 7680, height: 4320 }

const STACK_CAPTION = [
  'Claude Code',
  '24 skills',
  '2 critique sub-agents',
  '9 foundation files',
  'design system synced from production code',
  'Figma, pen.dev and Chrome DevTools connections',
  'approval hooks',
]

type Size = { w: number; h: number }
// s: zoom (1 = fits the screen). x, y: top-left of the image in the viewer, in px.
type View = { s: number; x: number; y: number }

function ZoomableImage({
  src,
  alt,
  width,
  height,
  onDismiss,
}: {
  src: string
  alt: string
  width: number
  height: number
  onDismiss: () => void
}) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<Size>({ w: 0, h: 0 })
  const [view, setView] = useState<View>({ s: 1, x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)
  const viewRef = useRef(view)

  // Fit the image inside the viewer with a margin; allow zooming to 1 image pixel per screen pixel
  const pad = box.w < 640 ? 12 : 48
  const fitW = Math.max(0, Math.min(box.w - pad * 2, ((box.h - pad * 2) * width) / height))
  const fitH = (fitW * height) / width
  const dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1
  const maxS = fitW ? Math.max(2, width / (fitW * dpr)) : 1
  const geom = useRef({ box, fitW, fitH, maxS })
  geom.current = { box, fitW, fitH, maxS }

  const apply = useCallback((next: View) => {
    const { box: b, fitW: fw, fitH: fh, maxS: m } = geom.current
    const s = Math.min(Math.max(next.s, 1), m)
    const w = fw * s
    const h = fh * s
    // Centre the image on an axis while it fits; otherwise keep its edges from leaving the screen
    const x = w <= b.w ? (b.w - w) / 2 : Math.min(0, Math.max(b.w - w, next.x))
    const y = h <= b.h ? (b.h - h) / 2 : Math.min(0, Math.max(b.h - h, next.y))
    viewRef.current = { s, x, y }
    setView(viewRef.current)
  }, [])

  // Zoom by k, keeping the point (px, py) of the viewer still
  const zoomAt = useCallback(
    (px: number, py: number, k: number) => {
      const v = viewRef.current
      const s = Math.min(Math.max(v.s * k, 1), geom.current.maxS)
      const r = s / v.s
      apply({ s, x: px - (px - v.x) * r, y: py - (py - v.y) * r })
    },
    [apply],
  )
  const zoomCentre = (k: number) => zoomAt(box.w / 2, box.h / 2, k)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) =>
      setBox({ w: entry.contentRect.width, h: entry.contentRect.height }),
    )
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Back to fit whenever the screen changes size (rotating a phone)
  useEffect(() => apply({ s: 1, x: 0, y: 0 }), [box.w, box.h, apply])

  const local = (e: { clientX: number; clientY: number }) => {
    const r = boxRef.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  // Wheel and trackpad pinch zoom. Not passive, so the page itself doesn't zoom or scroll.
  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const p = local(e)
      zoomAt(p.x, p.y, Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.002)))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomAt])

  // Drag to pan, pinch to zoom, double-tap to zoom in or back out, tap outside the image to close
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef<{ dist: number; mx: number; my: number } | null>(null)
  const press = useRef({ x: 0, y: 0, moved: false, multi: false })
  const lastTap = useRef({ t: 0, x: 0, y: 0 })

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    const p = local(e)
    pointers.current.set(e.pointerId, p)
    pinch.current = null
    if (pointers.current.size === 1) press.current = { ...p, moved: false, multi: false }
    else press.current.multi = true
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const ps = pointers.current
    const prev = ps.get(e.pointerId)
    if (!prev) return
    const p = local(e)
    ps.set(e.pointerId, p)
    if (Math.hypot(p.x - press.current.x, p.y - press.current.y) > 6) press.current.moved = true

    if (ps.size === 1) {
      const v = viewRef.current
      apply({ ...v, x: v.x + p.x - prev.x, y: v.y + p.y - prev.y })
      return
    }
    const [a, b] = [...ps.values()]
    const now = { dist: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 }
    const before = pinch.current
    if (before && before.dist > 0) {
      // The point under the fingers' old midpoint follows them to the new midpoint
      const v = viewRef.current
      const s = Math.min(Math.max((v.s * now.dist) / before.dist, 1), geom.current.maxS)
      const r = s / v.s
      apply({ s, x: now.mx - (before.mx - v.x) * r, y: now.my - (before.my - v.y) * r })
    }
    pinch.current = now
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const ps = pointers.current
    if (!ps.delete(e.pointerId)) return
    pinch.current = null
    if (ps.size > 0 || press.current.moved || press.current.multi || e.type === 'pointercancel') return

    const p = local(e)
    const v = viewRef.current
    const onImage =
      p.x >= v.x && p.x <= v.x + fitW * v.s && p.y >= v.y && p.y <= v.y + fitH * v.s
    if (!onImage) {
      onDismiss()
      return
    }
    const t = performance.now()
    const last = lastTap.current
    if (t - last.t < 320 && Math.hypot(p.x - last.x, p.y - last.y) < 30) {
      lastTap.current.t = 0
      if (v.s > 1.05) apply({ s: 1, x: 0, y: 0 })
      else zoomAt(p.x, p.y, Math.min(3, geom.current.maxS))
    } else {
      lastTap.current = { t, ...p }
    }
  }

  // Keys: + and - zoom, 0 fits, arrows move. Escape is the dialog's.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const v = viewRef.current
      const { box: b } = geom.current
      const step = 80
      const keys: Record<string, () => void> = {
        '+': () => zoomAt(b.w / 2, b.h / 2, 1.5),
        '=': () => zoomAt(b.w / 2, b.h / 2, 1.5),
        '-': () => zoomAt(b.w / 2, b.h / 2, 1 / 1.5),
        '0': () => apply({ s: 1, x: 0, y: 0 }),
        ArrowLeft: () => apply({ ...v, x: v.x + step }),
        ArrowRight: () => apply({ ...v, x: v.x - step }),
        ArrowUp: () => apply({ ...v, y: v.y + step }),
        ArrowDown: () => apply({ ...v, y: v.y - step }),
      }
      const run = keys[e.key]
      if (run) {
        e.preventDefault()
        run()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [apply, zoomAt])

  const zoomed = view.s > 1.01
  const control =
    'flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-40'

  return (
    <div className="absolute inset-0">
      <div
        ref={boxRef}
        className={`absolute inset-0 touch-none select-none overflow-hidden ${
          zoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {!loaded && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-white/60">
            Loading full size…
          </p>
        )}
        {fitW > 0 && (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            draggable={false}
            onLoad={() => setLoaded(true)}
            className={`absolute left-0 top-0 max-w-none rounded-md bg-[#f3eee4] transition-opacity ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: fitW * view.s,
              height: fitH * view.s,
              transform: `translate3d(${view.x}px, ${view.y}px, 0)`,
            }}
          />
        )}
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 p-4 pb-[max(16px,env(safe-area-inset-bottom))]">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-black/70 p-1 backdrop-blur">
          <button className={control} onClick={() => zoomCentre(1 / 1.5)} disabled={!zoomed} aria-label="Zoom out">
            <Minus className="h-4 w-4" />
          </button>
          <span className="hidden px-2 text-xs text-white/70 sm:inline">
            Scroll or pinch to zoom. Drag to move.
          </span>
          <span className="px-2 text-xs text-white/70 sm:hidden">Pinch to zoom</span>
          <button
            className={control}
            onClick={() => zoomCentre(1.5)}
            disabled={view.s >= maxS - 0.01}
            aria-label="Zoom in"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function StackLightbox({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-0 z-50 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <VisuallyHidden.Root>
            <Dialog.Title>Inside the stack, full size</Dialog.Title>
            <Dialog.Description>{STACK_ALT}</Dialog.Description>
          </VisuallyHidden.Root>
          <ZoomableImage
            src={media.stackBig}
            alt={STACK_ALT}
            width={STACK_BIG.width}
            height={STACK_BIG.height}
            onDismiss={onClose}
          />
          <Dialog.Close asChild>
            <button
              className="absolute right-3 top-3 rounded-full bg-black/70 p-2.5 text-white transition-colors hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-5 md:top-5"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function StackSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="border-y border-neutral-200 bg-white" aria-label="Inside the stack">
      <div className={`${container} flex flex-col gap-12 py-16 md:pb-28 md:pt-24`}>
        <SectionHeading
          label="Inside the stack"
          title="Every skill stands on the layer where it does its job"
          intro="4 layers: the foundation everything reads, then settling conflicts, defining good, and building. Each skill sits on its layer with the files it reads and writes. The layers are roles, not steps: work goes back down whenever it isn't good yet."
        />
        <figure className="flex flex-col gap-4">
          <button
            onClick={onOpen}
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-neutral-200 bg-[#f3eee4] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0055a5] focus-visible:ring-offset-2"
            aria-label="Open the stack graphic full size"
          >
            <img
              src={media.stack}
              alt={STACK_ALT}
              width={2560}
              height={1364}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors group-hover:bg-neutral-100 md:bottom-4 md:right-4 md:px-3.5 md:py-2 md:text-[13px]">
              Open full size
              <Maximize2 className="h-3.5 w-3.5" aria-hidden />
            </span>
          </button>
          <figcaption>
            <ul className={`${mono} text-[13px] leading-[1.7] text-[#0055a5]`}>
              {STACK_CAPTION.map((item, i) => (
                <li key={item} className="inline">
                  {/* Short items never break ("sub-agents" would split at its hyphen) */}
                  <span className={item.length <= 24 ? 'whitespace-nowrap' : undefined}>{item}</span>
                  {/* Lines break after a dot, never before one */}
                  {i < STACK_CAPTION.length - 1 && (
                    <>
                      <span className="text-[#0055a5]/50" aria-hidden>
                        {' ·'}
                      </span>{' '}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Principles
// ---------------------------------------------------------------------------

const PRINCIPLES = [
  {
    name: 'Effortless',
    meaning: 'Shop workers are beating the clock. Every click is taken from billable time.',
    asks: "If they're interrupted mid-task, can they pick up without re-entering anything?",
  },
  {
    name: 'Clear',
    meaning: 'Many users come from paper. Say what things do and let the screen explain itself.',
    asks: 'Would someone who has never seen this screen know what the main button does?',
  },
  {
    name: 'Cohesive',
    meaning: 'One system, one voice. Once a pattern is learned, every screen that repeats it is free.',
    asks: 'Does this pattern already exist somewhere else in the product?',
  },
  {
    name: 'Human',
    meaning: 'Real people in real conditions: gloves on, a small screen, a noisy shop.',
    asks: 'Does this work for a technician with gloves on a small screen?',
  },
]

const CONFLICT_RULES = [
  {
    rule: 'Human is the floor',
    detail: "Safety, accuracy, legal needs and accessibility win. It's the only conflict the agent settles alone.",
  },
  { rule: 'People settle the rest', detail: 'Named, with options and what each one costs.' },
  {
    rule: 'Hardest case first',
    detail: 'The default works for the least tech-savvy user in the worst conditions. Power is opt-in.',
  },
  {
    rule: 'Irreversible waits',
    detail:
      'Reversible choices ship after 1 review. Irreversible ones need sign-off. When unsure, treat it as irreversible.',
  },
]

function PrinciplesSection() {
  return (
    <section className="bg-[#0f2224]" aria-label="The principles">
      <div className={`${container} flex flex-col gap-14 py-16 md:py-24 lg:py-28`}>
        <SectionHeading
          dark
          label="The Principles"
          title={
            <>
              Principles that don't sit on a poster.
              <br className="hidden md:block" /> They run on every screen.
            </>
          }
          intro="I wrote 4 principles for Tekmetric's product design. The agent applies them in order, as a lens, and asks every screen the questions I'd ask in a design review."
        />

        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PRINCIPLES.map((p, i) => (
            <li key={p.name} className="flex flex-col gap-3 border-t-2 border-white pt-5">
              <span className={`${mono} text-xs font-bold text-[#8fbbe8]`}>{i + 1}</span>
              <span className="text-2xl font-bold tracking-[-0.4px] text-white">{p.name}</span>
              <p className="text-[15px] font-light leading-[1.55] text-white/80 lg:min-h-[70px]">{p.meaning}</p>
              <span className={`${mono} mt-1 text-[11px] font-bold uppercase tracking-[1.1px] text-white/50`}>
                The agent asks
              </span>
              <p className="text-[15px] leading-[1.5] text-white">{p.asks}</p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-5 rounded-md border border-white/15 bg-white/5 p-6 md:p-7">
          <span className={`${mono} text-xs font-bold uppercase tracking-[1.2px] text-white/50`}>
            When they conflict
          </span>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONFLICT_RULES.map(r => (
              <div key={r.rule} className="flex flex-col gap-2">
                <span className="text-[15px] font-bold text-white">{r.rule}</span>
                <span className="text-sm font-light leading-[1.5] text-white/70">{r.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// One decision, start to finish
// ---------------------------------------------------------------------------

type Role = 'PM' | 'AGENT' | 'DESIGNER'

const ROLE_STYLE: Record<Role, string> = {
  PM: 'bg-[#f0f0f0] text-neutral-600',
  AGENT: 'bg-[#e6eef7] text-[#0055a5]',
  DESIGNER: 'bg-neutral-900 text-white',
}

const DECISION_STEPS: { role: Role; title: string; body: string }[] = [
  {
    role: 'PM',
    title: 'Phones costs nothing',
    body: "A PM points out that Phones is free. So is Payments, while Tech Board needs a higher plan. Where do products go that a shop hasn't set up or bought?",
  },
  {
    role: 'AGENT',
    title: 'Draws 3 options, recommends 1',
    body: 'Side by side on the canvas. Its pick: keep every product where it lives today and let its own page do the selling.',
  },
  {
    role: 'DESIGNER',
    title: 'Picks none, and sets a rule',
    body: 'The top of the nav shows only what the shop can use today. Everything else moves down.',
  },
  {
    role: 'AGENT',
    title: 'Builds the rule, and holds a line',
    body: 'A Ready to set up section above Available upgrades: the easy win before the sale. It turns down a “Free” tag, because with a phone account and card fees, free isn’t quite true. Then it logs who decided what, and what that replaces.',
  },
]

const NAV_GROUPS = [
  {
    heading: 'Main',
    items: [
      { icon: Calendar, label: 'Appointments' },
      { icon: Users, label: 'Customers' },
      { icon: ClipboardList, label: 'Orders' },
      { icon: Package, label: 'Inventory' },
      { icon: ChartColumn, label: 'Reports' },
      { icon: BookOpen, label: 'Repair Guide' },
    ],
  },
  {
    heading: 'Ready to set up',
    highlight: true,
    items: [
      { icon: Phone, label: 'Phones' },
      { icon: CreditCard, label: 'Payments' },
    ],
  },
  {
    heading: 'Available upgrades',
    items: [{ icon: LayoutDashboard, label: 'Tech Board', badge: 'New' }],
  },
]

const LOG_ROWS = [
  { key: 'decision', value: 'what the top of the nav shows', color: 'text-white' },
  { key: 'set by', value: 'designer, over the agent’s pick', color: 'text-white' },
  { key: 'replaces', value: 'the agent’s own rule', color: 'text-white' },
  { key: 'status', value: 'decided', color: 'text-[#8fd9a8]' },
]

function MiniNav() {
  return (
    <div
      className="flex flex-col gap-3.5 rounded-lg border border-neutral-200 bg-white px-3.5 py-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
      aria-label="The navigation as built: Main, then Ready to set up, then Available upgrades"
      role="img"
    >
      {NAV_GROUPS.map(g => (
        <div
          key={g.heading}
          className={`flex flex-col gap-0.5 ${
            g.highlight ? 'rounded-md border-l-[3px] border-[#0055a5] bg-[#eef5fc] p-2.5' : 'px-2.5'
          }`}
        >
          <span
            className={`${mono} text-[10.5px] font-bold uppercase tracking-[1px] ${
              g.highlight ? 'text-[#0055a5]' : 'text-neutral-500'
            }`}
          >
            {g.heading}
          </span>
          {g.items.map(item => (
            <div key={item.label} className="flex items-center gap-2.5 py-1.5">
              <item.icon className="h-4 w-4 text-neutral-600" aria-hidden />
              <span className="flex-1 text-sm text-neutral-900">{item.label}</span>
              {'badge' in item && item.badge && (
                <span className="rounded-full bg-[#e6eef7] px-2 py-0.5 text-[11px] font-semibold text-[#0055a5]">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function DecisionLog() {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-white/15 bg-[#0a1718] px-[22px] py-5">
      <span className={`${mono} text-xs font-bold uppercase tracking-[1.2px] text-white/50`}>Decision log</span>
      <dl className="flex flex-col gap-2">
        {LOG_ROWS.map(r => (
          <div key={r.key} className="flex gap-3">
            <dt className={`${mono} w-[72px] shrink-0 text-xs text-white/50`}>{r.key}</dt>
            <dd className={`${mono} text-[12.5px] ${r.color}`}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function DecisionSection() {
  return (
    <section aria-label="One decision, start to finish">
      <div className={`${container} flex flex-col gap-14 py-16 md:py-24 lg:py-28`}>
        <SectionHeading
          label="One decision, start to finish"
          title="The agent recommended. The designer decided."
          intro="A real decision from the navigation redesign: what came in, what the agent did, what the designer did, and what the agent did next."
        />
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[72px]">
          <ol className="flex flex-1 flex-col">
            {DECISION_STEPS.map((s, i) => (
              <li
                key={i}
                className="flex flex-col gap-3 border-t border-neutral-200 py-[22px] sm:flex-row sm:gap-6"
              >
                <div className="shrink-0 pt-0.5 sm:w-[104px]">
                  <span
                    className={`${mono} inline-block rounded px-2 py-1 text-[11px] font-bold tracking-[1.1px] ${ROLE_STYLE[s.role]}`}
                  >
                    {s.role}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[19px] font-bold leading-[1.3] tracking-[-0.3px] text-neutral-900">
                    {s.title}
                  </span>
                  <p className="text-base font-light leading-[1.6] text-neutral-700">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex w-full flex-col gap-5 lg:w-[400px] lg:shrink-0">
            <span className={`${mono} text-xs font-bold uppercase tracking-[1.2px] text-[#0055a5]`}>
              The rule, as built
            </span>
            <MiniNav />
            <DecisionLog />
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Any surface, any direction
// ---------------------------------------------------------------------------

// Hub geometry, in the 600 × 520 space of the Pen design
const CORE = { x: 300, y: 260, r: 84 }
const BOX = { w: 140, h: 60 }
const SURFACES = [
  { title: 'Conversation', sub: 'brief, sketch or idea', x: 230, y: 35 },
  { title: 'Canvas', sub: 'pen.dev', x: 444, y: 170 },
  { title: 'Static HTML', sub: 'web and phone', x: 362, y: 388 },
  { title: 'Figma', sub: 'real library components', x: 98, y: 388 },
  { title: 'Real app', sub: 'TypeScript, mocked data', x: 16, y: 170 },
]

// A 2-way spoke from the core's edge to the box's edge
function spoke(s: { x: number; y: number }) {
  const bx = s.x + BOX.w / 2
  const by = s.y + BOX.h / 2
  const dx = bx - CORE.x
  const dy = by - CORE.y
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  const gap = 8
  const toEdge = Math.min(BOX.w / 2 / Math.abs(ux || 1e-6), BOX.h / 2 / Math.abs(uy || 1e-6))
  return {
    x1: CORE.x + ux * (CORE.r + gap),
    y1: CORE.y + uy * (CORE.r + gap),
    x2: bx - ux * (toEdge + gap),
    y2: by - uy * (toEdge + gap),
  }
}

function Hub() {
  const pct = (v: number, of: number) => `${(v / of) * 100}%`
  return (
    <div className="relative w-full max-w-[600px] shrink-0" style={{ aspectRatio: '600 / 520' }}>
      <svg viewBox="0 0 600 520" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <marker id="hub-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M1 1 L9 5 L1 9" fill="none" stroke="#0055a5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <ellipse cx="300" cy="260" rx="225" ry="195" fill="none" stroke="#d4d4d4" strokeWidth="1.5" />
        {SURFACES.map(s => {
          const l = spoke(s)
          return (
            <line
              key={s.title}
              {...l}
              stroke="#0055a5"
              strokeWidth="2"
              strokeLinecap="round"
              markerStart="url(#hub-arrow)"
              markerEnd="url(#hub-arrow)"
            />
          )
        })}
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center gap-1.5 rounded-full bg-neutral-900 text-center"
        style={{
          left: pct(CORE.x - CORE.r, 600),
          top: pct(CORE.y - CORE.r, 520),
          width: pct(CORE.r * 2, 600),
          height: pct(CORE.r * 2, 520),
        }}
      >
        <span className="text-lg font-bold text-white">The system</span>
        <span className={`${mono} text-[11px] leading-[1.5] text-[#93c5fd]`}>
          judgment · authority
          <br />
          ground truth · memory
        </span>
      </div>
      {SURFACES.map(s => (
        <div
          key={s.title}
          className="absolute flex flex-col items-center justify-center gap-0.5 rounded-md border-[1.5px] border-neutral-400 bg-[#f9fafb] text-center"
          style={{ left: pct(s.x, 600), top: pct(s.y, 520), width: pct(BOX.w, 600), height: pct(BOX.h, 520) }}
        >
          <span className="text-[15px] font-bold text-neutral-900">{s.title}</span>
          <span className="text-xs font-light text-neutral-600">{s.sub}</span>
        </div>
      ))}
    </div>
  )
}

// Small screens: the same idea as a stack, so no text shrinks below reading size
function HubCompact() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1 rounded-full bg-neutral-900 px-8 py-5 text-center">
        <span className="text-lg font-bold text-white">The system</span>
        <span className={`${mono} text-[11px] leading-[1.5] text-[#93c5fd]`}>
          judgment · authority · ground truth · memory
        </span>
      </div>
      <span className={`${mono} text-sm text-[#0055a5]`} aria-hidden>
        ⇅
      </span>
      <ul className="grid w-full grid-cols-2 gap-2">
        {SURFACES.map((s, i) => (
          <li
            key={s.title}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-md border-[1.5px] border-neutral-400 bg-[#f9fafb] px-2 py-3 text-center ${
              i === SURFACES.length - 1 ? 'col-span-2' : ''
            }`}
          >
            <span className="text-[15px] font-bold text-neutral-900">{s.title}</span>
            <span className="text-xs font-light text-neutral-600">{s.sub}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const JOURNEYS = [
  {
    title: 'Navigation redesign',
    route: 'real app  ⇄  canvas  ⇄  Figma',
    note: '3 surfaces at once: coded branches to feel it, the canvas to explore it, Figma to review it.',
  },
  {
    title: 'Settings redesign',
    route: 'canvas  →  coded prototype  →  real app',
    note: 'Explored on the canvas, then built as a working slice of the live app.',
  },
  {
    title: 'Phone app vision',
    route: 'conversation  →  canvas  →  Figma',
    note: 'A full story told on the canvas, then rebuilt in Figma for review.',
  },
  {
    title: 'Any existing Figma file',
    route: 'Figma  →  critique  →  code',
    note: "Frames checked against the design system, the agent's critique compared with reviewers' comments, then built.",
  },
]

function SurfacesSection() {
  return (
    <section className="border-y border-neutral-200 bg-white" aria-label="Any surface, any direction">
      <div className={`${container} flex flex-col gap-12 py-16 md:pb-28 md:pt-24`}>
        <SectionHeading
          label="Any surface, any direction"
          title="Figma is a stop, not the destination"
          intro="Work can start in a conversation, on a canvas, in a Figma file or in the real app, and move in any direction. Every surface reads from the same system and writes back to it, so nothing is lost between tools."
        />
        <div className="flex flex-col items-center gap-14 lg:flex-row">
          <div className="hidden w-full justify-center sm:flex lg:w-[540px] lg:shrink-0 xl:w-[600px]">
            <Hub />
          </div>
          <div className="w-full sm:hidden">
            <HubCompact />
          </div>
          <div className="flex w-full flex-col">
            <span className={`${mono} mb-3 text-xs font-bold uppercase tracking-[1.2px] text-neutral-500`}>
              Real journeys from the last 6 months
            </span>
            {JOURNEYS.map(j => (
              <div key={j.title} className="flex flex-col gap-1.5 border-t border-neutral-200 py-4">
                <span className="text-base font-bold text-neutral-900">{j.title}</span>
                <span className={`${mono} whitespace-pre-wrap text-[13px] text-[#0055a5]`}>{j.route}</span>
                <span className="text-sm font-light leading-[1.5] text-neutral-600">{j.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// The harness
// ---------------------------------------------------------------------------

const IDEAS = [
  {
    title: 'Reliability is engineered',
    body: "Telling an agent to be careful doesn't work. So the system checks itself: guards that refuse any colour not bound to the design system, scripts that verify their own data, and a screenshot compared with the reference before anything is called done.",
    example: "A written rule didn't stop raw hex values reaching Figma. A guard that throws did.",
  },
  {
    title: 'Every correction becomes a rule',
    body: 'When a designer flags something, it goes on a list only they can close. The fix goes into the shared kit or the knowledge base first, then flows down. The next project starts smarter than the last.',
    example: 'One wrong icon, fixed once, is fixed for 8 designers.',
  },
  {
    title: 'People own the irreversible',
    body: 'The agent never settles a design conflict quietly. It names the trade-off, offers options and says whether the decision can be undone. Reversible choices move fast; irreversible ones wait for a person, and every decision is logged.',
    example: 'Every decision is logged with its date, who made it, and what it replaces.',
  },
]

function HarnessSection() {
  return (
    <section aria-label="The harness">
      <div className={`${container} flex flex-col gap-12 py-16 md:py-24 lg:py-28`}>
        <SectionHeading
          label="The Harness"
          title="The model is the easy part"
          intro="An agent is a model plus everything around it. Most of my design work went into everything around it, and 3 ideas carry most of the weight."
        />
        <div className="grid gap-10 md:grid-cols-3">
          {IDEAS.map(idea => (
            <div key={idea.title} className="flex flex-col gap-4 border-t-2 border-neutral-900 pt-5">
              <span className="text-xl font-bold leading-[1.25] tracking-[-0.3px] text-neutral-900">{idea.title}</span>
              <p className="text-base font-light leading-[26px] text-neutral-700">{idea.body}</p>
              <p className="border-l-[3px] border-[#0055a5] py-0.5 pl-4 text-sm leading-[1.5] text-neutral-900">
                {idea.example}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// The outcome
// ---------------------------------------------------------------------------

function OutcomeSection() {
  return (
    <section className="border-t border-neutral-200 bg-white" aria-label="The outcome">
      <div className={`${container} py-16 md:py-24 lg:py-28`}>
        <SectionLabel>The Outcome</SectionLabel>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_438px] lg:gap-16">
          <div className="flex flex-col gap-10">
            <p className="text-xl leading-[1.5] text-neutral-900 md:text-2xl md:leading-[1.45] md:tracking-[-0.3px]">
              8 designers now work this way. We estimate it runs about 5 times faster than our
              traditional Figma workflow, and that speed let Tekmetric add product teams without adding
              designers.
            </p>
            <SideQuote large cite="A designer on the Tekmetric team">
              “I don’t even open Figma as a reflex.”
            </SideQuote>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-base font-light leading-[26px] text-neutral-700">
              Visions are shown as clickable screens in real Tekmetric chrome instead of static mockups.
              Prototypes are real code an engineer can read, built on throwaway branches with mocked
              data: nothing reaches production and no shop data is touched. A screen that took 14
              minutes to rebuild in Figma now takes 50 seconds.
            </p>
            <p className="text-base font-light leading-[26px] text-neutral-700">
              And the quality floor rose for everyone at once: the same principles, the same design
              system and the same checks, on every project.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// The rollout
// ---------------------------------------------------------------------------

const ROLLOUT = [
  {
    title: 'My own work first',
    body: 'I tested it on real vision work first. My visions got at least 5× faster, and the executive team’s first question was how soon they could be built.',
  },
  {
    title: 'Shared baseline',
    body: 'A workshop with the whole design team: the same principles, design system and checks for everyone, from day one.',
  },
  {
    title: 'Made it theirs',
    body: 'Then 1:1 sessions, designer by designer, until the way of working was theirs and not mine.',
  },
  {
    title: 'Help without me',
    body: 'The more experienced designers became the first line of help. Getting unblocked no longer runs through me.',
  },
  {
    title: 'Whole team on it',
    body: 'Every designer now uses it. The HTML kit and the working memory are in beta with the team, and each fix I make reaches all of them.',
  },
]

function RolloutSection() {
  return (
    <section aria-label="The rollout">
      <div className={`${container} flex flex-col gap-14 py-16 md:py-24 lg:py-28`}>
        <SectionHeading
          label="The Rollout"
          title="From one folder of prompts to the whole team"
          intro="I proved it on my own work first, then taught it, then handed support to the team, so it no longer runs through me."
        />
        <ol className="grid md:grid-cols-5">
          {ROLLOUT.map((step, i) => {
            const last = i === ROLLOUT.length - 1
            return (
              <li key={step.title} className="relative flex gap-5 md:flex-col md:gap-5">
                {/* Marker: dot + line (vertical on mobile, horizontal from md) */}
                <div className="relative flex shrink-0 flex-col items-center md:flex-row">
                  <span
                    className={`relative z-10 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[#0055a5] ${
                      last ? 'bg-white' : 'bg-[#0055a5]'
                    }`}
                    aria-hidden
                  />
                  <span
                    className={`w-0.5 flex-1 md:h-0.5 md:w-auto ${
                      last
                        ? 'bg-[linear-gradient(180deg,#0055a5,transparent)] md:bg-[linear-gradient(90deg,#0055a5,transparent)]'
                        : 'bg-[#0055a5]'
                    }`}
                    aria-hidden
                  />
                </div>
                <div className={`flex flex-col gap-2 md:pb-0 md:pr-7 ${last ? '' : 'pb-8'}`}>
                  <span className={`${mono} text-[13px] font-bold tracking-[1.3px] text-[#0055a5]`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl font-bold leading-[1.25] tracking-[-0.3px] text-neutral-900">{step.title}</span>
                  <p className="text-[15px] font-light leading-[1.6] text-neutral-700">{step.body}</p>
                </div>
              </li>
            )
          })}
        </ol>
        <SideQuote large cite="A designer on the team, in their first week">
          “I’ve been using it for 2 days and I’m completely addicted.”
        </SideQuote>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Closing quote
// ---------------------------------------------------------------------------

function LessonSection() {
  return (
    <div className="border-t border-neutral-200 px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-[1046px]">
        <blockquote className="text-center text-2xl font-bold leading-snug tracking-tight text-neutral-900 md:text-4xl lg:text-[48px] lg:leading-[1.1] lg:tracking-[-1.2px]">
          "Plausible is cheap now.
          <br />
          Right is the job."
        </blockquote>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TekmetricDesignAgent() {
  useEffect(() => { document.title = 'Tekmetric Design Agent — Franck Hoffmann' }, [])
  const [videoOpen, setVideoOpen] = useState(false)
  const [stackOpen, setStackOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero onOpenVideo={() => setVideoOpen(true)} />
        <div className="bg-[#f9fafb]">
          <ShiftSection />
          <StackSection onOpen={() => setStackOpen(true)} />
          <PrinciplesSection />
          <DecisionSection />
          <SurfacesSection />
          <HarnessSection />
          <OutcomeSection />
          <RolloutSection />
          <LessonSection />
        </div>
      </main>
      <Footer />

      {videoOpen && <VideoLightbox isOpen onClose={() => setVideoOpen(false)} />}
      {stackOpen && <StackLightbox isOpen onClose={() => setStackOpen(false)} />}
    </div>
  )
}
