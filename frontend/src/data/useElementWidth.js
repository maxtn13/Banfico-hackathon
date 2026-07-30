import { useEffect, useRef, useState } from 'react'

export function useElementWidth() {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const ro = new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width)
      setWidth((prev) => (Math.abs(prev - w) > 1 ? w : prev))
    })
    ro.observe(el)
    setWidth(Math.round(el.getBoundingClientRect().width))

    return () => ro.disconnect()
  }, [])

  return [ref, width]
}
