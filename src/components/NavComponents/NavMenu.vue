<script setup lang="ts">
import gsap from 'gsap';
import { ref, watch } from 'vue';

const props = defineProps<{
	isOpen: boolean;
}>()

const emit = defineEmits<{
	menuClosed: []
}>()

const menuNumberRefs = ref<HTMLSpanElement[]>([]);
const menuTitleRefs = ref<HTMLSpanElement[]>([]);
const menuFooterRefs = ref<HTMLButtonElement[]>([]);
const menuContainerRef = ref<HTMLDivElement | null>(null);

// Function to set refs for arrays
const setMenuNumberRef = (el: any) => {
    if (el && el instanceof HTMLSpanElement && !menuNumberRefs.value.includes(el)) {
        menuNumberRefs.value.push(el);
    }
};

const setMenuTitleRef = (el: any) => {
    if (el && el instanceof HTMLSpanElement && !menuTitleRefs.value.includes(el)) {
        menuTitleRefs.value.push(el);
    }
};

const setMenuFooterRef = (el: any) => {
    if (el && el instanceof HTMLButtonElement && !menuFooterRefs.value.includes(el)) {
        menuFooterRefs.value.push(el);
    }
};

watch(() => props.isOpen, (newValue) => {
    // Kill any running animations first
    gsap.killTweensOf(menuContainerRef.value);
    gsap.killTweensOf(menuNumberRefs.value);
    gsap.killTweensOf(menuTitleRefs.value);
    gsap.killTweensOf(menuFooterRefs.value);
    
    if (newValue && menuContainerRef.value && menuNumberRefs.value && menuTitleRefs.value && menuFooterRefs.value) {
        // Container animation - match NavFilmList timing
        gsap.to(menuContainerRef.value, {
            maxHeight: '500px',
            duration: 0.8,
            ease: 'power2.out',
        });
        
        // Menu numbers reveal animation
        gsap.fromTo(menuNumberRefs.value, 
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
    
        // Menu titles reveal animation
        gsap.fromTo(menuTitleRefs.value, 
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
        
        // Footer buttons reveal animation
        gsap.fromTo(menuFooterRefs.value, 
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
    } else if (!newValue && menuContainerRef.value && menuNumberRefs.value && menuTitleRefs.value && menuFooterRefs.value) {
        // Container animation - match NavFilmList timing
        gsap.to(menuContainerRef.value, {
            maxHeight: '0',
            duration: 0.2,
            ease: 'power2.out',
            onComplete: () => {
              emit('menuClosed')
            }
        });
        
        // Reverse animations when closing
        gsap.to(menuNumberRefs.value, 
            {
                clipPath: 'inset(0 0 200% 0)',
                yPercent: 100,
                duration: 0.2,
                ease: 'power2.in',
                stagger: 0.05,
            }
        );
        
        gsap.to(menuTitleRefs.value, 
            {
                clipPath: 'inset(0 0 200% 0)',
                yPercent: 100,
                duration: 0.2,
                ease: 'power2.in',
                stagger: 0.05,
            }
        );
        
        gsap.to(menuFooterRefs.value, 
            {
                clipPath: 'inset(0 0 200% 0)',
                yPercent: 100,
                duration: 0.2,
                ease: 'power2.in',
                stagger: 0.05,
            }
        );
    }
});
</script>

<template>
	<div class="flex flex-col ticket-menu bg-primary px-6 overflow-hidden max-h-0" ref="menuContainerRef">
	            <div class="flex flex-col gap-2 my-6 nav-menu-container" >
	                <button class="flex items-baseline gap-2 cursor-pointer nav-menu-item">
	                    <div class="overflow-hidden">
	                        <span class="text-xs uppercase cursor-pointer transition-colors duration-200 block" :ref="setMenuNumberRef">01</span>
	                    </div>
	                    <div class="overflow-hidden">
	                        <span class="text-3xl font-semibold uppercase cursor-pointer transition-colors duration-200 block" :ref="setMenuTitleRef">Work</span>
	                    </div>
	                </button>
	                <button class="flex items-baseline gap-2 cursor-pointer nav-menu-item">
	                    <div class="overflow-hidden">
	                        <span class="text-xs uppercase cursor-pointer transition-colors duration-200 block" :ref="setMenuNumberRef">02</span>
	                    </div>
	                    <div class="overflow-hidden">
	                        <span class="text-3xl font-semibold uppercase cursor-pointer transition-colors duration-200 block" :ref="setMenuTitleRef">About</span>
	                    </div>
	                </button>
	                <button class="flex items-baseline gap-2 cursor-pointer nav-menu-item">
	                    <div class="overflow-hidden">
	                        <span class="text-xs uppercase cursor-pointer transition-colors duration-200 block" :ref="setMenuNumberRef">03</span>
	                    </div>
	                    <div class="overflow-hidden">
	                        <span class="text-3xl font-semibold uppercase cursor-pointer transition-colors duration-200 block" :ref="setMenuTitleRef">Contact</span>
	                    </div>
	                </button>
	            </div>
	            <hr class="border-black border-dashed -mx-6">
	            <div class="flex gap-10 max-h-20 my-6">
	                <div class="overflow-hidden">
	                    <button class="text-sm text-gray-500 uppercase cursor-pointer hover:text-black transition-colors duration-200 block" :ref="setMenuFooterRef">Cookie</button>
	                </div>
	                <div class="overflow-hidden">
	                    <button class="text-sm text-gray-500 uppercase cursor-pointer hover:text-black transition-colors duration-200 block" :ref="setMenuFooterRef">Terms</button>
	                </div>
	                <div class="overflow-hidden">
	                    <button class="text-sm text-gray-500 uppercase cursor-pointer hover:text-black transition-colors duration-200 block" :ref="setMenuFooterRef">Privacy</button>
	                </div>
	            </div>
	            <hr class="border-black border-dashed -mx-6">
	            <div class="flex flex-col ">
	                <div class="flex gap-6 items-center my-6">
	                   <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="text-gray-700 hover:text-black transition-colors">
	                       <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
	                           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
	                       </svg>
	                   </a>
	                   <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" class="text-gray-700 hover:text-black transition-colors">
	                       <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
	                           <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
	                       </svg>
	                   </a>
	                   <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" class="text-gray-700 hover:text-black transition-colors">
	                       <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
	                           <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
	                       </svg>
	                   </a>
	               </div>
	            <hr class="border-black border-dashed -mx-6">
	            </div>
	            <div class="flex justify-between my-4">
	                <div class="flex items-center gap-2">
	                    <span class="text-xs text-gray-500 uppercase">© 2024.</span>
	                    <span class="text-xs text-gray-500 uppercase">Siena film foundation</span>
	                </div>
	            </div>
	         </div>
</template>


<style scoped>

.ticket-menu {
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
    );
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}
.nav-menu-container:hover .nav-menu-item {
  color: #525455;
}

.nav-menu-container:hover .nav-menu-item:hover {
  color: #000000;
}
</style>