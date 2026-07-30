// import { NavLink, useLocation } from 'react-router-dom'
// import { LayoutDashboard, ReceiptText, Sparkles, LogOut, Menu, X, Search } from 'lucide-react'
// import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import Logo from './Logo.jsx'
// import { useAuth } from '../context/AuthContext.jsx'
// import { initials } from '../lib/format.js'

// const NAV = [
//   { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//   { to: '/transactions', label: 'Transactions', icon: ReceiptText },
//   { to: '/assistant', label: 'Assistant', icon: Sparkles },
// ]

// function NavItems({ onNavigate }) {
//   return NAV.map(({ to, label, icon: Icon }) => (
//     <NavLink
//       key={to}
//       to={to}
//       onClick={onNavigate}
//       className={({ isActive }) =>
//         `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
//           isActive
//             ? 'bg-teal-500/15 text-white ring-1 ring-inset ring-teal-500/40'
//             : 'text-slate-200/70 hover:bg-white/5 hover:text-white'
//         }`
//       }
//     >
//       <Icon size={17} strokeWidth={2} />
//       {label}
//     </NavLink>
//   ))
// }

// export default function Shell({ children, title, subtitle }) {
//   const { signOut } = useAuth()
//   const { displayName, firstName } = useSelector((s) => s.auth)
//   const user = useSelector((s) => s.auth.user)
//   const [open, setOpen] = useState(false)
//   const { pathname } = useLocation()

//   return (
//     <div className="flex min-h-screen">
//       {/* ── Desktop sidebar ── */}
//       <aside className="hidden w-[236px] shrink-0 flex-col bg-navy-900 px-4 py-6 lg:flex">
//         <div className="px-2">
//           <Logo light />
//         </div>

//         <nav className="mt-9 flex flex-col gap-1">
//           <NavItems />
//         </nav>

//         <div className="mt-auto">
//           <div className="rounded-xl bg-white/[.04] p-3.5 backdrop-blur-sm">
//             <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-teal-400">
//               Consent active
//             </p>
//             <p className="mt-1.5 text-xs leading-relaxed text-slate-200/60">
//               3 accounts shared under AIS consent. Expires in 87 days.
//             </p>
//           </div>
//           <button
//             onClick={signOut}
//             className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200/60 transition hover:bg-white/5 hover:text-white"
//           >
//             <LogOut size={17} />
//             Sign out
//           </button>
//         </div>
//       </aside>

//       {/* ── Mobile drawer ── */}
//       {open && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <div
//             className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
//             onClick={() => setOpen(false)}
//             aria-hidden="true"
//           />
//           <aside className="absolute left-0 top-0 flex h-full w-[262px] flex-col bg-navy-900 px-4 py-6 animate-rise">
//             <div className="flex items-center justify-between px-2">
//               <Logo light />
//               <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-slate-200/70">
//                 <X size={20} />
//               </button>
//             </div>
//             <nav className="mt-8 flex flex-col gap-1">
//               <NavItems onNavigate={() => setOpen(false)} />
//             </nav>
//             <button
//               onClick={signOut}
//               className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200/60"
//             >
//               <LogOut size={17} />
//               Sign out
//             </button>
//           </aside>
//         </div>
//       )}

//       {/* ── Main column ── */}
//       <div className="flex min-w-0 flex-1 flex-col">
//         <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-100/60 bg-white/80 px-5 py-3 backdrop-blur-xl lg:px-8">
//           <button
//             className="rounded-xl border border-slate-200 bg-white p-2 lg:hidden"
//             onClick={() => setOpen(true)}
//             aria-label="Open menu"
//           >
//             <Menu size={18} />
//           </button>

//           <div className="min-w-0 flex-1">
//             <div className="flex items-center gap-4">
//               <div className="min-w-0">
//                 <h1 className="truncate font-display text-lg font-semibold tracking-tight text-navy-900">
//                   {title}
//                 </h1>
//                 {subtitle && <p className="truncate text-[13px] text-slate-500">{subtitle}</p>}
//               </div>

//               <div className="hidden sm:flex items-center gap-2">
//                 <div className="relative">
//                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                   <input placeholder="Search transactions, merchants or categories" className="field pl-9 w-[360px]" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <div className="hidden sm:flex flex-col text-right">
//               <span className="block font-medium text-navy-800">{displayName}</span>
//               <span className="block text-slate-400 text-[13px]">{user?.email}</span>
//             </div>

//             <div className="relative">
//               <button className="flex items-center gap-2 rounded-full bg-white/80 border border-slate-100 px-3 py-1.5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
//                 <span className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white font-semibold text-sm shadow-sm">{initials(displayName)}</span>
//                 <span className="hidden sm:inline text-sm font-medium text-navy-800">{firstName}</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         <main key={pathname} className="flex-1 px-5 py-6 lg:px-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }


import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  ReceiptText,
  Search,
  Settings as SettingsIcon,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../api/client.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useNotifications } from '../context/NotificationsContext.jsx'
import { gbp, initials, shortDate } from '../lib/format.js'
import Logo from './Logo.jsx'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ReceiptText },
  { to: '/assistant', label: 'Assistant', icon: Sparkles },
]

const SEARCH_DEBOUNCE_MS = 250

function NavItems({ onNavigate }) {
  return NAV.map(({ to, label, icon: Icon }) => (
    <NavLink
      key={to}
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
          isActive
            ? 'bg-teal-500/15 text-white ring-1 ring-inset ring-teal-500/40'
            : 'text-slate-200/70 hover:bg-white/5 hover:text-white'
        }`
      }
    >
      <Icon size={17} strokeWidth={2} />
      {label}
    </NavLink>
  ))
}

function HeaderSearch() {
  const navigate = useNavigate()
  const wrapRef = useRef(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    const term = query.trim().toLowerCase()
    if (!term) {
      setResults([])
      setSearching(false)
      return undefined
    }
    setSearching(true)
    const handle = setTimeout(async () => {
      try {
        const all = await api.getTransactions()
        const matches = all.filter(
          (t) =>
            t.merchant.toLowerCase().includes(term) ||
            t.category.toLowerCase().includes(term) ||
            (t.description || '').toLowerCase().includes(term),
        )
        setResults(matches.slice(0, 6))
      } catch {
        setResults([])
      } finally {
        setSearching(false)
      }
    }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(handle)
  }, [query])

  useEffect(() => {
    function onClickAway(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickAway)
    return () => document.removeEventListener('mousedown', onClickAway)
  }, [])

  function goToTransaction(t) {
    setOpen(false)
    setQuery('')
    navigate(`/transactions?focus=${encodeURIComponent(t.transactionId)}`)
  }

  function goToFilteredList() {
    if (!query.trim()) return
    setOpen(false)
    navigate(`/transactions?q=${encodeURIComponent(query.trim())}`)
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (results.length > 0) goToTransaction(results[0])
      else goToFilteredList()
    } else if (e.key === 'Escape') {
      setOpen(false)
      e.currentTarget.blur()
    }
  }

  return (
    <div ref={wrapRef} className="relative hidden sm:block">
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => query && setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Search transactions, merchants or categories"
        className="field w-[360px] pl-9"
      />

      {open && query.trim() && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-lg">
          {searching ? (
            <div className="flex items-center gap-2 px-4 py-3 text-[13px] text-slate-500">
              <Loader2 size={14} className="animate-spin" /> Searching…
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-3 text-[13px] text-slate-500">No matches for “{query.trim()}”.</div>
          ) : (
            <ul className="max-h-[320px] divide-y divide-slate-100 overflow-y-auto">
              {results.map((t) => (
                <li key={t.transactionId}>
                  <button
                    onClick={() => goToTransaction(t)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-slate-50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] font-medium text-navy-900">{t.merchant}</p>
                      <p className="truncate text-[12px] text-slate-400">
                        {t.category} · {shortDate(t.bookingDate)}
                      </p>
                    </div>
                    <span
                      className={`tnum shrink-0 text-[13px] font-semibold ${
                        t.direction === 'credit' ? 'text-teal-600' : 'text-navy-800'
                      }`}
                    >
                      {t.direction === 'credit' ? '+' : '−'}
                      {gbp(t.amount)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={goToFilteredList}
            className="w-full border-t border-slate-100 px-4 py-2.5 text-left text-[12.5px] font-semibold text-teal-600 transition hover:bg-teal-50/60"
          >
            See all results for “{query.trim()}”
          </button>
        </div>
      )}
    </div>
  )
}

function ProfileMenu() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const { displayName, firstName } = useSelector((s) => s.auth)
  const user = useSelector((s) => s.auth.user)
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    function onClickAway(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    function onEscape(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickAway)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickAway)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full bg-white/80 border border-slate-100 px-3 py-1.5 shadow-sm backdrop-blur-sm transition hover:shadow-md"
      >
        <span className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white font-semibold text-sm shadow-sm">
          {initials(displayName)}
        </span>
        <span className="hidden sm:inline text-sm font-medium text-navy-800">{firstName}</span>
        <ChevronDown size={14} className={`hidden text-slate-400 transition sm:block ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-60 overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-lg animate-rise"
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-navy-900">{displayName}</p>
            <p className="truncate text-[12.5px] text-slate-400">{user?.email}</p>
          </div>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false)
              navigate('/profile')
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13.5px] font-medium text-navy-800 transition hover:bg-slate-50"
          >
            <User size={15} className="text-slate-400" /> User profile
          </button>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false)
              navigate('/settings')
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13.5px] font-medium text-navy-800 transition hover:bg-slate-50"
          >
            <SettingsIcon size={15} className="text-slate-400" /> Settings
          </button>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false)
              signOut()
            }}
            className="flex w-full items-center gap-2.5 border-t border-slate-100 px-4 py-2.5 text-left text-[13.5px] font-medium text-danger transition hover:bg-red-50"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      )}
    </div>
  )
}

function NotificationBell() {
  const navigate = useNavigate()
  const { unreadCount } = useNotifications() || { unreadCount: 0 }

  return (
    <button
      onClick={() => navigate('/notifications')}
      aria-label="Notifications"
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white/80 shadow-sm backdrop-blur-sm transition hover:shadow-md"
    >
      <Bell size={17} className="text-navy-800" />
      {unreadCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-white">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}

export default function Shell({ children, title, subtitle }) {
  const { signOut } = useAuth()
  const { displayName } = useSelector((s) => s.auth)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden h-full w-[236px] shrink-0 flex-col overflow-y-auto bg-navy-900 px-4 py-6 lg:flex">
        <div className="px-2">
          <Logo light />
        </div>

        <nav className="mt-9 flex flex-col gap-1">
          <NavItems />
        </nav>

        <div className="mt-auto">
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200/60 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 flex h-full w-[262px] flex-col overflow-y-auto bg-navy-900 px-4 py-6 animate-rise">
            <div className="flex items-center justify-between px-2">
              <Logo light />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-slate-200/70">
                <X size={20} />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              <NavItems onNavigate={() => setOpen(false)} />
            </nav>
            <button
              onClick={signOut}
              className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200/60"
            >
              <LogOut size={17} />
              Sign out
            </button>
          </aside>
        </div>
      )}

      <div className="flex h-full min-w-0 flex-1 flex-col">
        <header className="relative z-20 flex shrink-0 items-center gap-3 border-b border-slate-100/60 bg-white/80 px-5 py-3 backdrop-blur-xl lg:px-8">
          <button
            className="rounded-xl border border-slate-200 bg-white p-2 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-4">
              <div className="min-w-0">
                <h1 className="truncate font-display text-lg font-semibold tracking-tight text-navy-900">
                  {title}
                </h1>
                {subtitle && <p className="truncate text-[13px] text-slate-500">{subtitle}</p>}
              </div>

              {pathname !== '/transactions' && <HeaderSearch />}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden lg:flex flex-col text-right">
              <span className="block font-medium text-navy-800">{displayName}</span>
            </div>

            <NotificationBell />
            <ProfileMenu />
          </div>
        </header>

        <main key={pathname} className="flex-1 overflow-y-auto px-5 py-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}