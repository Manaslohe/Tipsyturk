import { useEffect } from 'react'

export default function useScrollAnimation(options = {}) {
  useEffect(() => {
    // Initialize intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      })
    }, {
      threshold: 0.1,
      ...options
    })

    // Observe elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}
