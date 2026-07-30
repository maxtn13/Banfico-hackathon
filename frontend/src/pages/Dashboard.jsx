// import { useEffect, useMemo, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { ArrowRight, Sparkles, TrendingUp, Wallet, PiggyBank } from 'lucide-react'
// import Shell from '../components/Shell.jsx'
// import { CashflowChart, SpendByCategory } from '../components/Charts.jsx'
// import { TransactionList, DashboardSkeleton } from '../components/Widgets.jsx'
// import InsightRail from '../components/InsightRail.jsx'
// import TransactionModal from '../components/TransactionModal.jsx'
// import { fetchDashboard, fetchObservations } from '../store/dashboardSlice.js'
// import { gbp, catColor, longDate, shortDate } from '../lib/format.js'

// const DAILY_LIMIT = 2500

// function ProgressBar({ value }) {
//   return (
//     <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/60">
//       <div
//         className="h-full rounded-full bg-gradient-to-r from-teal-500 via-sky-400 to-cyan-400 transition-all duration-700 ease-out"
//         style={{ width: `${value}%` }}
//       />
//     </div>
//   )
// }

// function InfoTile({ label, value, detail, icon: Icon }) {
//   return (
//     <div className="glass-card rounded-2xl p-4 text-sm">
//       <div className="flex items-center gap-2">
//         {Icon && (
//           <div className="rounded-lg bg-teal-500/10 p-1.5">
//             <Icon size={14} className="text-teal-400" />
//           </div>
//         )}
//         <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-slate-400">{label}</p>
//       </div>
//       <p className="mt-3 text-lg font-semibold tracking-tight text-navy-900">{value}</p>
//       {detail && <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{detail}</p>}
//     </div>
//   )
// }

// function CardBalance({ account, balance, userName }) {
//   return (
//     <div className="glass-card overflow-hidden rounded-2xl">
//       <div className="relative bg-gradient-to-br from-teal-500 via-sky-500 to-cyan-500 px-6 py-7 text-white overflow-hidden">
//         {/* Decorative circles */}
//         <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/5" />
//         <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/5" />

//         <div className="relative flex items-center justify-between gap-4">
//           <div>
//             <p className="text-xs uppercase tracking-[.22em] text-white/70">My Card</p>
//             <p className="mt-2 text-sm font-medium text-white/80">{account.nickname}</p>
//           </div>
//           <div className="rounded-xl bg-white/15 px-3 py-1.5 text-[11px] uppercase tracking-[.24em] text-white/90 backdrop-blur-sm">
//             Active
//           </div>
//         </div>

//         <div className="relative mt-8 flex items-end justify-between gap-4">
//           <div>
//             <p className="text-[10px] uppercase tracking-[.3em] text-white/60">Balance</p>
//             <p className="mt-2 text-3xl font-semibold tracking-tight">{gbp(balance.available)}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-[10px] uppercase tracking-[.3em] text-white/60">Exp</p>
//             <p className="mt-2 text-base font-semibold tracking-tight">12/28</p>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-4 p-5">
//         <div className="rounded-2xl bg-slate-50/80 p-4 ring-1 ring-slate-200/60 backdrop-blur-sm">
//           <div className="flex items-center justify-between gap-2">
//             <div>
//               <p className="text-[11px] uppercase tracking-[.22em] text-slate-400">Card holder</p>
//               <p className="mt-2 font-medium text-navy-900">{userName}</p>
//             </div>
//             <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">••• 335</div>
//           </div>
//         </div>

//         <div className="grid gap-3 sm:grid-cols-2">
//           {['Top up', 'Transfer', 'Request', 'History'].map((label) => (
//             <button
//               key={label}
//               type="button"
//               className="rounded-xl border border-slate-200/60 bg-white/80 px-3.5 py-2.5 text-sm font-semibold text-navy-900 backdrop-blur-sm transition hover:border-teal-400 hover:text-teal-600 hover:shadow-sm"
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// function RecentActivity({ items, onSelectTransaction }) {
//   return (
//     <div className="glass-card rounded-2xl p-5">
//       <div className="flex items-center justify-between gap-4">
//         <div>
//           <p className="eyebrow">Recent activity</p>
//           <h2 className="mt-1 text-base font-semibold text-navy-900">Latest transactions</h2>
//         </div>
//         <Link
//           to="/transactions"
//           className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 transition hover:text-teal-500"
//         >
//           View all <ArrowRight size={14} />
//         </Link>
//       </div>

//       <ul className="mt-5 space-y-3">
//         {items.map((item) => (
//           <li
//             key={item.transactionId}
//             className="cursor-pointer rounded-2xl border border-slate-200/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm transition hover:border-teal-300 hover:shadow-md"
//             onClick={() => onSelectTransaction(item)}
//           >
//             <div className="flex items-start gap-3">
//               <div
//                 className="flex h-11 w-11 items-center justify-center rounded-xl text-xs font-semibold text-white shadow-sm"
//                 style={{ background: catColor(item.category) }}
//               >
//                 {item.merchant.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()}
//               </div>
//               <div className="min-w-0 flex-1">
//                 <p className="font-medium text-navy-900">{item.merchant}</p>
//                 <p className="mt-1 text-sm text-slate-500">
//                   {item.category} · {shortDate(item.bookingDate)}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className={`tnum text-sm font-semibold ${item.direction === 'credit' ? 'text-teal-600' : 'text-navy-900'}`}>
//                   {item.direction === 'credit' ? `+${gbp(item.amount)}` : `−${gbp(item.amount)}`}
//                 </p>
//                 <p className="mt-1 text-[12px] text-slate-400">
//                   {item.isAnomaly ? 'Flagged' : 'Completed'}
//                 </p>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default function Dashboard() {
//   const dispatch = useDispatch()
//   const { data, observations: obs, obsLoading, error } = useSelector((s) => s.dashboard)
//   const { displayName, firstName } = useSelector((s) => s.auth)
//   const [selected, setSelected] = useState(null)
//   const [modalTransaction, setModalTransaction] = useState(null)

//   useEffect(() => {
//     dispatch(fetchDashboard())
//     dispatch(fetchObservations())
//   }, [dispatch])

//   const selectedTransactions = useMemo(() => {
//     if (!data) return []
//     return selected ? data.transactions.filter((t) => t.accountId === selected) : data.transactions
//   }, [data, selected])

//   if (error) {
//     return (
//       <Shell title="Dashboard">
//         <div className="glass-card mx-auto max-w-md rounded-2xl p-6 text-center">
//           <p className="text-[14px] font-semibold text-navy-900">Nothing to show yet</p>
//           <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{error}</p>
//           <button onClick={() => window.location.reload()} className="btn-ghost mt-4">
//             Try again
//           </button>
//         </div>
//       </Shell>
//     )
//   }

//   if (!data) {
//     return (
//       <Shell title="Dashboard" subtitle="Loading your accounts">
//         <DashboardSkeleton />
//       </Shell>
//     )
//   }

//   const { accounts, balances, transactions, insights } = data
//   const netWorth = balances.reduce((t, b) => t + b.available, 0)
//   const balanceFor = (id) => balances.find((b) => b.accountId === id) || { available: 0 }
//   const topCategory = insights.byCategory?.[0]
//   const cardAccount = accounts.find((a) => a.type.toLowerCase().includes('card')) || accounts[0]
//   const cardBalance = balanceFor(cardAccount.accountId)
//   const recentTransactions = selectedTransactions.slice(0, 4)
//   const spent = insights.summary.expense
//   const limitPct = Math.min(Math.round((spent / DAILY_LIMIT) * 100), 100)

//   return (
//     <Shell
//       title={`Hello, ${firstName || displayName || 'User'}`}
//       subtitle={`Updated ${longDate(balances[0]?.asOf || new Date().toISOString())}`}
//     >
//       <div className="space-y-6">
//         {/* Hero overview card */}
//         <div className="grid gap-6 xl:grid-cols-[1.5fr_360px]">
//           <div className="space-y-6">
//             <div className="glass-card overflow-hidden rounded-2xl">
//               <div className="relative bg-[#0b2135] px-6 py-8 text-white sm:px-8 sm:py-9 overflow-hidden">
//                 {/* Ambient decoration */}
//                 <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-teal-500/10 blur-2xl" />
//                 <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-sky-400/8 blur-xl" />

//                 <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
//                   <div className="min-w-0">
//                     <p className="uppercase tracking-[.22em] text-slate-300/80">Dashboard overview</p>
//                     <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
//                       {gbp(netWorth)} <span className="text-xl font-normal text-slate-300">across your accounts</span>
//                     </h1>
//                     <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300/70">
//                       Your balances, spending and savings are all shown in one place with the latest insights from Banfico.
//                     </p>
//                   </div>
//                   <div className="grid gap-3 sm:grid-cols-3">
//                     <InfoTile label="Income" value={gbp(insights.summary.income)} detail="This month" icon={TrendingUp} />
//                     <InfoTile label="Expense" value={gbp(insights.summary.expense)} detail="This month" icon={Wallet} />
//                     <InfoTile
//                       label="Savings"
//                       value={`${insights.summary.savingsRate}%`}
//                       detail={`${gbp(insights.summary.net)} left after costs`}
//                       icon={PiggyBank}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Charts row */}
//             <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
//               <CashflowChart data={insights.byMonth} />
//               <SpendByCategory data={insights.byCategory} />
//             </div>

//             {/* Transaction history card */}
//             <div className="glass-card rounded-2xl p-5">
//               <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                   <p className="eyebrow">Transaction history</p>
//                   <h2 className="mt-1 text-base font-semibold text-navy-900">Most recent movements</h2>
//                 </div>
//                 <Link
//                   to="/transactions"
//                   className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition hover:text-teal-500"
//                 >
//                   View all activity <ArrowRight size={14} />
//                 </Link>
//               </div>
//               <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/60">
//                 <TransactionList items={selectedTransactions.slice(0, 8)} onSelectTransaction={setModalTransaction} />
//               </div>
//             </div>
//           </div>

//           {/* Right sidebar */}
//           <div className="space-y-6">
//             <CardBalance account={cardAccount} balance={cardBalance} userName={displayName || 'User'} />

//             {/* Daily limit card */}
//             <div className="glass-card rounded-2xl p-5">
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <p className="eyebrow">Daily limit</p>
//                   <h3 className="mt-2 text-base font-semibold text-navy-900">£{DAILY_LIMIT.toLocaleString()}</h3>
//                 </div>
//                 <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[.2em] text-teal-600">
//                   {limitPct}% used
//                 </span>
//               </div>
//               <div className="mt-5 space-y-3">
//                 <ProgressBar value={limitPct} />
//                 <p className="text-sm text-slate-500">
//                   You've spent {gbp(spent)} of your £{DAILY_LIMIT.toLocaleString()} monthly budget so far.
//                 </p>
//               </div>
//             </div>

//             <RecentActivity items={recentTransactions} onSelectTransaction={setModalTransaction} />

//             {/* AI Insight card */}
//             <div className="glass-card rounded-2xl p-5">
//               <div className="flex items-center gap-3">
//                 <div className="rounded-xl bg-gradient-to-br from-teal-500/15 to-cyan-500/10 p-3 text-teal-600">
//                   <Sparkles size={18} />
//                 </div>
//                 <div>
//                   <p className="eyebrow">Insight</p>
//                   <p className="mt-1 text-base font-semibold text-navy-900">What the AI suggests</p>
//                 </div>
//               </div>
//               <p className="mt-4 text-sm leading-relaxed text-slate-600">
//                 Your eating out spend is above average this month. The dashboard spots anomalies and gives you clear next steps to save more.
//               </p>
//             </div>

//             <InsightRail observations={obs} loading={obsLoading} />
//           </div>
//         </div>
//       </div>

//       {/* Transaction detail modal */}
//       {modalTransaction && (
//         <TransactionModal transaction={modalTransaction} onClose={() => setModalTransaction(null)} />
//       )}
//     </Shell>
//   )
// }

import { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, TrendingUp, Wallet, PiggyBank } from 'lucide-react'
import Shell from '../components/Shell.jsx'
import { CashflowChart, SpendByCategory } from '../components/Charts.jsx'
import { TransactionList, DashboardSkeleton } from '../components/Widgets.jsx'
import InsightRail from '../components/InsightRail.jsx'
import TransactionModal from '../components/TransactionModal.jsx'
import { fetchDashboard, fetchObservations } from '../store/dashboardSlice.js'
import { gbp, longDate } from '../lib/format.js'

const DAILY_LIMIT = 2500

function ProgressBar({ value }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/60">
      <div
        className="h-full rounded-full bg-gradient-to-r from-teal-500 via-sky-400 to-cyan-400 transition-all duration-700 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function InfoTile({ label, value, detail, icon: Icon }) {
  return (
    <div className="glass-card min-w-0 rounded-2xl p-4 text-sm">
      <div className="flex min-w-0 items-center gap-1.5">
        {Icon && (
          <div className="shrink-0 rounded-lg bg-teal-500/10 p-1">
            <Icon size={13} className="text-teal-400" />
          </div>
        )}
        <p className="min-w-0 text-[9.5px] font-semibold uppercase tracking-[.04em] text-slate-400">{label}</p>
      </div>
      <p className="mt-3 break-words text-base font-semibold leading-tight tracking-tight text-navy-900">{value}</p>
      {detail && <p className="mt-1 break-words text-[12px] leading-snug text-slate-500">{detail}</p>}
    </div>
  )
}

function CardBalance({ account, balance, userName }) {
  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="relative bg-gradient-to-br from-teal-500 via-sky-500 to-cyan-500 px-6 py-7 text-white overflow-hidden">
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/5" />

        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[.22em] text-white/70">My Card</p>
            <p className="mt-2 text-sm font-medium text-white/80">{account.nickname}</p>
          </div>
          <div className="rounded-xl bg-white/15 px-3 py-1.5 text-[11px] uppercase tracking-[.24em] text-white/90 backdrop-blur-sm">
            Active
          </div>
        </div>

        <div className="relative mt-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[.3em] text-white/60">Balance</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{gbp(balance.available)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[.3em] text-white/60">Exp</p>
            <p className="mt-2 text-base font-semibold tracking-tight">12/28</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="rounded-2xl bg-slate-50/80 p-4 ring-1 ring-slate-200/60 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[.22em] text-slate-400">Card holder</p>
              <p className="mt-2 font-medium text-navy-900">{userName}</p>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">••• 335</div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {['Top up', 'Transfer', 'Request', 'History'].map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-xl border border-slate-200/60 bg-white/80 px-3.5 py-2.5 text-sm font-semibold text-navy-900 backdrop-blur-sm transition hover:border-teal-400 hover:text-teal-600 hover:shadow-sm"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const dispatch = useDispatch()
  const { data, observations: obs, obsLoading, error } = useSelector((s) => s.dashboard)
  const { displayName, firstName } = useSelector((s) => s.auth)
  const [selected, setSelected] = useState(null)
  const [modalTransaction, setModalTransaction] = useState(null)

  useEffect(() => {
    dispatch(fetchDashboard())
    dispatch(fetchObservations())
  }, [dispatch])

  const selectedTransactions = useMemo(() => {
    if (!data) return []
    return selected ? data.transactions.filter((t) => t.accountId === selected) : data.transactions
  }, [data, selected])

  if (error) {
    return (
      <Shell title="Dashboard">
        <div className="glass-card mx-auto max-w-md rounded-2xl p-6 text-center">
          <p className="text-[14px] font-semibold text-navy-900">Nothing to show yet</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-ghost mt-4">
            Try again
          </button>
        </div>
      </Shell>
    )
  }

  if (!data) {
    return (
      <Shell title="Dashboard" subtitle="Loading your accounts">
        <DashboardSkeleton />
      </Shell>
    )
  }

  const { accounts, balances, transactions, insights } = data
  const netWorth = balances.reduce((t, b) => t + b.available, 0)
  const balanceFor = (id) => balances.find((b) => b.accountId === id) || { available: 0 }
  const topCategory = insights.byCategory?.[0]
  const cardAccount = accounts.find((a) => a.type.toLowerCase().includes('card')) || accounts[0]
  const cardBalance = balanceFor(cardAccount.accountId)
  const spent = insights.summary.expense
  const limitPct = Math.min(Math.round((spent / DAILY_LIMIT) * 100), 100)

  return (
    <Shell
      title={`Hello, ${firstName || displayName || 'User'}`}
      subtitle={`Welcome back!`}
    >
      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-[1.5fr_360px]">
          <div className="min-w-0 space-y-6">
            <div className="glass-card overflow-hidden rounded-2xl">
              <div className="relative bg-[#0b2135] px-6 py-8 text-white sm:px-8 sm:py-9 overflow-hidden">
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-teal-500/10 blur-2xl" />
                <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-sky-400/8 blur-xl" />

                <div className="relative flex min-w-0 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="min-w-0">
                    <p className="uppercase tracking-[.22em] text-slate-300/80">Dashboard overview</p>
                   <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {gbp(netWorth)} <span className="text-xl font-normal text-slate-300">across your accounts</span>
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300/70">
                      Your balances, spending and savings are all shown in one place with the latest insights from Banfico.
                    </p>
                  </div>
                  <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
                    <InfoTile label="Income" value={gbp(insights.summary.income)} detail="This month" icon={TrendingUp} />
                    <InfoTile label="Expense" value={gbp(insights.summary.expense)} detail="This month" icon={Wallet} />
                    <InfoTile
                      label="Savings"
                      value={`${insights.summary.savingsRate}%`}
                      detail={`${gbp(insights.summary.net)} left after costs`}
                      icon={PiggyBank}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts row */}
            <div className="grid min-w-0 grid-cols-1 gap-6">
              <CashflowChart data={insights.byMonth} />
              <SpendByCategory data={insights.byCategory} />
            </div>

            <div className="glass-card rounded-2xl p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="eyebrow">Transaction history</p>
                  <h2 className="mt-1 text-base font-semibold text-navy-900">Most recent movements</h2>
                </div>
                <Link
                  to="/transactions"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition hover:text-teal-500"
                >
                  View all activity <ArrowRight size={14} />
                </Link>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/60">
                <TransactionList items={selectedTransactions.slice(0, 8)} onSelectTransaction={setModalTransaction} />
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-6">
            <CardBalance account={cardAccount} balance={cardBalance} userName={displayName || 'User'} />

            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Daily limit</p>
                  <h3 className="mt-2 text-base font-semibold text-navy-900">£{DAILY_LIMIT.toLocaleString()}</h3>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[.2em] text-teal-600">
                  {limitPct}% used
                </span>
              </div>
              <div className="mt-5 space-y-3">
                <ProgressBar value={limitPct} />
                <p className="text-sm text-slate-500">
                  You've spent {gbp(spent)} of your £{DAILY_LIMIT.toLocaleString()} monthly budget so far.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-teal-500/15 to-cyan-500/10 p-3 text-teal-600">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="eyebrow">Insight</p>
                  <p className="mt-1 text-base font-semibold text-navy-900">What the AI suggests</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Your eating out spend is above average this month. The dashboard spots anomalies and gives you clear next steps to save more.
              </p>
            </div>

            <InsightRail observations={obs} loading={obsLoading} />
          </div>
        </div>
      </div>

      {modalTransaction && (
        <TransactionModal transaction={modalTransaction} onClose={() => setModalTransaction(null)} />
      )}
    </Shell>
  )
}