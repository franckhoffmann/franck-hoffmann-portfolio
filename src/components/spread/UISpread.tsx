// Decorative, animated UI spread (cybersecurity product), the backdrop of the Home hero. Mocked in pen/portfolio.pen:
// "Spread / Keyframe 1–4" (entrance) and "Spread / Card states" (each card's loop).
import { useEffect, useRef, useState, type ComponentType } from 'react'
import * as C from './cards'

const STAGE_W = 1440
const STAGE_H = 1104
const PAD = 32
const COL = 216
const ROW = 160
const GAP = 16
const BEAT = 500 // ms; card loops are written in beats

type Dir = 'up' | 'down' | 'left' | 'right'
type Card = {
  name: string
  Comp: ComponentType<{ s: number }>
  at: [col: number, row: number, w: number, h: number]
  wave: number // entrance wave, as in the 4 keyframes
  from: Dir // where it slides in from, inside its slot
  seq: number[] // state per beat, loops
  wait?: number // beats to hold state 0 after landing
  syncWith?: string // share another card's clock
}

// [state, beats] pairs → one state per beat
const r = (...p: [number, number][]) => p.flatMap(([s, n]) => Array<number>(n).fill(s))
const range = (n: number, hold: number) => [...Array.from({ length: n }, (_, i) => i), ...Array<number>(hold).fill(n - 1)]

// Slots are placed so the liveliest cards land where the lamp leaves room on a
// laptop screen: under the rim, right of the shade, and above it.
const CARDS: Card[] = [
  { name: 'Calendar', Comp: C.Calendar, at: [0, 0, 1, 2], wave: 0, from: 'up', seq: r([0, 6], [1, 6], [2, 6]) },
  { name: 'Status', Comp: C.Status, at: [1, 0, 1, 1], wave: 0, from: 'left', seq: r([0, 5], [1, 11]), wait: 2 },
  { name: 'Payment', Comp: C.Payment, at: [2, 0, 2, 1], wave: 0, from: 'down', seq: r([0, 5], [1, 1], [2, 10]), wait: 3 },
  { name: 'Ring', Comp: C.Ring, at: [4, 1, 1, 1], wave: 0, from: 'right', seq: r([0, 5], [1, 5], [2, 8]) },
  { name: 'Toggles', Comp: C.Toggles, at: [2, 2, 1, 2], wave: 1, from: 'right', seq: r([0, 5], [1, 4], [2, 9]), wait: 4 },
  { name: 'Contacts', Comp: C.Contacts, at: [1, 1, 1, 2], wave: 1, from: 'down', seq: r([0, 4], [1, 3], [2, 9]) },
  { name: 'Voice', Comp: C.Voice, at: [2, 1, 2, 1], wave: 1, from: 'left', seq: range(20, 6) },
  { name: 'Stat', Comp: C.Stat, at: [5, 2, 1, 1], wave: 1, from: 'up', seq: [...range(5, 1), ...r([4, 16])], wait: 1 },
  { name: 'Amount', Comp: C.Amount, at: [0, 2, 1, 1], wave: 0, from: 'left', seq: r([0, 5], [1, 5], [2, 5]), wait: 5 },
  { name: 'Split', Comp: C.Split, at: [5, 0, 1, 2], wave: 1, from: 'down', seq: r([0, 3], [1, 2], [2, 11]), wait: 6 },
  { name: 'Chat', Comp: C.Chat, at: [3, 2, 2, 1], wave: 1, from: 'left', seq: r([0, 4], [1, 4], [2, 10]) },
  { name: 'Tabs', Comp: C.Tabs, at: [4, 0, 1, 1], wave: 2, from: 'right', seq: r([0, 6], [1, 6]), wait: 3 },
  { name: 'Search', Comp: C.Search, at: [2, 4, 2, 1], wave: 1, from: 'up', seq: r([0, 3], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 9]), wait: 2 },
  { name: 'Timer', Comp: C.Timer, at: [4, 4, 1, 1], wave: 2, from: 'down', seq: [...range(18, 0).flatMap((s) => [s, s]), ...r([18, 8])] },
  { name: 'Rating', Comp: C.Rating, at: [4, 3, 1, 1], wave: 2, from: 'right', seq: r([0, 3], [1, 2], [2, 2], [3, 2], [4, 9]), wait: 2 },
  { name: 'Steps', Comp: C.Steps, at: [5, 3, 1, 2], wave: 2, from: 'down', seq: r([0, 5], [1, 5], [2, 8]), wait: 2 },
  { name: 'Stepper', Comp: C.Stepper, at: [0, 4, 1, 2], wave: 1, from: 'down', seq: r([0, 5], [1, 1], [2, 10]), wait: 4 },
  { name: 'Dark mode', Comp: C.DarkMode, at: [1, 4, 1, 1], wave: 1, from: 'left', seq: r([0, 6], [1, 6]), wait: 1 },
  { name: 'Questions', Comp: C.Questions, at: [0, 3, 2, 1], wave: 2, from: 'up', seq: r([0, 4], [1, 10]), wait: 2 },
  { name: 'Pay', Comp: C.Pay, at: [3, 3, 1, 1], wave: 2, from: 'right', seq: r([0, 7], [1, 7]), wait: 3 },
  { name: 'Avatars', Comp: C.Avatars, at: [1, 5, 1, 1], wave: 2, from: 'down', seq: r([0, 5], [1, 9]) },
  { name: 'Confirm', Comp: C.Confirm, at: [2, 5, 1, 1], wave: 3, from: 'down', seq: r([0, 6], [1, 10]), syncWith: 'Payment' },
  { name: 'Pay button', Comp: C.PayButton, at: [3, 5, 3, 1], wave: 3, from: 'right', seq: r([0, 5], [1, 4], [2, 9]), wait: 2 },
]

// Entrance timing: waves 700 ms apart, cards 110 ms apart within a wave
const entryMs = new Map<string, number>()
{
  const byWave = [0, 1, 2, 3].map((w) => CARDS.filter((c) => c.wave === w))
  byWave.forEach((list, w) => list.forEach((c, i) => entryMs.set(c.name, 200 + w * 900 + i * 110)))
}
const SLIDE_MS = 900

const OFF: Record<Dir, string> = {
  up: 'translate3d(0,-105%,0)',
  down: 'translate3d(0,105%,0)',
  left: 'translate3d(-105%,0,0)',
  right: 'translate3d(105%,0,0)',
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return reduced
}

// Fills its positioned parent (the Home hero): the spread is the "room" behind the lamp.
export default function UISpread() {
  const box = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 1280, h: 700 })
  const [visible, setVisible] = useState(false)
  const [started, setStarted] = useState(false)
  const [beat, setBeat] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => { ro.disconnect(); io.disconnect() }
  }, [])

  useEffect(() => { if (visible) setStarted(true) }, [visible])

  // One shared clock; it only runs while the spread is on screen
  useEffect(() => {
    if (!visible || reduced) return
    const id = window.setInterval(() => setBeat((b) => b + 1), BEAT)
    return () => window.clearInterval(id)
  }, [visible, reduced])

  // Centre the stage to the right of the quote, under the lamp
  const wide = size.w >= 1024
  // Zoomed out enough to read as a whole board, pinned to the top-right corner
  // (no edge there); the left and bottom edges fade into the room
  const scale = wide ? Math.min((size.w / 1684) * 1.05, (size.h / STAGE_H) * 1.4) : 0.42
  const cx = wide ? size.w - (STAGE_W * scale) / 2 * 0.84 : size.w * 0.55
  const cy = wide ? (STAGE_H * scale) / 2 * 0.86 : size.h * 0.6

  const stateOf = (c: Card) => {
    if (reduced) return c.seq[c.seq.length - 1]
    const clock = c.syncWith ? CARDS.find((x) => x.name === c.syncWith)! : c
    const landedBeat = Math.ceil(((entryMs.get(clock.name) ?? 0) + SLIDE_MS) / BEAT) + (clock.wait ?? 0)
    const local = beat - landedBeat
    if (local < 0) return c.seq[0]
    return c.seq[local % c.seq.length]
  }

  return (
    <div ref={box} aria-hidden className="spread pointer-events-none absolute inset-0 overflow-hidden">
      <style>{CSS}</style>
      <div
        className="absolute"
        style={{
          left: cx,
          top: cy,
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${scale}) perspective(2600px) rotateX(16deg) rotateZ(-5deg)`,
          maskImage: EDGE_FADE,
          WebkitMaskImage: EDGE_FADE,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <div className="absolute inset-0 rounded-[32px] bg-[#EAECF0]" />
        {CARDS.map((c) => {
          const [col, row, w, h] = c.at
          const shown = started || reduced
          return (
            <div
              key={c.name}
              className="absolute overflow-hidden rounded-2xl bg-[#F2F4F7]"
              style={{
                left: PAD + col * (COL + GAP),
                top: PAD + row * (ROW + GAP),
                width: w * COL + (w - 1) * GAP,
                height: h * ROW + (h - 1) * GAP,
              }}
            >
              <div
                className="h-full w-full"
                style={{
                  transform: shown ? 'translate3d(0,0,0)' : OFF[c.from],
                  transition: reduced ? 'none' : `transform ${SLIDE_MS}ms cubic-bezier(.16,1,.3,1) ${entryMs.get(c.name)}ms`,
                }}
              >
                <c.Comp s={stateOf(c)} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const EDGE_FADE =
  'linear-gradient(to right, transparent 0%, #000 12%), linear-gradient(to bottom, #000 82%, transparent 100%)'

const CSS = `
.spread { font-family: Inter, sans-serif; }
@keyframes spread-fade { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
.spread-fade { animation: spread-fade .45s ease-out both; display: inline-block }
@keyframes spread-roll { from { opacity: 0; transform: translateY(40%) } to { opacity: 1; transform: none } }
.spread-roll { animation: spread-roll .45s cubic-bezier(.2,.8,.2,1) both; display: inline-block }
@keyframes spread-pulse { 0%,100% { box-shadow: 0 0 0 0 currentColor } 50% { box-shadow: 0 0 0 4px transparent } }
.spread-pulse { animation: spread-pulse 1.6s ease-out infinite; color: rgba(23,178,106,.35) }
@keyframes spread-bob { 0%,100% { transform: scaleY(1) } 50% { transform: scaleY(.55) } }
.spread-bob { animation: spread-bob 1.1s ease-in-out infinite }
@keyframes spread-dot { 0%,60%,100% { transform: none; opacity: .5 } 30% { transform: translateY(-3px); opacity: 1 } }
.spread-dot { animation: spread-dot 1s ease-in-out infinite }
@keyframes spread-caret { 50% { opacity: 0 } }
.spread-caret { animation: spread-caret 1s steps(1) infinite }
@keyframes spread-pop { from { transform: scale(0) } 70% { transform: scale(1.2) } to { transform: scale(1) } }
.spread-pop { animation: spread-pop .4s ease-out both }
@keyframes spread-tilt { 0%,100% { transform: perspective(500px) rotateY(-6deg) rotateX(3deg) } 50% { transform: perspective(500px) rotateY(6deg) rotateX(-3deg) } }
.spread-tilt { animation: spread-tilt 6s ease-in-out infinite }
@keyframes spread-shine { 0%,55% { transform: translateX(0) } 100% { transform: translateX(400%) } }
.spread-shine { animation: spread-shine 3.5s ease-in-out infinite }
@keyframes spread-ring { 0% { box-shadow: 0 0 0 0 rgba(23,178,106,.35) } 100% { box-shadow: 0 0 0 14px rgba(23,178,106,0) } }
.spread-ring { animation: spread-ring .9s ease-out 1 }
@keyframes spread-draw { from { stroke-dashoffset: 24 } to { stroke-dashoffset: 0 } }
.spread-draw { stroke-dasharray: 24; animation: spread-draw .5s ease-out .1s both }
@keyframes spread-sway { from { transform: translateX(-2.5%) } to { transform: translateX(2.5%) } }
.spread-sway { animation: spread-sway 14s ease-in-out infinite alternate }
@media (prefers-reduced-motion: reduce) {
  .spread *, .spread *::before, .spread *::after, .spread-sway { animation: none !important; transition: none !important }
}
`
