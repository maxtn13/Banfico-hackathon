// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
//   Line,
//   ComposedChart,
// } from 'recharts'
// import { gbp, catColor } from '../lib/format.js'

// function TooltipShell({ children }) {
//   return (
//     <div className="rounded-xl border border-slate-200/60 bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur-sm">
//       {children}
//     </div>
//   )
// }

// // ── Income vs expense, six months ──────────────────────────────
// export function CashflowChart({ data }) {
//   return (
//     <div className="glass-card rounded-2xl p-5">
//       <div className="flex flex-wrap items-baseline justify-between gap-2">
//         <div>
//           <p className="eyebrow">Six-month view</p>
//           <h2 className="mt-1 font-display text-base font-semibold text-navy-900">
//             Income against spending
//           </h2>
//         </div>
//         <p className="text-[13px] text-slate-500">Net line shows what you kept</p>
//       </div>

//       <div className="mt-5 h-[248px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <ComposedChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -14 }}>
//             <CartesianGrid stroke="#EBEFF4" vertical={false} />
//             <XAxis
//               dataKey="label"
//               tickLine={false}
//               axisLine={false}
//               tick={{ fill: '#8B9AAB', fontSize: 12 }}
//             />
//             <YAxis
//               tickLine={false}
//               axisLine={false}
//               tick={{ fill: '#8B9AAB', fontSize: 12 }}
//               tickFormatter={(v) => `£${Math.round(v / 1000)}k`}
//             />
//             <Tooltip
//               cursor={{ fill: '#F5F7FA' }}
//               content={({ active, payload, label }) =>
//                 active && payload?.length ? (
//                   <TooltipShell>
//                     <p className="mb-1 font-semibold text-navy-900">{label}</p>
//                     {payload.map((p) => (
//                       <p key={p.name} className="tnum text-slate-500">
//                         <span style={{ color: p.color }}>■</span> {p.name}: {gbp(p.value)}
//                       </p>
//                     ))}
//                   </TooltipShell>
//                 ) : null
//               }
//             />
//             <Legend
//               iconType="circle"
//               iconSize={8}
//               wrapperStyle={{ fontSize: 12, color: '#5A6B7C', paddingTop: 8 }}
//             />
//             <Bar dataKey="income" name="Money in" fill="#17A398" radius={[6, 6, 0, 0]} maxBarSize={26} />
//             <Bar dataKey="expense" name="Money out" fill="#16385A" radius={[6, 6, 0, 0]} maxBarSize={26} />
//             <Line
//               type="monotone"
//               dataKey={(d) => d.income - d.expense}
//               name="Net"
//               stroke="#E0913A"
//               strokeWidth={2}
//               dot={{ r: 3, fill: '#E0913A' }}
//             />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   )
// }

// // ── Category donut with a real legend, not a floating key ───────
// export function SpendByCategory({ data }) {
//   const total = data.reduce((t, d) => t + d.amount, 0)
//   const top = data.slice(0, 7)

//   return (
//     <div className="glass-card rounded-2xl p-5">
//       <p className="eyebrow">This month</p>
//       <h2 className="mt-1 font-display text-base font-semibold text-navy-900">Where it went</h2>

//       <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row">
//         <div className="relative h-[176px] w-[176px] shrink-0">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={top}
//                 dataKey="amount"
//                 nameKey="category"
//                 innerRadius={56}
//                 outerRadius={84}
//                 paddingAngle={2}
//                 stroke="none"
//               >
//                 {top.map((d) => (
//                   <Cell key={d.category} fill={catColor(d.category)} />
//                 ))}
//               </Pie>
//               <Tooltip
//                 content={({ active, payload }) =>
//                   active && payload?.length ? (
//                     <TooltipShell>
//                       <p className="font-semibold text-navy-900">{payload[0].name}</p>
//                       <p className="tnum text-slate-500">
//                         {gbp(payload[0].value)} · {Math.round((payload[0].value / total) * 100)}%
//                       </p>
//                     </TooltipShell>
//                   ) : null
//                 }
//               />
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="pointer-events-none absolute inset-0 grid place-items-center">
//             <div className="text-center">
//               <p className="text-[11px] uppercase tracking-wider text-slate-400">Total</p>
//               <p className="tnum font-display text-lg font-semibold text-navy-900">
//                 {gbp(total, { compact: true })}
//               </p>
//             </div>
//           </div>
//         </div>

//         <ul className="w-full space-y-1.5">
//           {top.map((d) => (
//             <li key={d.category} className="flex items-center gap-2.5 text-[13px]">
//               <span
//                 className="h-2.5 w-2.5 shrink-0 rounded-sm"
//                 style={{ background: catColor(d.category) }}
//               />
//               <span className="truncate text-slate-600">{d.category}</span>
//               <span className="tnum ml-auto font-medium text-navy-800">{gbp(d.amount)}</span>
//               {d.pctChange !== null && Math.abs(d.pctChange) >= 10 && (
//                 <span
//                   className={`tnum w-[52px] shrink-0 text-right text-[12px] ${
//                     d.pctChange > 0 ? 'text-alert' : 'text-teal-600'
//                   }`}
//                 >
//                   {d.pctChange > 0 ? '+' : ''}
//                   {Math.round(d.pctChange)}%
//                 </span>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  Line,
} from 'recharts'
import { gbp, catColor } from '../lib/format.js'
import { useElementWidth } from '../lib/useElementWidth.js'

function TooltipShell({ children }) {
  return (
    <div className="rounded-xl border border-slate-200/60 bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur-sm">
      {children}
    </div>
  )
}

function MonthTick({ x, y, payload }) {
  return (
    <text x={x} y={y + 14} textAnchor="middle" fontSize={12} fill="#8B9AAB">
      {payload.value}
    </text>
  )
}

export function CashflowChart({ data }) {
  const [wrapRef, width] = useElementWidth()
  const height = 320

  return (
    <div className="glass-card min-w-0 rounded-2xl p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="eyebrow">Six-month view</p>
          <h2 className="mt-1 font-display text-base font-semibold text-navy-900">
            Income against spending
          </h2>
        </div>
        <p className="text-[13px] text-slate-500">Net line shows what you kept</p>
      </div>

      <div ref={wrapRef} className="mt-5 w-full" style={{ height }}>
        {width > 0 && (
          <ComposedChart
            key={width}
            width={width}
            height={height}
            data={data}
            margin={{ top: 4, right: 8, bottom: 4, left: 4 }}
            barCategoryGap="28%"
            barGap={4}
          >
            <CartesianGrid stroke="#EBEFF4" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval={0}
              height={32}
              tick={<MonthTick />}
              padding={{ left: 12, right: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={48}
              tick={{ fill: '#8B9AAB', fontSize: 12 }}
              tickFormatter={(v) => `£${Math.round(v / 1000)}k`}
            />
            <Tooltip
              cursor={{ fill: '#F5F7FA' }}
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <TooltipShell>
                    <p className="mb-1 font-semibold text-navy-900">{label}</p>
                    {payload.map((p) => (
                      <p key={p.name} className="tnum text-slate-500">
                        <span style={{ color: p.color }}>■</span> {p.name}: {gbp(p.value)}
                      </p>
                    ))}
                  </TooltipShell>
                ) : null
              }
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, color: '#5A6B7C', paddingTop: 12 }}
            />
            <Bar dataKey="income" name="Money in" fill="#17A398" radius={[6, 6, 0, 0]} maxBarSize={26} />
            <Bar dataKey="expense" name="Money out" fill="#16385A" radius={[6, 6, 0, 0]} maxBarSize={26} />
            <Line
              type="monotone"
              dataKey={(d) => d.income - d.expense}
              name="Net"
              stroke="#E0913A"
              strokeWidth={2}
              dot={{ r: 3, fill: '#E0913A' }}
            />
          </ComposedChart>
        )}
      </div>
    </div>
  )
}

export function SpendByCategory({ data }) {
  const [wrapRef, width] = useElementWidth()
  const total = data.reduce((t, d) => t + d.amount, 0)
  const top = data.slice(0, 7)
  const [hovered, setHovered] = useState(null)

  const centre = hovered
    ? {
        label: hovered.category,
        value: gbp(hovered.amount, { compact: true }),
        sub: `${Math.round((hovered.amount / total) * 100)}%`,
      }
    : { label: 'Total', value: gbp(total, { compact: true }), sub: null }

  const size = 176

  return (
    <div className="glass-card min-w-0 rounded-2xl p-5">
      <p className="eyebrow">This month</p>
      <h2 className="mt-1 font-display text-base font-semibold text-navy-900">Where it went</h2>

      <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row">
        <div ref={wrapRef} className="relative h-[176px] w-[176px] shrink-0">
          {width > 0 && (
            <PieChart width={size} height={size}>
              <Pie
                data={top}
                dataKey="amount"
                nameKey="category"
                innerRadius={56}
                outerRadius={84}
                paddingAngle={2}
                stroke="none"
                onMouseEnter={(_, i) => setHovered(top[i])}
                onMouseLeave={() => setHovered(null)}
              >
                {top.map((d) => (
                  <Cell
                    key={d.category}
                    fill={catColor(d.category)}
                    opacity={hovered && hovered.category !== d.category ? 0.45 : 1}
                  />
                ))}
              </Pie>
            </PieChart>
          )}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-wider text-slate-400">{centre.label}</p>
              <p className="tnum font-display text-lg font-semibold text-navy-900">{centre.value}</p>
              {centre.sub && <p className="text-[11px] font-medium text-slate-400">{centre.sub}</p>}
            </div>
          </div>
        </div>

        <ul className="w-full space-y-1.5">
          {top.map((d) => (
            <li
              key={d.category}
              className={`flex items-center gap-2.5 rounded-lg px-1.5 py-0.5 text-[13px] transition ${
                hovered?.category === d.category ? 'bg-slate-50' : ''
              }`}
              onMouseEnter={() => setHovered(d)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ background: catColor(d.category) }}
              />
              <span className="truncate text-slate-600">{d.category}</span>
              <span className="tnum ml-auto font-medium text-navy-800">{gbp(d.amount)}</span>
              {d.pctChange !== null && Math.abs(d.pctChange) >= 10 && (
                <span
                  className={`tnum w-[52px] shrink-0 text-right text-[12px] ${
                    d.pctChange > 0 ? 'text-alert' : 'text-teal-600'
                  }`}
                >
                  {d.pctChange > 0 ? '+' : ''}
                  {Math.round(d.pctChange)}%
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
