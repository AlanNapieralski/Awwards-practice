import { onMounted } from 'vue'
import gsap from 'gsap'

export function useHoverMask() {
  const setupHoverAnimation = (elementRef, className = 'hover-mask') => {
    if (elementRef.value) {
      // Set initial state
      gsap.set(elementRef.value, { '--mask-clip': 'inset(100% 0 0 0)' })
      
      elementRef.value.addEventListener('mouseenter', () => {
        gsap.fromTo(elementRef.value, 
          { '--mask-clip': 'inset(100% 0 0 0)' },
          { '--mask-clip': 'inset(0 0 0 0)', duration: 0.3, ease: 'power2.out' }
        )
      })
      
      elementRef.value.addEventListener('mouseleave', () => {
        gsap.to(elementRef.value, {
          '--mask-clip': 'inset(100% 0 0 0)',
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    }
  }

  const setupMultipleHoverAnimations = (elementRefs, className = 'hover-mask') => {
    if (elementRefs.value) {
      elementRefs.value.forEach((elementRef) => {
        // Find the parent element with the mask class
        const maskElement = elementRef.closest(`.${className}`)
        if (maskElement) {
          // Set initial state
          gsap.set(maskElement, { '--mask-clip': 'inset(100% 0 0 0)' })
          
          maskElement.addEventListener('mouseenter', () => {
            gsap.fromTo(maskElement, 
              { '--mask-clip': 'inset(100% 0 0 0)' },
              { '--mask-clip': 'inset(0 0 0 0)', duration: 0.3, ease: 'power2.out' }
            )
          })
          
          maskElement.addEventListener('mouseleave', () => {
            gsap.to(maskElement, {
              '--mask-clip': 'inset(100% 0 0 0)',
              duration: 0.3,
              ease: 'power2.out'
            })
          })
        }
      })
    }
  }

  return {
    setupHoverAnimation,
    setupMultipleHoverAnimations
  }
} 