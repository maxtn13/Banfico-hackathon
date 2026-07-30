// import { useRef, useEffect, useCallback } from 'react'
// import { X, Download, FileImage, FileText, AlertTriangle, Repeat, Calendar, CreditCard, Hash, Tag, ArrowUpRight, ArrowDownRight } from 'lucide-react'
// import { gbp, shortDate, longDate, catColor } from '../lib/format.js'
// import html2canvas from 'html2canvas'
// import { jsPDF } from 'jspdf'

// export default function TransactionModal({ transaction, onClose }) {
//   const contentRef = useRef(null)
//   const overlayRef = useRef(null)

//   const handleKeyDown = useCallback((e) => {
//     if (e.key === 'Escape') onClose()
//   }, [onClose])

//   useEffect(() => {
//     document.addEventListener('keydown', handleKeyDown)
//     document.body.style.overflow = 'hidden'
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown)
//       document.body.style.overflow = ''
//     }
//   }, [handleKeyDown])

//   if (!transaction) return null

//   const t = transaction
//   const isCredit = t.direction === 'credit'

//   async function downloadAsPDF() {
//     const el = contentRef.current
//     if (!el) return
//     const canvas = await html2canvas(el, {
//       scale: 2,
//       backgroundColor: '#ffffff',
//       useCORS: true,
//     })
//     const imgData = canvas.toDataURL('image/png')
//     const pdf = new jsPDF('p', 'mm', 'a4')
//     const pdfWidth = pdf.internal.pageSize.getWidth()
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width
//     pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight)
//     pdf.save(`transaction-${t.transactionId}.pdf`)
//   }

//   async function downloadAsImage() {
//     const el = contentRef.current
//     if (!el) return
//     const canvas = await html2canvas(el, {
//       scale: 2,
//       backgroundColor: '#ffffff',
//       useCORS: true,
//     })
//     const link = document.createElement('a')
//     link.download = `transaction-${t.transactionId}.png`
//     link.href = canvas.toDataURL('image/png')
//     link.click()
//   }

//   return (
//     <div
//       ref={overlayRef}
//       className="fixed inset-0 z-[100] flex items-center justify-center p-4"
//       onClick={(e) => {
//         if (e.target === overlayRef.current) onClose()
//       }}
//     >
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm animate-fadeIn" />

//       {/* Modal */}
//       <div className="relative w-full max-w-lg animate-modalIn">
//         <div className="modal-glass rounded-2xl shadow-2xl overflow-hidden">
//           {/* Header strip */}
//           <div
//             className="px-6 py-5 text-white relative overflow-hidden"
//             style={{
//               background: isCredit
//                 ? 'linear-gradient(135deg, #0F8A80 0%, #17A398 50%, #22C3AF 100%)'
//                 : 'linear-gradient(135deg, #0B2135 0%, #16385A 50%, #1E4A73 100%)',
//             }}
//           >
//             <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
//             <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />

//             <div className="relative flex items-start justify-between">
//               <div>
//                 <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/60">
//                   Transaction Detail
//                 </p>
//                 <h2 className="mt-2 text-xl font-semibold tracking-tight">{t.merchant}</h2>
//                 <div className="mt-2 flex items-center gap-2">
//                   {isCredit ? (
//                     <ArrowDownRight size={16} className="text-white/80" />
//                   ) : (
//                     <ArrowUpRight size={16} className="text-white/80" />
//                   )}
//                   <span className="text-2xl font-bold tracking-tight tabular-nums">
//                     {isCredit ? '+' : '−'}{gbp(t.amount)}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={onClose}
//                 className="rounded-xl bg-white/10 p-2 text-white/70 backdrop-blur-sm transition hover:bg-white/20 hover:text-white"
//                 aria-label="Close"
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           <div ref={contentRef} className="bg-white px-6 py-5 space-y-4">
//             {/* Status badges */}
//             <div className="flex flex-wrap gap-2">
//               <span
//                 className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
//                   isCredit
//                     ? 'bg-teal-50 text-teal-700'
//                     : 'bg-slate-50 text-navy-800'
//                 }`}
//               >
//                 {isCredit ? 'Credit' : 'Debit'}
//               </span>
//               {t.isSubscription && (
//                 <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
//                   <Repeat size={11} /> Recurring
//                 </span>
//               )}
//               {t.isAnomaly && (
//                 <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
//                   <AlertTriangle size={11} /> Flagged
//                 </span>
//               )}
//               <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
//                 {t.isAnomaly ? 'Under Review' : 'Completed'}
//               </span>
//             </div>

//             {/* Detail grid */}
//             <div className="grid grid-cols-2 gap-3">
//               <DetailItem icon={Calendar} label="Date" value={longDate(t.bookingDate)} />
//               <DetailItem icon={Tag} label="Category" value={t.category} color={catColor(t.category)} />
//               <DetailItem icon={Hash} label="Transaction ID" value={t.transactionId} />
//               <DetailItem icon={CreditCard} label="Account" value={t.accountId} />
//             </div>

//             {/* Description */}
//             <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
//               <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-slate-400">Description</p>
//               <p className="mt-1.5 text-sm text-navy-800 leading-relaxed">{t.description}</p>
//             </div>

//             {/* Currency */}
//             <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-slate-400">Currency</p>
//                   <p className="mt-1.5 text-sm font-medium text-navy-800">{t.currency || 'GBP'}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-slate-400">Amount</p>
//                   <p className={`mt-1.5 text-sm font-semibold tabular-nums ${isCredit ? 'text-teal-600' : 'text-navy-800'}`}>
//                     {isCredit ? '+' : '−'}{gbp(t.amount)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Anomaly reason */}
//             {t.isAnomaly && t.anomalyReason && (
//               <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">
//                 <div className="flex items-start gap-2">
//                   <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
//                   <div>
//                     <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-amber-600">Why this was flagged</p>
//                     <p className="mt-1.5 text-sm leading-relaxed text-amber-800">{t.anomalyReason}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Footer with download buttons */}
//           <div className="bg-slate-50/80 border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-3">
//             <button
//               onClick={onClose}
//               className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 transition hover:bg-slate-50"
//             >
//               Close
//             </button>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={downloadAsImage}
//                 className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 transition hover:border-teal-400 hover:text-teal-600"
//               >
//                 <FileImage size={15} /> Image
//               </button>
//               <button
//                 onClick={downloadAsPDF}
//                 className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-teal-600 hover:to-teal-700"
//               >
//                 <Download size={15} /> PDF
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function DetailItem({ icon: Icon, label, value, color }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
//       <div className="flex items-center gap-1.5">
//         <Icon size={12} className="text-slate-400" />
//         <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-slate-400">{label}</p>
//       </div>
//       <p className="mt-1.5 text-sm font-medium text-navy-800 truncate" title={value}>
//         {color && (
//           <span className="mr-1.5 inline-block h-2 w-2 rounded-sm" style={{ background: color }} />
//         )}
//         {value}
//       </p>
//     </div>
//   )
// }


import { useRef, useEffect, useCallback } from 'react'
import { X, Download, FileImage, FileText, AlertTriangle, Repeat, Calendar, CreditCard, Hash, Tag, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { gbp, shortDate, longDate, catColor } from '../lib/format.js'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export default function TransactionModal({ transaction, onClose }) {
  const captureRef = useRef(null)
  const closeBtnRef = useRef(null)
  const overlayRef = useRef(null)

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  if (!transaction) return null

  const t = transaction
  const isCredit = t.direction === 'credit'

  async function captureReceipt() {
    const el = captureRef.current
    if (!el) return null
    const btn = closeBtnRef.current
    const prevVisibility = btn?.style.visibility
    if (btn) btn.style.visibility = 'hidden'
    try {
      return await html2canvas(el, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      })
    } finally {
      if (btn) btn.style.visibility = prevVisibility || ''
    }
  }

  async function downloadAsPDF() {
    const canvas = await captureReceipt()
    if (!canvas) return
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight)
    pdf.save(`transaction-${t.transactionId}.pdf`)
  }

  async function downloadAsImage() {
    const canvas = await captureReceipt()
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `transaction-${t.transactionId}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm animate-fadeIn" />

      <div className="relative w-full max-w-lg animate-modalIn">
        <div className="modal-glass rounded-2xl shadow-2xl overflow-hidden">
          <div ref={captureRef}>
            <div
              className="px-6 py-5 text-white relative overflow-hidden"
              style={{
                background: isCredit
                  ? 'linear-gradient(135deg, #0F8A80 0%, #17A398 50%, #22C3AF 100%)'
                  : 'linear-gradient(135deg, #0B2135 0%, #16385A 50%, #1E4A73 100%)',
              }}
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />

              <div className="relative flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/60">
                    Transaction Detail
                  </p>
                  <h2 className="mt-2 truncate text-xl font-semibold tracking-tight">{t.merchant}</h2>
                  <div className="mt-2 flex items-center gap-2">
                    {isCredit ? (
                      <ArrowDownRight size={16} className="text-white/80" />
                    ) : (
                      <ArrowUpRight size={16} className="text-white/80" />
                    )}
                    <span className="text-2xl font-bold tracking-tight tabular-nums">
                      {isCredit ? '+' : '−'}{gbp(t.amount)}
                    </span>
                  </div>
                </div>

                <button
                  ref={closeBtnRef}
                  onClick={onClose}
                  className="shrink-0 rounded-xl bg-white/10 p-2 text-white/70 backdrop-blur-sm transition hover:bg-white/20 hover:text-white"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="bg-white px-6 py-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    isCredit
                      ? 'bg-teal-50 text-teal-700'
                      : 'bg-slate-50 text-navy-800'
                  }`}
                >
                  {isCredit ? 'Credit' : 'Debit'}
                </span>
                {t.isSubscription && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    <Repeat size={11} /> Recurring
                  </span>
                )}
                {t.isAnomaly && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    <AlertTriangle size={11} /> Flagged
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  {t.isAnomaly ? 'Under Review' : 'Completed'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <DetailItem icon={Calendar} label="Date" value={longDate(t.bookingDate)} />
                <DetailItem icon={Tag} label="Category" value={t.category} color={catColor(t.category)} />
                <DetailItem icon={Hash} label="Transaction ID" value={t.transactionId} wrap />
                <DetailItem icon={CreditCard} label="Account" value={t.accountId} wrap />
              </div>

              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-slate-400">Description</p>
                <p className="mt-1.5 text-sm text-navy-800 leading-relaxed">{t.description}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-slate-400">Currency</p>
                    <p className="mt-1.5 text-sm font-medium text-navy-800">{t.currency || 'GBP'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-slate-400">Amount</p>
                    <p className={`mt-1.5 text-sm font-semibold tabular-nums ${isCredit ? 'text-teal-600' : 'text-navy-800'}`}>
                      {isCredit ? '+' : '−'}{gbp(t.amount)}
                    </p>
                  </div>
                </div>
              </div>

              {t.isAnomaly && t.anomalyReason && (
                <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-amber-600">Why this was flagged</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-amber-800">{t.anomalyReason}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-50/80 border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 transition hover:bg-slate-50"
            >
              Close
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={downloadAsImage}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 transition hover:border-teal-400 hover:text-teal-600"
              >
                <FileImage size={15} /> Image
              </button>
              <button
                onClick={downloadAsPDF}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-teal-600 hover:to-teal-700"
              >
                <Download size={15} /> PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ icon: Icon, label, value, color, wrap = false }) {
  return (
    <div className="min-w-0 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
      <div className="flex items-center gap-1.5">
        <Icon size={12} className="shrink-0 text-slate-400" />
        <p className="truncate text-[11px] font-semibold uppercase tracking-[.14em] text-slate-400">{label}</p>
      </div>
      <p
        className={`mt-1.5 text-sm font-medium text-navy-800 ${wrap ? 'break-all' : 'truncate'}`}
        title={value}
      >
        {color && (
          <span className="mr-1.5 inline-block h-2 w-2 shrink-0 rounded-sm" style={{ background: color }} />
        )}
        {value}
      </p>
    </div>
  )
}