<script setup>
import { ref, nextTick, onMounted } from 'vue';
import NavMenu from './NavComponents/NavMenu.vue'
import NavFilmList from './NavComponents/NavFilmList.vue'

const isMenuOpen = ref(false);
const isFilmListOpen = ref(false);
const filmListRef = ref(null);
const menuRef = ref(null);

const toggleMenuWithRef = () => {
    // If film list is open, close it first, then open menu after animation
    if (isFilmListOpen.value) {
        isFilmListOpen.value = false;
        nextTick(() => {
            // accessing the DOM element, not the component instance
            if (filmListRef.value && filmListRef.value.$el) {
                filmListRef.value.$el.addEventListener('transitionend', () => {
                    isMenuOpen.value = true
                }, { once: true })
            }
        });
        return
    }
    
    isMenuOpen.value = !isMenuOpen.value
}

const toggleFilmListWithRef = () => {
    // If menu is open, close it first, then open film list after animation
    if (isMenuOpen.value) {
        isMenuOpen.value = false;
        nextTick(() => {
            if (menuRef.value && menuRef.value.$el) {
                // accessing the DOM element, not the component instance
                menuRef.value.$el.addEventListener('transitionend', () => {
                    isFilmListOpen.value = true
                }, { once: true });
            }
        });
        return
    }
    
    isFilmListOpen.value = !isFilmListOpen.value;
}

</script>

<template>
         <nav class="shadow-lg relative z-10">
            <div class="flex h-28 relative ticket bg-primary border-b border-dashed"
             :class="isMenuOpen ? 'border-gray-400' : 'border-transparent'">
             <button class="w-64 flex flex-col justify-between h-full cursor-pointer border-b border-dashed" @click="toggleFilmListWithRef"
             :class="isFilmListOpen ? 'border-gray-400' : 'border-transparent'">
                <div class="flex justify-between h-full px-3 py-4">
                    <div class="inline-flex items-start gap-3">
                        <img src="/public/film_icons/pulp_fiction.png" alt="pulp fiction icon" class="w-10 h-10 aspect-square rounded-lg">
                        <span class="text-xl font-semibold text-left">Pulp Fiction</span>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700 transition-all duration-400 ease-in-out"
                        :class="isFilmListOpen ? 'rotate-180' : 'rotate-0'"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div class="flex divide-x divide-black border-t h-[33%] w-full">
                    <div class="basis-2/3 uppercase text-[0.5rem] text-gray-500 px-4 flex justify-center items-center">Feature Film</div>
                    <div class="uppercase text-[0.5rem] text-gray-500 px-4 flex justify-center items-center">2014</div>
                    <div class="uppercase text-[0.5rem] text-gray-500 px-4 flex justify-center items-center">min.109</div>
                </div>
            </button>
            <div class="h-full border-l border-black border-dashed"></div>
            <button class="w-28 h-28 flex flex-col items-center justify-center gap-1 cursor-pointer relative" @click="toggleMenuWithRef">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gray-200 transition-all duration-500" 
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
        <NavMenu ref="menuRef" :isOpen="isMenuOpen" />
        <NavFilmList ref="filmListRef" :isOpen="isFilmListOpen"  class="w-64"/>
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
</style>