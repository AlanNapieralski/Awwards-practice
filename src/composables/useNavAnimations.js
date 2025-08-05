import gsap from 'gsap'

export function useNavAnimations() {
  const animateNavElements = (isOpen, refs) => {
    const {
      filmIconRef,
      titleRef,
      arrowIconRef,
      horizontalLineRef,
      verticalLineRef1,
      verticalLineRef2,
      featureFilmRef,
      yearRef,
      durationRef
    } = refs

    // Kill any running animations first
    gsap.killTweensOf(filmIconRef.value)
    gsap.killTweensOf(titleRef.value)
    gsap.killTweensOf(arrowIconRef.value)
    gsap.killTweensOf(horizontalLineRef.value)
    gsap.killTweensOf(verticalLineRef1.value)
    gsap.killTweensOf(verticalLineRef2.value)
    gsap.killTweensOf(featureFilmRef.value)
    gsap.killTweensOf(yearRef.value)
    gsap.killTweensOf(durationRef.value)

    const tl = gsap.timeline()

    if (isOpen) {
      // Animate out when menu opens
      tl.to(filmIconRef.value, {
        xPercent: -200,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(titleRef.value, {
        yPercent: -200,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(arrowIconRef.value, {
        rotate: 180,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(horizontalLineRef.value, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(verticalLineRef1.value, {
        scaleY: 0,
        transformOrigin: "center bottom",
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(verticalLineRef2.value, {
        scaleY: 0,
        transformOrigin: "center bottom",
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(featureFilmRef.value, {
        yPercent: 200,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(yearRef.value, {
        yPercent: 200,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(durationRef.value, {
        yPercent: 200,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
    } else {
      // Animate back when menu closes
      tl.to(filmIconRef.value, {
        xPercent: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(titleRef.value, {
        yPercent: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(arrowIconRef.value, {
        rotate: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(horizontalLineRef.value, {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(verticalLineRef1.value, {
        scaleY: 1,
        transformOrigin: "center bottom",
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(verticalLineRef2.value, {
        scaleY: 1,
        transformOrigin: "center bottom",
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(featureFilmRef.value, {
        yPercent: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(yearRef.value, {
        yPercent: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(durationRef.value, {
        yPercent: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
    }
  }

  return {
    animateNavElements
  }
} 