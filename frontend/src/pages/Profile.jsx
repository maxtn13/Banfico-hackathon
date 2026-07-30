import { useSelector } from 'react-redux'
import { ShieldCheck, Mail, Calendar, User } from 'lucide-react'
import Shell from '../components/Shell.jsx'
import { initials, longDate } from '../lib/format.js'

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <div className="rounded-lg bg-white p-2 text-slate-400 ring-1 ring-slate-100">
        <Icon size={15} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-slate-400">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-navy-800">{value}</p>
      </div>
    </div>
  )
}

export default function Profile() {
  const { displayName, user } = useSelector((s) => s.auth)

  return (
    <Shell title="User profile" subtitle="Your account details">
      <div className="mx-auto max-w-xl space-y-6">
        <div className="glass-card flex items-center gap-4 rounded-2xl p-6">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-xl font-semibold text-white shadow-sm">
            {initials(displayName)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-navy-900">{displayName || 'User'}</p>
            <p className="truncate text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>

        <div className="glass-card space-y-3 rounded-2xl p-6">
          <p className="eyebrow">Account details</p>
          <Row icon={User} label="Display name" value={displayName || 'User'} />
          <Row icon={Mail} label="Email" value={user?.email || '—'} />
          <Row
            icon={Calendar}
            label="Consent granted"
            value={user?.consentedAt ? longDate(user.consentedAt) : '—'}
          />
          <Row icon={ShieldCheck} label="Access" value="Read-only, under Open Banking AIS consent" />
        </div>
      </div>
    </Shell>
  )
}