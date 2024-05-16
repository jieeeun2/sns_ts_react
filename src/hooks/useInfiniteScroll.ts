import { useEffect, useMemo, useRef } from 'react'

const useInfiniteScroll = <L extends HTMLLIElement>(onIntersect: () => void) => {
  const lastElementRef = useRef<L>(null)

  const onScroll = useMemo(
    () => (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lastElementRef.current && observer.unobserve(lastElementRef.current)
          onIntersect()
        }
      })
    },
    [onIntersect],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(onScroll)

    lastElementRef.current && observer.observe(lastElementRef.current)
    return () => observer.disconnect()
  }, [onScroll])

  return { lastElementRef }
}

export default useInfiniteScroll
