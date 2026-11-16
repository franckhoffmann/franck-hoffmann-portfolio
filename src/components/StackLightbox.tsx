import { useState, useEffect, useRef, useCallback } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { X, Plus, Minus } from 'lucide-react'

// The design agent's stack graphic, and a full-size view that zooms and pans.
// Used on the design agent case study and on How.

const base = import.meta.env.BASE_URL
export const stackImages = {
  preview: `${base}images/tekmetric-design-agent-stack.webp`, // 2560 × 1364
  big: `${base}images/tekmetric-design-agent-stack-big.webp`,
}

export const STACK_ALT =
  'The design agent as a stack of 4 layers. 1, Foundation: 9 files read by everything, from CLAUDE.md and the 4 principles to the design tokens. 2, Settle conflicts: intake, brainstorming and journey mapping. 3, Define good: critique skills and 2 critique sub-agents. 4, Build: prototypes in HTML, on the Pen canvas, in the real app and in Figma. Beside each layer, the files it reads and writes. Off to the side, 7 copy and lookup skills that plug into any layer.'

const STACK_BIG = { width: 7680, height: 4320 }

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

export function StackLightbox({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
            src={stackImages.big}
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
