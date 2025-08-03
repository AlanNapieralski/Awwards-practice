<script setup lang="ts">
defineProps<{
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
</script>

<template>
    <div class="flex flex-col ticket-film-list bg-primary px-4 transition-all duration-800 ease-in-out overflow-hidden"
    :style="isOpen ? 'max-height: 500px;' : 'max-height: 0;'">
        <div class="flex flex-col">
            <div v-for="film in films" :key="film.title" class="cursor-pointer">
                <div class="flex justify-between items-center gap-2 my-1">
                    <div class="flex items-center gap-2">
                        <img :src="film.icon" alt="pulp fiction icon" class="w-5 h-5 aspect-square rounded-xs" :class="{'border-2 border-black': film.active}">
                        <span class="text-xs font-semibold uppercase cursor-pointer my-2 break-words line-clamp-2 max-w-[150px]">{{ film.title }}</span>
                    </div>
                    <div v-if="film.active" class="w-[6px] h-[6px] aspect-square rounded-full bg-black"></div>
                </div>
                <hr class="border-gray-400 border-dashed -mx-6">
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