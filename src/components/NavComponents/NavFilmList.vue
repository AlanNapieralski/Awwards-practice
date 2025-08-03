<script setup lang="ts">
import gsap from 'gsap';
import { ref, watch } from 'vue';

const props = defineProps<{
	isOpen: boolean;
}>()

const films = [
    {
        title: 'Pulp Fiction',
        icon: '/public/film_icons/pulp_fiction.png',
        active: true,
    },
    {
        title: 'The Godfather',
        icon: '/public/film_icons/the_godfather.png',
        active: false,
    },
    {
        title: 'The Dark Knight',
        icon: '/public/film_icons/the_dark_knight.png',
        active: false,
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        icon: '/public/film_icons/the_lord_of_the_rings_the_return_of_the_king.png',
        active: false,
    },
]

const filmListRef = ref<HTMLDivElement | null>(null);
const filmIconRef = ref<HTMLDivElement | null>(null);
const filmTitleRefs = ref<HTMLSpanElement[]>([]);
const filmLineRefs = ref<HTMLHRElement[]>([]);

watch(() => props.isOpen, (newValue) => {
    // Kill any running animations first
    gsap.killTweensOf(filmListRef.value);
    gsap.killTweensOf(filmIconRef.value);
    gsap.killTweensOf(filmTitleRefs.value);
    gsap.killTweensOf(filmLineRefs.value);

    if (newValue && filmIconRef.value && filmTitleRefs.value && filmListRef.value && filmLineRefs.value) {
      if (filmIconRef.value && Array.isArray(filmIconRef.value)) {
        filmIconRef.value.forEach(icon => {
          if (icon) icon.style.visibility = 'visible';
        });
      }
      
      gsap.to(filmListRef.value, {
        maxHeight: '200px',
        duration: 0.6,
        ease: 'power2.out' ,
      });

      gsap.from(filmIconRef.value, {
          xPercent: -200,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.05,
      });
      
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
      );

      gsap.to(filmLineRefs.value, {
        width: 'calc(100% + 38px)',
        duration: 0.8,
        ease: 'power2.in',
        stagger: 0.05,
      });

    } else if (!newValue && filmIconRef.value && filmTitleRefs.value && filmListRef.value && filmLineRefs.value) {
      gsap.to(filmListRef.value, {
        maxHeight: '0',
        duration: 0.2,
      });

        gsap.to(filmIconRef.value, {
            visibility: 'hidden',
            stagger: -0.05,
            ease: 'power2.in',
        });
        
        gsap.to(filmTitleRefs.value, 
            {
                clipPath: 'inset(0 0 200% 0)',
                yPercent: 100,
                duration: 0.2,
                ease: 'power2.in',
            }
        );
        
        gsap.to(filmLineRefs.value, {
            width: '0',
            duration: 0.2,
            ease: 'power2.in',
            stagger: 0.05,
        });

    }
});
</script>

<template>
    <div class="flex flex-col ticket-film-list bg-primary px-4 max-h-0 h-full overflow-hidden" ref="filmListRef">
        <div class="flex flex-col">
            <div v-for="film in films" :key="film.title" class="cursor-pointer">
                <hr class="border-gray-400 border-dashed -mx-6 w-0" ref="filmLineRefs">
                <div class="flex justify-between items-center gap-2 my-1">
                    <div class="flex items-center gap-2">
                        <img :src="film.icon" alt="pulp fiction icon" class="w-5 h-5 aspect-square rounded-xs" :class="{'border-2 border-black': film.active} " ref="filmIconRef">
                        <div class="overflow-hidden" ref="filmTitleRefs">
                            <span class="text-xs font-semibold uppercase cursor-pointer my-2 break-words line-clamp-2 max-w-[150px] block">{{ film.title }}</span>
                        </div>
                    </div>
                    <div v-if="film.active" class="w-[6px] h-[6px] aspect-square rounded-full bg-black"></div>
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
</style>