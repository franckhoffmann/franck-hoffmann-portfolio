import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown, Menu, X } from 'lucide-react'

const WHAT_ITEMS = [
  { label: 'Tekmetric', href: '/what/tekmetric' },
  { label: 'SailPoint Workflows', href: '/what/sailpoint-workflows' },
  { label: 'SailPoint Dashboard', href: '/what/sailpoint-dashboard' },
  { label: 'Uber', href: '/what/uber' },
  { label: 'Orange Logic', href: '/what/orange-logic' },
  { label: 'Art + Commerce', href: '/what/art-and-commerce' },
]

const PRIMARY_LINKS = [
  { label: 'Who', href: '/who' },
  { label: 'How', href: '/how' },
  // "What" is rendered separately as a dropdown
  { label: 'Why', href: '/why' },
]

const SECONDARY_LINKS = [
  { label: 'Leadership', href: '/leadership' },
  { label: 'Endorsements', href: '/endorsements' },
  { label: 'Resume', href: '/resume' },
]

function WhatDropdown() {
  const location = useLocation()
  const isWhatActive = WHAT_ITEMS.some(item => location.pathname === item.href)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={`group flex items-center gap-0.5 text-sm font-medium transition-colors hover:text-black focus:outline-none ${
          isWhatActive ? 'text-black' : 'text-neutral-500'
        }`}
      >
        What
        <ChevronDown
          size={14}
          className="mt-px transition-transform duration-200 group-data-[state=open]:rotate-180"
          strokeWidth={2}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className="z-50 min-w-[200px] rounded-lg border border-neutral-100 bg-white py-1.5 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          {WHAT_ITEMS.map(item => (
            <DropdownMenu.Item key={item.href} asChild>
              <Link
                to={item.href}
                className="block px-4 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-black focus:outline-none"
              >
                {item.label}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="border-t border-neutral-100 bg-white px-6 pb-6 pt-4 md:hidden">
      <nav className="flex flex-col gap-1">
        {PRIMARY_LINKS.slice(0, 2).map(link => (
          <Link
            key={link.href}
            to={link.href}
            onClick={onClose}
            className="py-2 text-sm font-medium text-neutral-700 hover:text-black"
          >
            {link.label}
          </Link>
        ))}

        {/* What section expanded in mobile */}
        <div className="py-2">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            What
          </p>
          <div className="flex flex-col gap-0.5 pl-2">
            {WHAT_ITEMS.map(item => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="py-1.5 text-sm text-neutral-600 hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Link
          to="/why"
          onClick={onClose}
          className="py-2 text-sm font-medium text-neutral-700 hover:text-black"
        >
          Why
        </Link>

        <div className="mt-2 border-t border-neutral-100 pt-2">
          {SECONDARY_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className="block py-2 text-sm text-neutral-500 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-100 bg-white">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-sm font-semibold text-black hover:opacity-80"
        >
          Franck Hoffmann{' '}
          <span className="hidden font-normal text-neutral-400 sm:inline">
            — Product Design Leader
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {PRIMARY_LINKS.slice(0, 2).map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-black ${
                location.pathname === link.href ? 'text-black' : 'text-neutral-500'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <WhatDropdown />

          <Link
            to="/why"
            className={`text-sm font-medium transition-colors hover:text-black ${
              location.pathname === '/why' ? 'text-black' : 'text-neutral-500'
            }`}
          >
            Why
          </Link>

          {/* Divider */}
          <span className="h-4 w-px bg-neutral-200" aria-hidden />

          {SECONDARY_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm transition-colors hover:text-black ${
                location.pathname === link.href ? 'text-black font-medium' : 'text-neutral-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center rounded-md p-1.5 text-neutral-500 hover:text-black md:hidden focus:outline-none"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
