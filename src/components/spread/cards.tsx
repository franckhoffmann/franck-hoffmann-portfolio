// The 23 cards of the UI spread. Each takes `s`, its current state (see SPREAD in UISpread.tsx).
// Mocked in pen/portfolio.pen: "Spread / Cards (components)" and "Spread / Card states".
import type { ReactNode } from 'react'
import {
  ArrowUp, Bug, Check, ChevronLeft, ChevronRight, ChevronUp, Ellipsis, EllipsisVertical,
  KeyRound, LoaderCircle, Minus, Moon, Pause, Play, Plus, RotateCcw, Search as SearchIcon,
  Server, ShieldCheck, Sun, User, X,
} from 'lucide-react'

const ease = 'transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]'

function Shell({ dark, className = '', children }: { dark?: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      className={`flex h-full w-full flex-col gap-3 rounded-2xl border p-4 shadow-[0_1px_3px_rgba(16,24,40,0.1)] ${
        dark ? 'border-[#1F242F] bg-[#0C111D]' : 'border-[#EAECF0] bg-white'
      } ${className}`}
    >
      {children}
    </div>
  )
}

function Avatar({ i, c, size = 28, ring }: { i: string; c: string; size?: number; ring?: boolean }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${ring ? 'border-2 border-white' : ''}`}
      style={{ width: size, height: size, background: c, fontSize: size * 0.38 }}
    >
      {i}
    </div>
  )
}

function Btn({ children, primary, className = '' }: { children: ReactNode; primary?: boolean; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-semibold shadow-[0_1px_2px_rgba(16,24,40,0.05)] ${ease} ${
        primary ? 'border-[#1570EF] bg-[#1570EF] text-white' : 'border-[#D0D5DD] bg-white text-[#344054]'
      } ${className}`}
    >
      {children}
    </div>
  )
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div className={`relative h-5 w-9 shrink-0 rounded-full ${ease} ${on ? 'bg-[#1570EF]' : 'bg-[#F2F4F7]'}`}>
      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(16,24,40,0.1)] ${ease} ${on ? 'left-[18px]' : 'left-0.5'}`} />
    </div>
  )
}

// ---------------------------------------------------------------------------

const WEEKS = [
  [' 27', ' 28', ' 29', ' 30', ' 31', '1', '2'],
  ['2', '3', '4', '5', '6', '7', '8'],
  ['9', '10', '11', '12', '13', '14', '15'],
  ['16', '17', '18', '19', '20', '21', '22'],
  ['23', '24', '25', '26', '27', '28', '29'],
]
const EVENTS = ['Access review · 10:00', 'Pen test kickoff · 14:00', 'Patch window · 22:00']

export function Calendar({ s }: { s: number }) {
  const sel = String(18 + s)
  return (
    <Shell className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#101828]">November 2026</span>
        <span className="flex gap-2 text-[#667085]"><ChevronLeft size={16} /><ChevronRight size={16} /></span>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
            <span key={d} className="flex h-6 w-6 items-center justify-center text-[11px] font-semibold text-[#667085]">{d}</span>
          ))}
        </div>
        {WEEKS.map((w, wi) => (
          <div key={wi} className="flex justify-between">
            {w.map((d, di) => {
              const on = d === sel
              const muted = d.startsWith(' ')
              return (
                <span
                  key={di}
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${ease} ${
                    on ? 'bg-[#1570EF] font-semibold text-white' : d === '11' ? 'bg-[#F2F4F7] text-[#344054]' : muted ? 'text-[#98A2B3]' : 'text-[#344054]'
                  }`}
                >
                  {d.trim()}
                </span>
              )
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-[#EFF8FF] px-2.5 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1570EF]" />
        <span key={s} className="spread-fade text-xs font-medium text-[#1570EF]">{EVENTS[s]}</span>
      </div>
    </Shell>
  )
}

export function Status({ s }: { s: number }) {
  const on = s === 1
  return (
    <Shell className="justify-between">
      <span className={`flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${ease} ${on ? 'bg-[#ECFDF3] text-[#067647]' : 'bg-[#F2F4F7] text-[#344054]'}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${on ? 'spread-pulse bg-[#17B26A]' : 'bg-[#98A2B3]'}`} />
        {on ? 'On call' : 'Away'}
      </span>
      <div className="flex items-center gap-2.5">
        <Avatar i="OR" c="#C4A48A" size={36} />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-[#101828]">Olivia Rhye</span>
          <span className="text-xs text-[#667085]">Security analyst</span>
        </div>
      </div>
    </Shell>
  )
}

export function Payment({ s }: { s: number }) {
  return (
    <Shell className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#101828]">{s === 2 ? 'Access granted' : 'Approve access request'}</span>
        <X size={16} className="text-[#667085]" />
      </div>
      <div className="flex items-center justify-between rounded-lg border border-[#D0D5DD] px-3 py-2">
        <span className="text-sm font-medium text-[#101828]">Admin · prod-db-01</span>
        <span className="text-xs font-medium text-[#667085]">30 days</span>
      </div>
      <div className="flex gap-2.5">
        <Btn className={`flex-1 ${s === 2 ? 'opacity-40' : ''}`}>Deny</Btn>
        <Btn
          primary
          className={`flex-1 ${s === 1 ? 'scale-[0.97] !border-[#175CD3] !bg-[#175CD3] shadow-[0_0_0_4px_rgba(21,112,239,0.25)]' : ''} ${s === 2 ? '!border-[#17B26A] !bg-[#17B26A]' : ''}`}
        >
          {s === 2 && <Check size={14} />}
          {s === 2 ? 'Approved' : 'Approve'}
        </Btn>
      </div>
    </Shell>
  )
}

export function Ring({ s }: { s: number }) {
  const done = s + 2
  const r = 38
  const c = 2 * Math.PI * r
  return (
    <Shell dark className="items-center justify-center gap-2">
      <div className="relative h-[84px] w-[84px]">
        <svg viewBox="0 0 84 84" className="h-full w-full -rotate-90">
          <circle cx="42" cy="42" r={r} fill="none" stroke="#1F242F" strokeWidth="7" />
          <circle
            cx="42" cy="42" r={r} fill="none" strokeWidth="7" strokeLinecap="round"
            stroke={done === 4 ? '#47CD89' : '#53B1FD'}
            strokeDasharray={c} strokeDashoffset={c * (1 - done / 4)}
            className="transition-[stroke-dashoffset,stroke] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white">{done}/4</span>
      </div>
      <span className="text-xs font-medium text-[#98A2B3]">SOC 2 controls</span>
    </Shell>
  )
}

const RULES: [string, string, number][] = [
  ['MFA bypass', 'Any failed challenge', 0],
  ['Impossible travel', 'Logins 500+ km apart', 0],
  ['Off-hours login', 'Outside 7 am – 8 pm', 1],
  ['New device', 'First seen in 90 days', 2],
  ['Admin role granted', 'Any privileged change', 0],
]
export function Toggles({ s }: { s: number }) {
  return (
    <Shell>
      <span className="text-sm font-semibold text-[#101828]">Alert rules</span>
      <div className="flex flex-col">
        {RULES.map(([a, b, from], i) => (
          <div key={a} className={`flex items-center justify-between py-[9px] ${i ? 'border-t border-[#EAECF0]' : ''}`}>
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-[#344054]">{a}</span>
              <span className="text-[11px] text-[#667085]">{b}</span>
            </div>
            <Toggle on={s >= from} />
          </div>
        ))}
      </div>
    </Shell>
  )
}

const PEOPLE: [string, string, string, number][] = [
  ['Phoenix Baker', 'PB', '#B5A2E8', 0],
  ['Lana Steiner', 'LS', '#E8B7A2', 1],
  ['Demi Wilkinson', 'DW', '#A2C7E8', 9],
  ['Candice Wu', 'CW', '#A2E8C1', 2],
  ['Natali Craig', 'NC', '#E8D9A2', 9],
]
export function Contacts({ s }: { s: number }) {
  return (
    <Shell className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#101828]">Reviewers</span>
        <span className="text-xs font-medium text-[#667085]">{s + 1} of 5</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {PEOPLE.map(([n, i, c, at]) => {
          const on = s >= at
          return (
            <div key={n} className="flex items-center gap-2.5">
              <Avatar i={i} c={c} />
              <span className="flex-1 text-[13px] font-medium text-[#344054]">{n}</span>
              <span className={`flex h-4 w-4 items-center justify-center rounded border ${ease} ${on ? 'border-[#1570EF] bg-[#1570EF]' : 'border-[#D0D5DD] bg-white'}`}>
                <Check size={12} strokeWidth={3} className={`text-white ${ease} ${on ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
              </span>
            </div>
          )
        })}
      </div>
      <Btn>Request review</Btn>
    </Shell>
  )
}

const WAVE = Array.from({ length: 46 }, (_, i) => 6 + Math.round(Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 24))
export function Voice({ s }: { s: number }) {
  // s: 0..19 → playback position
  const lit = Math.round((s / 19) * WAVE.length)
  const secs = 4 + s * 2
  return (
    <Shell dark className="justify-between">
      <div className="flex items-center gap-2.5">
        <Avatar i="LS" c="#E8B7A2" size={32} />
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="text-sm font-semibold text-white">Lana Steiner</span>
          <span className="text-xs text-[#98A2B3]">Incident bridge · SEV-1</span>
        </div>
        <Ellipsis size={18} className="text-[#98A2B3]" />
      </div>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0C111D]"><Play size={16} fill="currentColor" /></span>
        <div className="flex h-8 flex-1 items-center gap-[3px]">
          {WAVE.map((h, i) => (
            <span
              key={i}
              className="spread-bob w-[3px] rounded-sm transition-colors duration-300"
              style={{ height: h, background: i < lit ? '#53B1FD' : '#333741', animationDelay: `${(i % 7) * -0.17}s` }}
            />
          ))}
        </div>
        <span className="w-8 text-right text-xs font-medium tabular-nums text-[#98A2B3]">0:{String(secs).padStart(2, '0')}</span>
      </div>
    </Shell>
  )
}

const BARS = [14, 20, 16, 24, 18, 28, 22, 32, 26, 36]
export function Stat({ s }: { s: number }) {
  const k = s / 4
  return (
    <Shell className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#667085]">Threats blocked</span>
        <EllipsisVertical size={14} className="text-[#98A2B3]" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold tabular-nums text-[#101828]">{k === 0 ? '0' : `${(12.4 * k).toFixed(1)}k`}</span>
        <span className="flex items-center gap-0.5 rounded-full bg-[#ECFDF3] px-1.5 py-0.5 text-[11px] font-medium text-[#067647]"><ArrowUp size={10} />12%</span>
      </div>
      <div className="flex h-9 items-end gap-1">
        {BARS.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-[3px] ${i === 9 ? 'bg-[#1570EF]' : 'bg-[#D1E9FF]'} transition-[height] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]`}
            style={{ height: Math.max(4, Math.round(h * Math.max(k, 0.12))), transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
    </Shell>
  )
}

export function Amount({ s }: { s: number }) {
  const opts = ['15 m', '30 m', '1 h']
  const val = ['15 min', '30 min', '1 hour'][s]
  return (
    <Shell className="items-center justify-between">
      <span className="text-xs font-medium text-[#667085]">Session timeout</span>
      <div className="flex w-full items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D0D5DD] text-[#344054]"><Minus size={14} /></span>
        <span key={val} className="spread-roll text-[26px] font-semibold text-[#101828]">{val}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D0D5DD] text-[#344054]"><Plus size={14} /></span>
      </div>
      <div className="flex gap-1.5">
        {opts.map((o, i) => (
          <span key={o} className={`rounded-full border px-2.5 py-[3px] text-xs font-medium ${ease} ${i === s ? 'border-[#B2DDFF] bg-[#EFF8FF] text-[#1570EF]' : 'border-[#EAECF0] bg-[#F9FAFB] text-[#344054]'}`}>{o}</span>
        ))}
      </div>
    </Shell>
  )
}

export function Split({ s }: { s: number }) {
  // 0 hover Critical, 1 hover High, 2 selected High
  const opts = ['Critical', 'High', 'Medium', 'Low', 'Info']
  return (
    <Shell>
      <span className="text-sm font-semibold text-[#101828]">Severity</span>
      <div className="flex items-center justify-between rounded-lg border border-[#84CAFF] px-3 py-2 shadow-[0_0_0_4px_#D1E9FF]">
        <span className={`text-[13px] font-medium ${s === 2 ? 'text-[#101828]' : 'text-[#667085]'}`}>{s === 2 ? 'High' : 'Select severity'}</span>
        <ChevronUp size={14} className="text-[#667085]" />
      </div>
      <div className="relative flex flex-col rounded-lg border border-[#EAECF0] p-1 shadow-[0_8px_16px_rgba(16,24,40,0.08)]">
        <span
          className={`absolute left-1 right-1 h-[33px] rounded-md bg-[#F9FAFB] ${ease}`}
          style={{ top: 4 + (s === 0 ? 0 : 1) * 33 }}
        />
        {opts.map((o) => (
          <div key={o} className="relative flex h-[33px] items-center justify-between px-2">
            <span className={`text-[13px] text-[#344054] ${o === 'High' && s === 2 ? 'font-semibold' : ''}`}>{o}</span>
            {o === 'High' && <Check size={14} className={`text-[#1570EF] ${ease} ${s === 2 ? 'opacity-100' : 'opacity-0'}`} />}
          </div>
        ))}
      </div>
    </Shell>
  )
}

function Dots() {
  return (
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => <span key={i} className="spread-dot h-1 w-1 rounded-full bg-[#98A2B3]" style={{ animationDelay: `${i * 0.15}s` }} />)}
    </span>
  )
}
export function Chat({ s }: { s: number }) {
  return (
    <Shell className="justify-center gap-2">
      <div className={`flex items-end gap-2 ${ease} ${s >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
        <Avatar i="PB" c="#B5A2E8" />
        <span className="rounded-lg rounded-bl-none bg-[#F2F4F7] px-3 py-2 text-[13px] text-[#101828]">New login to prod-db from 185.220.x</span>
      </div>
      <div className={`flex justify-end ${ease} ${s >= 2 ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}>
        <span className="rounded-lg rounded-br-none bg-[#1570EF] px-3 py-2 text-[13px] text-white">Blocking the IP, rotating keys</span>
      </div>
      <div className={`flex items-center gap-1.5 text-[11px] text-[#98A2B3] ${ease} ${s >= 2 ? 'opacity-0' : 'opacity-100'}`}>
        {s === 0 ? 'Phoenix is typing' : "You're typing"} <Dots />
      </div>
    </Shell>
  )
}

export function Tabs({ s }: { s: number }) {
  const t = ['24 h', '7 d', '30 d']
  const sel = s + 1
  return (
    <Shell className="justify-between">
      <span className="text-xs font-medium text-[#667085]">Time range</span>
      <div className="relative flex rounded-[10px] border border-[#EAECF0] bg-[#F9FAFB] p-1">
        <span className={`absolute top-1 bottom-1 w-[calc((100%-8px)/3)] rounded-md bg-white shadow-[0_1px_3px_rgba(16,24,40,0.1)] ${ease}`} style={{ left: `calc(4px + ${sel} * (100% - 8px) / 3)` }} />
        {t.map((x, i) => (
          <span key={x} className={`relative flex-1 py-1.5 text-center text-[13px] font-semibold ${ease} ${i === sel ? 'text-[#344054]' : 'text-[#667085]'}`}>{x}</span>
        ))}
      </div>
      <span key={s} className="spread-fade text-xs text-[#667085]">{s ? 'Oct 19 – Nov 18, 2026' : 'Nov 11 – 18, 2026'}</span>
    </Shell>
  )
}

const QUERY = 'prod-db'
export function Search({ s }: { s: number }) {
  // s: 0 empty, 1..7 typed letters, 8+ result
  const q = QUERY.slice(0, Math.min(s, QUERY.length))
  const result = s > QUERY.length
  const chips: [typeof Server, string][] = [[Server, 'prod-db-01'], [User, 'olivia.rhye'], [Bug, 'CVE-2026-1182']]
  return (
    <Shell className="justify-between">
      <div className="flex items-center gap-2 rounded-lg border border-[#D0D5DD] px-3.5 py-2.5 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
        <SearchIcon size={16} className="text-[#667085]" />
        <span className={`flex-1 text-sm ${q ? 'text-[#101828]' : 'text-[#667085]'}`}>
          {q || 'Search identities, assets, alerts…'}
          {q && !result && <span className="spread-caret ml-px inline-block h-4 w-px translate-y-[3px] bg-[#101828]" />}
        </span>
        <span className="rounded border border-[#EAECF0] px-1.5 py-px text-xs font-medium text-[#667085]">⌘K</span>
      </div>
      <span className="text-xs font-medium text-[#667085]">{result ? '1 asset' : q ? 'Searching…' : 'Recent'}</span>
      <div className="flex gap-2">
        {chips.map(([Ic, t], i) => (
          <span key={t} className={`flex items-center gap-1.5 rounded-full border border-[#EAECF0] px-2.5 py-1 text-xs font-medium text-[#344054] ${ease} ${result && i ? 'scale-90 opacity-0' : 'opacity-100'}`}>
            <Ic size={12} className="text-[#667085]" />{t}
          </span>
        ))}
      </div>
    </Shell>
  )
}

export function Timer({ s }: { s: number }) {
  // s: 0..9 running, 10..17 under a minute, 18+ contained
  const contained = s >= 18
  const low = s >= 10 && !contained
  const time = contained ? '00:00' : low ? `00:${String(58 - (s - 10)).padStart(2, '0')}` : `04:${String(59 - s).padStart(2, '0')}`
  return (
    <Shell className="items-center justify-between">
      <div className="flex w-full items-center justify-between">
        <span className="text-xs font-medium text-[#667085]">Time to contain</span>
        <span className={`flex items-center gap-1 text-[11px] font-medium ${contained ? 'text-[#067647]' : low ? 'text-[#B54708]' : 'text-[#B42318]'}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${contained ? 'bg-[#17B26A]' : low ? 'spread-pulse bg-[#F79009]' : 'spread-pulse bg-[#F04438]'}`} />
          {contained ? 'Contained' : 'Live'}
        </span>
      </div>
      <span className={`text-[32px] font-semibold tracking-[-1px] tabular-nums transition-colors duration-500 ${contained ? 'text-[#98A2B3]' : low ? 'text-[#B54708]' : 'text-[#101828]'}`}>{time}</span>
      <div className="flex gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#101828] text-white"><Pause size={14} fill="currentColor" /></span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D0D5DD] text-[#344054]"><RotateCcw size={14} /></span>
      </div>
    </Shell>
  )
}

const RISK = ['#17B26A', '#FDB022', '#F79009', '#F04438', '#F04438']
const RISK_LABEL = ['Scanning…', 'Scanning…', '2 of 5 · Low', '3 of 5 · Medium', '4 of 5 · High']
export function Rating({ s }: { s: number }) {
  return (
    <Shell className="justify-between">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-[#101828]">Vendor risk</span>
        <span className="text-xs text-[#667085]">Acme Cloud · SOC 2</span>
      </div>
      <div className="flex gap-1">
        {RISK.map((c, i) => (
          <span key={i} className="h-2 flex-1 overflow-hidden rounded bg-[#EAECF0]">
            <span className="block h-full rounded transition-[width] duration-500 ease-out" style={{ width: i < s ? '100%' : '0%', background: c }} />
          </span>
        ))}
      </div>
      <span className="text-xs font-medium text-[#344054]">{RISK_LABEL[s]}</span>
    </Shell>
  )
}

const STEPS = ['Detect', 'Triage', 'Contain', 'Recover']
export function Steps({ s }: { s: number }) {
  // s: 0 contain active, 1 recover active, 2 all done
  const doneUntil = s + 2 // index of first not-done step
  return (
    <Shell className="justify-between">
      <span className="text-sm font-semibold text-[#101828]">Incident response</span>
      <div className="flex flex-col">
        {STEPS.map((t, i) => {
          const done = i < doneUntil
          const active = i === doneUntil
          return (
            <div key={t} className="flex gap-2.5">
              <div className="flex flex-col items-center gap-1">
                <span className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border ${ease} ${done ? 'border-[#1570EF] bg-[#1570EF]' : active ? 'border-2 border-[#1570EF] bg-[#EFF8FF]' : 'border-[#EAECF0] bg-white'}`}>
                  {done ? <Check size={12} strokeWidth={3} className="spread-pop text-white" /> : <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-[#1570EF]' : 'bg-[#EAECF0]'}`} />}
                </span>
                {i < 3 && (
                  <span className="relative h-[26px] w-0.5 overflow-hidden rounded bg-[#EAECF0]">
                    <span className={`absolute inset-x-0 top-0 bg-[#1570EF] transition-[height] duration-700 ${i < doneUntil ? 'h-full' : 'h-0'}`} />
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className={`text-[13px] font-semibold ${done || active ? 'text-[#344054]' : 'text-[#475467]'}`}>{t}</span>
                <span className={`text-[11px] ${active ? 'text-[#1570EF]' : 'text-[#667085]'}`}>{done ? 'Done' : active ? 'In progress' : 'Up next'}</span>
              </div>
            </div>
          )
        })}
      </div>
      <Btn primary>{s === 2 ? 'Close incident' : 'Open playbook'}</Btn>
    </Shell>
  )
}

export function Stepper({ s }: { s: number }) {
  const big = s === 2 ? 120 : 90
  const archive = s === 2 ? 90 : 60
  const Round = ({ children, pressed }: { children: ReactNode; pressed?: boolean }) => (
    <span className={`flex h-[26px] w-[26px] items-center justify-center rounded-full border text-[#344054] ${ease} ${pressed ? 'scale-90 border-[#98A2B3] bg-[#F2F4F7]' : 'border-[#D0D5DD]'}`}>{children}</span>
  )
  return (
    <Shell className="justify-between">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-[#101828]">Log retention</span>
        <span className="text-xs text-[#667085]">Applies to all sources</span>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span key={big} className="spread-roll text-5xl font-semibold tracking-[-1px] text-[#101828]">{big}</span>
        <span className="text-xs font-medium text-[#667085]">days</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {([['Hot storage', 30, false], ['Archive', archive, s === 1]] as [string, number, boolean][]).map(([l, v, p]) => (
          <div key={l} className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#344054]">{l}</span>
            <span className="flex items-center gap-2.5">
              <Round><Minus size={12} /></Round>
              <span className="w-5 text-center text-[13px] font-semibold tabular-nums text-[#101828]">{v}</span>
              <Round pressed={p}><Plus size={12} /></Round>
            </span>
          </div>
        ))}
      </div>
    </Shell>
  )
}

export function DarkMode({ s }: { s: number }) {
  return (
    <Shell dark className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-white">Appearance</span>
        <Moon size={14} className="text-[#53B1FD]" />
      </div>
      <div className="relative flex rounded-[10px] border border-[#1F242F] bg-[#161B26] p-1">
        <span className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md bg-[#333741] ${ease}`} style={{ left: s ? '50%' : 4 }} />
        {([[Sun, 'Light'], [Moon, 'Dark']] as const).map(([Ic, l], i) => (
          <span key={l} className={`relative flex flex-1 items-center justify-center gap-1.5 py-[7px] text-xs font-semibold ${ease} ${i === s ? 'text-white' : 'text-[#98A2B3]'}`}>
            <Ic size={13} />{l}
          </span>
        ))}
      </div>
      <span className="text-[11px] text-[#98A2B3]">Follows system at night</span>
    </Shell>
  )
}

const QS = ['What triggered this alert?', 'Who else has admin access?', 'Is this asset exposed?']
export function Questions({ s }: { s: number }) {
  return (
    <Shell className="justify-center gap-0">
      {QS.map((q, i) => {
        const open = i === 0 && s === 1
        return (
          <div key={q} className={`flex flex-col py-2 ${i ? 'border-t border-[#EAECF0]' : ''}`}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#101828]">{q}</span>
              <span className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] ${ease} ${open ? 'border-[#1570EF] text-[#1570EF]' : 'border-[#D0D5DD] text-[#98A2B3]'}`}>
                {open ? <Minus size={12} /> : <Plus size={12} />}
              </span>
            </div>
            {i === 0 && (
              <div className={`grid ${ease} ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <span className="overflow-hidden text-xs text-[#475467]"><span className="block pt-1">3 failed MFA prompts, then a login from a new country.</span></span>
              </div>
            )}
          </div>
        )
      })}
    </Shell>
  )
}

export function Pay({ s }: { s: number }) {
  return (
    <Shell className="p-3">
      <div className="spread-tilt relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl bg-linear-to-br from-[#175CD3] to-[#53B1FD] p-3.5">
        <span className="spread-shine pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-white/25 to-transparent" />
        <div className="flex items-center justify-between">
          <span key={s} className="spread-fade text-[13px] font-semibold text-white">{s ? 'Key verified' : 'Security key'}</span>
          {s ? <ShieldCheck size={14} className="text-white" /> : <KeyRound size={14} className="text-white/80" />}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-medium tracking-[0.5px] text-white/70">OLIVIA RHYE</span>
          <span className="text-sm font-semibold tracking-[1px] text-white">FIDO2 · A7F2</span>
        </div>
      </div>
    </Shell>
  )
}

export function Avatars({ s }: { s: number }) {
  const list: [string, string][] = [['PB', '#B5A2E8'], ['LS', '#E8B7A2'], ['DW', '#A2C7E8'], ['CW', '#7FCBA4']]
  return (
    <Shell className="justify-between">
      <span className="text-sm font-semibold text-[#101828]">SOC team</span>
      <div className="flex">
        {list.map(([i, c], k) => (
          <div
            key={i}
            className={`${k ? '-ml-2' : ''} ${ease} ${k === 3 ? (s ? 'w-[34px] opacity-100' : 'w-0 -ml-0 opacity-0') : ''}`}
          >
            <Avatar i={i} c={c} size={34} ring />
          </div>
        ))}
        <div className="-ml-2 flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-white bg-[#F2F4F7] text-xs font-semibold text-[#475467]">+5</div>
      </div>
      <span className="text-xs text-[#667085]">{s ? 9 : 8} analysts on shift</span>
    </Shell>
  )
}

export function Confirm({ s }: { s: number }) {
  return (
    <Shell className="items-center justify-center gap-2">
      <span className={`flex h-11 w-11 items-center justify-center rounded-full border-[6px] ${ease} ${s ? 'spread-ring border-[#DCFAE6] bg-[#ECFDF3]' : 'border-[#F9FAFB] bg-[#F2F4F7]'}`}>
        {s ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#067647" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" className="spread-draw" />
          </svg>
        ) : (
          <LoaderCircle size={18} className="animate-spin text-[#98A2B3]" />
        )}
      </span>
      <span className="text-sm font-semibold text-[#101828]">{s ? 'Threat contained' : 'Isolating host…'}</span>
      <span className="text-xs text-[#667085]">{s ? 'prod-db-01 isolated' : 'prod-db-01'}</span>
    </Shell>
  )
}

export function PayButton({ s }: { s: number }) {
  return (
    <Shell className="flex-row items-center gap-5 p-5">
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex justify-between text-[13px]"><span className="text-[#475467]">Endpoints scanned</span><span className="font-medium text-[#344054]">1,284</span></div>
        <div className="flex justify-between text-[13px]"><span className="text-[#475467]">Open vulnerabilities</span><span className="font-medium text-[#344054]">{s === 2 ? 10 : 12}</span></div>
        <div className={`flex justify-between border-t border-[#EAECF0] pt-1.5 text-sm font-semibold transition-colors duration-500 ${s === 2 ? 'text-[#101828]' : 'text-[#D92D20]'}`}>
          <span>Critical</span><span>{s === 2 ? 0 : 2}</span>
        </div>
      </div>
      <Btn primary className={`h-14 w-[260px] rounded-xl text-sm ${s === 2 ? '!border-[#17B26A] !bg-[#17B26A]' : ''}`}>
        {s === 0 && <>Patch 2 critical <ShieldCheck size={16} /></>}
        {s === 1 && <><LoaderCircle size={16} className="animate-spin" /> Patching…</>}
        {s === 2 && <><Check size={16} /> Patched</>}
      </Btn>
    </Shell>
  )
}
