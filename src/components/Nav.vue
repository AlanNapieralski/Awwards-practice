<script setup>
import { ref, watch, onMounted } from 'vue';
import gsap from 'gsap';
import NavMenu from './NavComponents/NavMenu.vue'
import NavFilmList from './NavComponents/NavFilmList.vue'

const isMenuOpen = ref(false)
const isFilmListOpen = ref(false)
const filmListRef = ref(null)
const menuRef = ref(null)
const shouldOpenFilmList = ref(false)
const shouldOpenMenu = ref(false)


// main button animation refs
const filmIconRef = ref(null)
const titleRef = ref(null)
const arrowIconRef = ref(null)
const horizontalLineRef = ref(null)
const verticalLineRef1 = ref(null)
const verticalLineRef2 = ref(null)
const featureFilmRef = ref(null)
const yearRef = ref(null)
const durationRef = ref(null)
const burgerButtonRef = ref(null)



const toggleMenuWithRef = () => {
    // If film list is open, close it first, then open menu after animation
    if (isFilmListOpen.value) {
        shouldOpenMenu.value = true
        isFilmListOpen.value = false
        return
    }
    
    isMenuOpen.value = !isMenuOpen.value;
}

const toggleFilmListWithRef = () => {
    if (isMenuOpen.value) {
        // Set flag to open film list after menu closes
        shouldOpenFilmList.value = true;
        isMenuOpen.value = false;
        return;
    }
    
    isFilmListOpen.value = !isFilmListOpen.value;
}

const handleMenuClosed = () => {
    // If we were waiting to open film list, do it now
    if (shouldOpenFilmList.value) {
        gsap.delayedCall(0.2, () => {
            isFilmListOpen.value = true
            shouldOpenFilmList.value = false
        })
    }
}

const handleFilmListClosed = () => {
    // If we were waiting to open menu, do it now
    if (shouldOpenMenu.value) {
        gsap.delayedCall(0.2, () => {
            isMenuOpen.value = true
            shouldOpenMenu.value = false
        })
    }
}

watch(() => isMenuOpen.value, (newValue) => {
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
        
    if (newValue) {
        // Animate out when menu opens
        const tl = gsap.timeline()
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
            duration: 0.5,
            ease: 'power2.inOut'
        }, 0)
        .to(verticalLineRef1.value, {
            scaleY: 0,
            duration: 0.5,
            ease: 'power2.inOut'
        }, 0)
        .to(verticalLineRef2.value, {
            scaleY: 0,
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
        const tl = gsap.timeline()
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
            duration: 0.5,
            ease: 'power2.inOut'
        }, 0)
        .to(verticalLineRef1.value, {
            scaleY: 1,
            duration: 0.5,
            ease: 'power2.inOut'
        }, 0)
        .to(verticalLineRef2.value, {
            scaleY: 1,
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
})

// Add hover functionality for burger button
const setupBurgerHoverAnimation = () => {
    if (burgerButtonRef.value) {
        // Set initial state - completely hidden (clipped from bottom)
        gsap.set(burgerButtonRef.value, { '--mask-clip': 'inset(100% 0 0 0)' })
        
        burgerButtonRef.value.addEventListener('mouseenter', () => {
            gsap.fromTo(burgerButtonRef.value, 
                { '--mask-clip': 'inset(100% 0 0 0)' },
                { '--mask-clip': 'inset(0 0 0 0)', duration: 0.3, ease: 'power2.out' }
            )
        })
        
        burgerButtonRef.value.addEventListener('mouseleave', () => {
            gsap.to(burgerButtonRef.value, {
                '--mask-clip': 'inset(100% 0 0 0)',
                duration: 0.3,
                ease: 'power2.out'
            })
        })
    }
}

onMounted(() => {
    setupBurgerHoverAnimation()
})
</script>

<template>
         <nav class="shadow-lg absolute top-1/3 left-1/2 transform -translate-x-1/2 z-10">
            <div class="flex h-28 relative ticket bg-primary border-b border-dashed"
             :class="isMenuOpen ? 'border-gray-400' : 'border-transparent'">
             <button class="w-64 flex flex-col justify-between h-full cursor-pointer" @click="toggleFilmListWithRef">
                <div class="flex justify-between h-full px-3 py-4">
                    <div class="inline-flex gap-3">
                        <img src="/public/film_icons/pulp_fiction.png" alt="pulp fiction icon" class="w-10 h-10 aspect-square rounded-lg" ref="filmIconRef">
                        <span class="text-xl font-semibold text-left" ref="titleRef">Pulp Fiction</span>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700" ref="arrowIconRef"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <hr class="divide-black border-t" ref="horizontalLineRef">
                <div class="flex h-8 w-full">
                    <div class="basis-2/3 uppercase text-[0.5rem] text-gray-500 px-4 flex justify-center items-center" ref="featureFilmRef">Feature Film</div>
                    <hr class="divide-black border-r h-full" ref="verticalLineRef1">
                    <div class="uppercase text-[0.5rem] text-gray-500 px-4 flex justify-center items-center" ref="yearRef">2014</div>
                    <hr class="divide-black border-r h-full" ref="verticalLineRef2">
                    <div class="uppercase text-[0.5rem] text-gray-500 px-4 flex justify-center items-center" ref="durationRef">min.109</div>
                </div>
            </button>
            <div class="h-full border-l border-black border-dashed"></div>
            <button class="w-28 h-28 flex flex-col items-center justify-center gap-1 cursor-pointer relative burger-button-mask" ref="burgerButtonRef" @click="toggleMenuWithRef">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full transition-all duration-500" 
                 :style="isMenuOpen ? 'max-height: 500px' : 'max-height: 0'"></div>
                <div class="relative w-full h-full flex flex-col justify-center items-center">
                    <span
                         class="block w-12 h-0.5 bg-gray-600 transition-all duration-800 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                         :style="isMenuOpen ? 'transform: rotate(-45deg)' : 'transform: translateY(-8px)'"
                     ></span>
                     <span
                         class="block w-12 h-0.5 bg-gray-600 transition-all duration-800 ease-in-out"
                         :style="isMenuOpen ? 'width: 0; opacity: 0' : 'width: 3rem; opacity: 1'"
                     ></span>
                     <span
                         class="block w-12 h-0.5 bg-gray-600 transition-all duration-800 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                         :style="isMenuOpen ? 'transform: rotate(45deg)' : 'transform: translateY(8px)'"
                     ></span>
                    
                </div>
             </button>
        </div>
        <NavMenu ref="menuRef" :isOpen="isMenuOpen" @menuClosed="handleMenuClosed" class="relative w-full z-20" />
        <NavFilmList ref="filmListRef" :isOpen="isFilmListOpen" @filmListClosed="handleFilmListClosed" class="relative w-64 z-20"/>
    </nav>
</template>


<style scoped>
.ticket {
  -webkit-mask-image: radial-gradient(
      circle 10px at 0px 0px,
      transparent 10px,
      #000 0
    ),
    radial-gradient(
      circle 10px at calc(100% - 0px) 0px,
      transparent 10px,
      #000 0
    ),
    radial-gradient(
      circle 10px at 0px calc(100% - 0px),
      transparent 10px,
      #000 0
    ),
    radial-gradient(
      circle 10px at calc(100% - 0px) calc(100% - 0px),
      transparent 10px,
      #000 0
    ),
    /* Top half circle at the divider */
    radial-gradient(
      circle 10px at calc(100% - 112px) 0px,
      transparent 10px,
      #000 0
    ),
    /* Bottom half circle at the divider */
    radial-gradient(
      circle 10px at calc(100% - 112px) calc(100% + 0px),
      transparent 10px,
      #000 0
    );
  mask-image: radial-gradient(
      circle 10px at 0px 0px,
      transparent 10px,
      #000 0
    ),
    radial-gradient(
      circle 10px at calc(100% - 0px) 0px,
      transparent 10px,
      #000 0
    ),
    radial-gradient(
      circle 10px at 0px calc(100% - 0px),
      transparent 10px,
      #000 0
    ),
    radial-gradient(
      circle 10px at calc(100% - 0px) calc(100% - 0px),
      transparent 10px,
      #000 0
    ),
    /* Top half circle at the divider */
    radial-gradient(
      circle 10px at calc(100% - 112px) 0px,
      transparent 10px,
      #000 0
    ),
    /* Bottom half circle at the divider */
    radial-gradient(
      circle 10px at calc(100% - 112px) calc(100% + 0px),
      transparent 10px,
      #000 0
    );
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}

.film-title-mask {
  --mask-clip: inset(100% 0 0 0);
}

.film-title-mask::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(156, 163, 175, 0.2);
  pointer-events: none;
  clip-path: var(--mask-clip);
}

.burger-button-mask {
  --mask-clip: inset(100% 0 0 0);
}

.burger-button-mask::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(156, 163, 175, 0.2);
  pointer-events: none;
  clip-path: var(--mask-clip);
}
</style>