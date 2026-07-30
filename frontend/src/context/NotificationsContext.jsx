import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { api } from '../api/client.js'
import { gbp, shortDate } from '../lib/format.js'
import { useAuth } from './AuthContext.jsx'

const NotificationsContext = createContext(null)
const STORAGE_KEY = 'bf.notifications'
const SIMULATE_INTERVAL_MS = 20_000
const MAX_NOTIFICATIONS = 30

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function persist(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable — notifications just won't survive a reload */
  }
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function txNotification(t, read) {
  return {
    id: uid('tx'),
    type: 'transaction',
    severity: t.isAnomaly ? 'alert' : 'info',
    title: t.isAnomaly ? `Flagged transaction: ${t.merchant}` : `New transaction: ${t.merchant}`,
    body: `${t.direction === 'credit' ? '+' : '−'}${gbp(t.amount)} · ${t.category} · ${shortDate(t.bookingDate)}`,
    createdAt: new Date().toISOString(),
    read,
    link: { kind: 'transaction', transactionId: t.transactionId },
  }
}

function obsNotification(o, read) {
  return {
    id: uid('obs'),
    type: 'observation',
    severity: o.severity,
    title: o.title,
    body: o.body,
    createdAt: new Date().toISOString(),
    read,
    link: { kind: 'dashboard' },
  }
}

export function NotificationsProvider({ children }) {
  const { user } = useAuth() || {}
  const [notifications, setNotifications] = useState([])
  const feed = useRef({ pool: [], cursor: 0, ready: false })

  const persistWith = useCallback((next) => {
    persist({ notifications: next, pool: feed.current.pool, cursor: feed.current.cursor })
    return next
  }, [])

  useEffect(() => {
    if (!user) {
      feed.current = { pool: [], cursor: 0, ready: false }
      setNotifications([])
      return undefined
    }

    let cancelled = false

    async function seed() {
      const stored = load()
      if (stored?.notifications?.length) {
        feed.current = { pool: stored.pool || [], cursor: stored.cursor || 0, ready: true }
        setNotifications(stored.notifications)
        return
      }

      try {
        const [txs, obs] = await Promise.all([api.getTransactions(), api.getObservations()])
        if (cancelled) return

        const sorted = [...txs].sort((a, b) => (a.bookingDate < b.bookingDate ? 1 : -1))
        const anomalies = sorted.filter((t) => t.isAnomaly).slice(0, 3).map((t) => txNotification(t, true))
        const usedIds = new Set(anomalies.map((n) => n.link.transactionId))

        const alerts = (obs || [])
          .filter((o) => o.severity === 'alert' || o.severity === 'danger')
          .slice(0, 2)
          .map((o) => obsNotification(o, true))

        const initial = [...anomalies, ...alerts]
        const pool = sorted.filter((t) => !usedIds.has(t.transactionId))

        feed.current = { pool, cursor: 0, ready: true }
        setNotifications(persistWith(initial))
      } catch {
        feed.current = { pool: [], cursor: 0, ready: true }
      }
    }

    seed()
    return () => {
      cancelled = true
    }
  }, [user, persistWith])

  useEffect(() => {
    if (!user) return undefined
    const timer = setInterval(() => {
      const f = feed.current
      if (!f.ready || f.pool.length === 0) return
      const next = f.pool[f.cursor % f.pool.length]
      f.cursor += 1
      const notif = txNotification(next, false)
      setNotifications((prev) => persistWith([notif, ...prev].slice(0, MAX_NOTIFICATIONS)))
    }, SIMULATE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [user, persistWith])

  const markRead = useCallback(
    (id) => {
      setNotifications((prev) => persistWith(prev.map((n) => (n.id === id ? { ...n, read: true } : n))))
    },
    [persistWith],
  )

  const markAllRead = useCallback(() => {
    setNotifications((prev) => persistWith(prev.map((n) => ({ ...n, read: true }))))
  }, [persistWith])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markRead, markAllRead }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationsContext)