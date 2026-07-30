import { useState } from 'react'
import { Bell, Mail, ShieldCheck, Moon } from 'lucide-react'
import Shell from '../components/Shell.jsx'

function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-teal-500' : 'bg-slate-200'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
          checked ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  )
}

function SettingRow({ icon: Icon, title, detail, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <div className="flex min-w-0 items-center gap-3">
        <div className="rounded-lg bg-white p-2 text-slate-400 ring-1 ring-slate-100">
          <Icon size={15} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-navy-800">{title}</p>
          <p className="mt-0.5 truncate text-[12.5px] text-slate-500">{detail}</p>
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

export default function Settings() {
  const [pushNotifs, setPushNotifs] = useState(true)
  const [emailDigest, setEmailDigest] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Shell title="Settings" subtitle="Notification and account preferences">
      <div className="mx-auto max-w-xl space-y-6">
        <div className="glass-card space-y-3 rounded-2xl p-6">
          <p className="eyebrow">Notifications</p>
          <SettingRow
            icon={Bell}
            title="In-app notifications"
            detail="New transactions and flagged activity"
            checked={pushNotifs}
            onChange={setPushNotifs}
          />
          <SettingRow
            icon={Mail}
            title="Weekly email digest"
            detail="A summary of spending and insights"
            checked={emailDigest}
            onChange={setEmailDigest}
          />
        </div>

        <div className="glass-card space-y-3 rounded-2xl p-6">
          <p className="eyebrow">Appearance</p>
          <SettingRow
            icon={Moon}
            title="Dark mode"
            detail="Coming soon"
            checked={darkMode}
            onChange={setDarkMode}
          />
        </div>

        <div className="glass-card space-y-3 rounded-2xl p-6">
          <p className="eyebrow">Data & consent</p>
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
            <div className="rounded-lg bg-white p-2 text-slate-400 ring-1 ring-slate-100">
              <ShieldCheck size={15} />
            </div>
            <p className="text-[13px] leading-relaxed text-slate-500">
              3 accounts shared under AIS consent, read-only. Revoke access at any time from your bank.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  )
}