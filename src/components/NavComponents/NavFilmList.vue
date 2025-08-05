<script setup lang="ts">
import gsap from 'gsap';
import { ref, watch, onMounted } from 'vue';
import { useHoverMask } from '../../composables/useHoverMask'
import { films } from '../../data/films'

const props = defineProps<{
	isOpen: boolean;
}>()

const emit = defineEmits<{
	filmListClosed: []
}>()

const filmListRef = ref<HTMLDivElement | null>(null)
const filmIconRef = ref<HTMLDivElement | null>(null)
const filmTitleRefs = ref<HTMLSpanElement[]>([])
const filmLineRefs = ref<HTMLHRElement[]>([])

const { setupMultipleHoverAnimations } = useHoverMask()

watch(() => props.isOpen, (newValue) => {
    // Kill any running animations first
    gsap.killTweensOf(filmListRef.value)
    gsap.killTweensOf(filmIconRef.value)
    gsap.killTweensOf(filmTitleRefs.value)
    gsap.killTweensOf(filmLineRefs.value)

    if (newValue && filmIconRef.value && filmTitleRefs.value && filmListRef.value && filmLineRefs.value) {
      if (filmIconRef.value && Array.isArray(filmIconRef.value)) {
        filmIconRef.value.forEach(icon => {
          if (icon) icon.style.visibility = 'visible';
        })
      }
      
      gsap.to(filmListRef.value, {
        maxHeight: '400px',
        duration: 0.6,
        ease: 'power2.out' ,
      })

      gsap.fromTo(filmIconRef.value, {
          xPercent: -200,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.05,
      }, {
        xPercent: 0,
      })
      
      gsap.fromTo(filmTitleRefs.value, 
          {
              clipPath: 'inset(0 0 200% 0)',
              yPercent: 100,
          },
          {
              clipPath: 'inset(0 0 0% 0)',
              yPercent: 0,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.05,
          }
      )
        gsap.to(filmLineRefs.value, {
            width: 'calc(100% + 38px)',
            duration: 0.8,
            ease: 'power2.in',
            stagger: 0.05,
        })

        // Setup hover animations after opening
        gsap.delayedCall(0.8, () => setupMultipleHoverAnimations(filmTitleRefs, 'film-title-mask'))

    } else if (!newValue && filmIconRef.value && filmTitleRefs.value && filmListRef.value && filmLineRefs.value) {
      gsap.to(filmListRef.value, {
        maxHeight: '0',
        duration: 0.2,
        onComplete: () => {
          emit('filmListClosed');
        }
      })

        gsap.to(filmIconRef.value, {
            visibility: 'hidden',
            stagger: -0.05,
            ease: 'power2.in',
        })
        
        gsap.to(filmTitleRefs.value, 
            {
                clipPath: 'inset(0 0 200% 0)',
                yPercent: 100,
                duration: 0.2,
                ease: 'power2.in',
            }
        )
        
        gsap.to(filmLineRefs.value, {
            width: '0',
            duration: 0.2,
            ease: 'power2.in',
            stagger: 0.05,
        })

    }
})
</script>

<template>
    <div class="flex flex-col ticket-film-list bg-primary max-h-0 h-full overflow-hidden" ref="filmListRef">
        <div class="flex flex-col">
          <!-- Film List Items -->
            <div v-for="film in films" :key="film.title" class="cursor-pointer">
                <hr class="border-gray-400 border-dashed -mx-6 w-0" ref="filmLineRefs">
                <div class="flex justify-between items-center py-1 px-4 film-title-mask relative group">
                    <button class="flex items-center gap-2">
                        <img :src="film.icon" alt="pulp fiction icon" class="w-5 h-5 aspect-square rounded-xs" :class="{'border-2 border-black': film.active} " ref="filmIconRef">
                        <div class="overflow-hidden" ref="filmTitleRefs">
                            <span class="text-xs font-semibold uppercase my-2 text-left break-words line-clamp-2 max-w-[150px]">{{ film.title }}</span>
                        </div>
                    </button>
                    <!-- Arrow Icon -->
                    <div class="h-6 w-6 aspect-square border-1 border-dashed rounded-sm flex items-center justify-center hover:bg-black hover:border-white invisible group-hover:visible group/small">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-700 group-hover/small:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <!-- Active Button Indicator -->
                    <div v-if="film.active" class="absolute right-4 w-[5px] h-[5px] aspect-square rounded-full bg-black group-hover:opacity-0 transition-opacity duration-200 ease-in-out"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.ticket-film-list {
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
    );
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}

.film-title-mask {
  position: relative;
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
</style>