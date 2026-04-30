import { useEffect, useRef } from 'react'

export function useFadeIn<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    el.style.opacity = '0'
    el.style.transform = 'translateY(8px)'
    el.style.transition = 'opacity 400ms ease-out, transform 400ms ease-out'

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
