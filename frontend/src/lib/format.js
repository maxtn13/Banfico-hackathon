// export const gbp = (n, opts = {}) =>
//   new Intl.NumberFormat('en-GB', {
//     style: 'currency',
//     currency: 'GBP',
//     minimumFractionDigits: opts.compact ? 0 : 2,
//     maximumFractionDigits: opts.compact ? 0 : 2,
//   }).format(n ?? 0)

// export const signed = (t) => (t.direction === 'credit' ? `+${gbp(t.amount)}` : `\u2212${gbp(t.amount)}`)

// export const shortDate = (iso) =>
//   new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

// export const longDate = (iso) =>
//   new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

// export const initials = (name = '') =>
//   name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('')

// // One colour per category, used identically by the donut, the legend and
// // the transaction rows. Keeps the eye anchored across the whole dashboard.
// export const CATEGORY_COLORS = {
//   Housing: '#0B2135',
//   Bills: '#16385A',
//   Groceries: '#2E7BB8',
//   'Eating out': '#17A398',
//   Transport: '#22C3AF',
//   Shopping: '#E0913A',
//   Subscriptions: '#8B9AAB',
//   Health: '#0F8A80',
//   Home: '#1E4A73',
//   Cash: '#CF4F4A',
//   Salary: '#17A398',
//   Transfers: '#DBE2EA',
// }

// export const catColor = (c) => CATEGORY_COLORS[c] || '#8B9AAB'


export const gbp = (n, opts = {}) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: opts.compact ? 0 : 2,
    maximumFractionDigits: opts.compact ? 0 : 2,
  }).format(n ?? 0)

export const signed = (t) => (t.direction === 'credit' ? `+${gbp(t.amount)}` : `\u2212${gbp(t.amount)}`)

export const shortDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

export const longDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export const initials = (name = '') =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('')

export function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const sec = Math.max(0, Math.round(diffMs / 1000))
  if (sec < 45) return 'just now'
  const min = Math.round(sec / 60)
  if (min < 60) return `${min}m ago`
  const hr = Math.round(min / 60)
  if (hr < 24) return `${hr}h ago`
  const day = Math.round(hr / 24)
  if (day < 7) return `${day}d ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export const CATEGORY_COLORS = {
  Housing: '#0B2135',
  Bills: '#16385A',
  Groceries: '#2E7BB8',
  'Eating out': '#17A398',
  Transport: '#22C3AF',
  Shopping: '#E0913A',
  Subscriptions: '#8B9AAB',
  Health: '#0F8A80',
  Home: '#1E4A73',
  Cash: '#CF4F4A',
  Salary: '#17A398',
  Transfers: '#DBE2EA',
}

export const catColor = (c) => CATEGORY_COLORS[c] || '#8B9AAB'
