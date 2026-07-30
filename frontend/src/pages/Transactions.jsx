// import { useCallback, useEffect, useMemo, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { Search, SlidersHorizontal } from 'lucide-react'
// import Shell from '../components/Shell.jsx'
// import { TransactionList, Skeleton } from '../components/Widgets.jsx'
// import TransactionModal from '../components/TransactionModal.jsx'
// import { api } from '../api/client.js'
// import { gbp } from '../lib/format.js'

// const PAGE_SIZE = 50

// export default function Transactions() {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [rows, setRows] = useState(null)
//   const [accounts, setAccounts] = useState([])
//   const [q, setQ] = useState(searchParams.get('q') || '')
//   const [account, setAccount] = useState('all')
//   const [only, setOnly] = useState('all')
//   const [pageInfo, setPageInfo] = useState({ page: -1, pageSize: PAGE_SIZE, totalCount: 0, totalPages: 0 })
//   const [isLoadingMore, setIsLoadingMore] = useState(false)
//   const [error, setError] = useState('')
//   const [modalTransaction, setModalTransaction] = useState(null)

//   const loadTransactionsPage = useCallback(async (page, { append = false } = {}) => {
//     setError('')
//     if (append) setIsLoadingMore(true)

//     try {
//       const payload = await api.getTransactionsPage({ page, pageSize: PAGE_SIZE })
//       setRows((current) => (append ? [...(current || []), ...payload.transactions] : payload.transactions))
//       setPageInfo({
//         page: payload.page,
//         pageSize: payload.pageSize,
//         totalCount: payload.totalCount,
//         totalPages: payload.totalPages,
//       })
//     } catch (err) {
//       setError(err.message || 'Could not load transactions')
//       if (!append) setRows([])
//     } finally {
//       if (append) setIsLoadingMore(false)
//     }
//   }, [])

//   useEffect(() => {
//     Promise.all([loadTransactionsPage(0), api.getAccounts().then(setAccounts)]).catch((err) => {
//       setError(err.message || 'Could not load transactions')
//       setRows([])
//     })
//   }, [loadTransactionsPage])

//   useEffect(() => {
//     const focusId = searchParams.get('focus')
//     if (!focusId) return undefined
//     let cancelled = false

//     ;(async () => {
//       const existing = rows?.find((t) => t.transactionId === focusId)
//       if (existing) {
//         setModalTransaction(existing)
//       } else {
//         try {
//           const all = await api.getTransactions()
//           const found = all.find((t) => t.transactionId === focusId)
//           if (!cancelled && found) setModalTransaction(found)
//         } catch {
//           /* ignore — nothing to focus on if the lookup fails */
//         }
//       }
//       if (!cancelled) {
//         const next = new URLSearchParams(searchParams)
//         next.delete('focus')
//         setSearchParams(next, { replace: true })
//       }
//     })()

//     return () => {
//       cancelled = true
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams])

//   const filtered = useMemo(() => {
//     if (!rows) return []
//     const term = q.trim().toLowerCase()
//     return rows.filter((t) => {
//       if (account !== 'all' && t.accountId !== account) return false
//       if (only === 'flagged' && !t.isAnomaly) return false
//       if (only === 'recurring' && !t.isSubscription) return false
//       if (!term) return true
//       return (
//         t.merchant.toLowerCase().includes(term) ||
//         t.category.toLowerCase().includes(term) ||
//         t.description.toLowerCase().includes(term)
//       )
//     })
//   }, [rows, q, account, only])

//   const outgoing = filtered
//     .filter((t) => t.direction === 'debit')
//     .reduce((s, t) => s + t.amount, 0)
//   const loadedCount = rows?.length || 0
//   const hasMore = pageInfo.totalPages > 0 && pageInfo.page + 1 < pageInfo.totalPages

//   return (
//     <Shell title="Transactions" subtitle="Six months across every connected account">
//       <div className="glass-card mb-4 flex flex-wrap items-center gap-3 rounded-2xl p-3">
//         <div className="relative min-w-[200px] flex-1">
//           <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//           <input
//             className="field pl-9"
//             placeholder="Search loaded merchants, categories or references"
//             value={q}
//             onChange={(e) => setQ(e.target.value)}
//           />
//         </div>

//         <select className="field w-auto" value={account} onChange={(e) => setAccount(e.target.value)}>
//           <option value="all">All loaded accounts</option>
//           {accounts.map((a) => (
//             <option key={a.accountId} value={a.accountId}>
//               {a.nickname}
//             </option>
//           ))}
//         </select>

//         <div className="flex items-center gap-1 rounded-xl bg-slate-50/80 p-1 backdrop-blur-sm">
//           {[
//             ['all', 'Everything'],
//             ['flagged', 'Flagged'],
//             ['recurring', 'Recurring'],
//           ].map(([k, label]) => (
//             <button
//               key={k}
//               onClick={() => setOnly(k)}
//               className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition ${
//                 only === k ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-800'
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {!rows ? (
//         <Skeleton className="h-[520px]" />
//       ) : (
//         <div className="glass-card overflow-hidden rounded-2xl">
//           <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100/60 px-4 py-3">
//             <div className="flex items-center gap-2">
//               <SlidersHorizontal size={14} className="text-slate-400" />
//               <p className="text-[13px] text-slate-500">
//                 <span className="tnum font-semibold text-navy-900">{filtered.length}</span> shown from{' '}
//                 <span className="tnum font-semibold text-navy-900">{loadedCount}</span> loaded
//                 {pageInfo.totalCount ? (
//                   <>
//                     {' '}
//                     of <span className="tnum font-semibold text-navy-900">{pageInfo.totalCount}</span>
//                   </>
//                 ) : null}{' '}
//                 transactions · <span className="tnum font-semibold text-navy-900">{gbp(outgoing)}</span> out
//               </p>
//             </div>
//             {hasMore ? (
//               <button
//                 className="rounded-xl bg-navy-900 px-3 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
//                 disabled={isLoadingMore}
//                 onClick={() => loadTransactionsPage(pageInfo.page + 1, { append: true })}
//               >
//                 {isLoadingMore ? 'Loading…' : 'Load more'}
//               </button>
//             ) : null}
//           </div>
//           {error ? <p className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
//           <TransactionList
//             items={filtered}
//             emptyHint="Try clearing the search, switching filters or loading more transactions."
//             onSelectTransaction={setModalTransaction}
//           />
//         </div>
//       )}

//       {modalTransaction && (
//         <TransactionModal transaction={modalTransaction} onClose={() => setModalTransaction(null)} />
//       )}
//     </Shell>
//   )
// }

import { Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api/client.js'
import Shell from '../components/Shell.jsx'
import TransactionModal from '../components/TransactionModal.jsx'
import { Skeleton, TransactionList } from '../components/Widgets.jsx'
import { gbp } from '../lib/format.js'

const PAGE_SIZE = 50

export default function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [rows, setRows] = useState(null)
  const [q, setQ] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState('all')
  const [only, setOnly] = useState('all') // all | flagged | recurring
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [error, setError] = useState('')
  const [modalTransaction, setModalTransaction] = useState(null)

  // Load the FULL transaction set once, so filters (category, flagged,
  // recurring, account) search across everything instead of just whatever
  // happened to be on the first loaded page.
  useEffect(() => {
    let cancelled = false
    setError('')

    api.getTransactions()
      .then((txs) => {
        if (cancelled) return
        setRows(txs)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || 'Could not load transactions')
        setRows([])
      })

    return () => {
      cancelled = true
    }
  }, [])

  // Deep link: /transactions?focus=<transactionId> opens that transaction's
  // detail modal directly.
  useEffect(() => {
    const focusId = searchParams.get('focus')
    if (!focusId || !rows) return undefined

    const found = rows.find((t) => t.transactionId === focusId)
    if (found) setModalTransaction(found)

    const next = new URLSearchParams(searchParams)
    next.delete('focus')
    setSearchParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, rows])

  const categories = useMemo(() => {
    if (!rows) return []
    return Array.from(new Set(rows.map((t) => t.category))).sort((a, b) => a.localeCompare(b))
  }, [rows])

  const filtered = useMemo(() => {
    if (!rows) return []
    const term = q.trim().toLowerCase()
    return rows.filter((t) => {
      if (category !== 'all' && t.category !== category) return false
      if (only === 'flagged' && !t.isAnomaly) return false
      if (only === 'recurring' && !t.isSubscription) return false
      if (!term) return true
      return (
        t.merchant.toLowerCase().includes(term) ||
        t.category.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term)
      )
    })
  }, [rows, q, category, only])

  // Reset how many rows are revealed whenever the active filters change,
  // so switching to "Flagged" etc. doesn't stay stuck on a stale slice.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [q, category, only])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const outgoing = filtered
    .filter((t) => t.direction === 'debit')
    .reduce((s, t) => s + t.amount, 0)

  return (
    <Shell title="Transactions" subtitle="Six months across every connected account">
      <div className="glass-card mb-4 flex flex-wrap items-center gap-3 rounded-2xl p-3">
        <div className="relative min-w-[200px] flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="field pl-9"
            placeholder="Search merchants, categories or references"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <select className="field w-auto" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1 rounded-xl bg-slate-50/80 p-1 backdrop-blur-sm">
          {[
            ['all', 'Everything'],
            ['flagged', 'Flagged'],
            ['recurring', 'Recurring'],
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setOnly(k)}
              className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition ${
                only === k ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {!rows ? (
        <Skeleton className="h-[520px]" />
      ) : (
        <div className="glass-card overflow-hidden rounded-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-slate-400" />
              <p className="text-[13px] text-slate-500">
                <span className="tnum font-semibold text-navy-900">{visible.length}</span> shown from{' '}
                <span className="tnum font-semibold text-navy-900">{filtered.length}</span> matching
                {' '}
                of <span className="tnum font-semibold text-navy-900">{rows.length}</span>{' '}
                transactions · <span className="tnum font-semibold text-navy-900">{gbp(outgoing)}</span> out
              </p>
            </div>
            {hasMore ? (
              <button
                className="rounded-xl bg-navy-900 px-3 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-navy-800"
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              >
                Load more
              </button>
            ) : null}
          </div>
          {error ? <p className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
          <TransactionList
            items={visible}
            emptyHint="Try clearing the search, switching filters, or picking a different account or category."
            onSelectTransaction={setModalTransaction}
          />
        </div>
      )}

      {/* Transaction detail modal */}
      {modalTransaction && (
        <TransactionModal transaction={modalTransaction} onClose={() => setModalTransaction(null)} />
      )}
    </Shell>
  )
}