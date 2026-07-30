import { useNavigate } from 'react-router-dom'
import { Bell, AlertTriangle, ShieldAlert, Info, Receipt, CheckCheck } from 'lucide-react'
import Shell from '../components/Shell.jsx'
import { useNotifications } from '../context/NotificationsContext.jsx'
import { timeAgo } from '../lib/format.js'

const ICONS = {
  alert: { icon: AlertTriangle, tint: 'bg-alert/10 text-alert' },
  danger: { icon: ShieldAlert, tint: 'bg-danger/10 text-danger' },
  info: { icon: Info, tint: 'bg-brandblue-100 text-brandblue-500' },
  good: { icon: Receipt, tint: 'bg-teal-500/10 text-teal-600' },
}

function iconFor(n) {
  if (n.type === 'transaction' && n.severity !== 'alert') {
    return { icon: Receipt, tint: 'bg-teal-500/10 text-teal-600' }
  }
  return ICONS[n.severity] || ICONS.info
}

export default function Notifications() {
  const navigate = useNavigate()
  const { notifications, markRead, markAllRead } = useNotifications() || { notifications: [] }

  function openNotification(n) {
    markRead(n.id)
    if (n.link?.kind === 'transaction') {
      navigate(`/transactions?focus=${encodeURIComponent(n.link.transactionId)}`)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <Shell title="Notifications" subtitle="Everything flagged or arriving on your accounts">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            <span className="tnum font-semibold text-navy-900">{notifications.length}</span> total
          </p>
          {notifications.some((n) => !n.read) && (
            <button
              onClick={markAllRead}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-semibold text-navy-800 transition hover:border-teal-400 hover:text-teal-600"
            >
              <CheckCheck size={14} /> Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
              <Bell size={18} className="text-slate-400" />
            </div>
            <p className="text-[14px] font-semibold text-navy-900">You're all caught up</p>
            <p className="mt-1 text-[13px] text-slate-500">
              New transactions and alerts will show up here as they happen.
            </p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {notifications.map((n) => {
              const { icon: Icon, tint } = iconFor(n)
              return (
                <li key={n.id}>
                  <button
                    onClick={() => openNotification(n)}
                    className={`glass-card flex w-full items-start gap-3 rounded-2xl p-4 text-left transition hover:shadow-rail ${
                      n.read ? '' : 'ring-1 ring-inset ring-teal-500/30'
                    }`}
                  >
                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tint}`}>
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[13.5px] font-semibold leading-snug text-navy-900">{n.title}</p>
                        {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500" aria-hidden="true" />}
                      </div>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{n.body}</p>
                      <p className="mt-1.5 text-[11.5px] text-slate-400">{timeAgo(n.createdAt)}</p>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Shell>
  )
}