<template>
  <li class="relative flex items-center pr-2" ref="dropdownRef">

    <button type="button" @click="toggleDropdown"
      class="block p-0 transition-all text-sm ease-nav-brand text-slate-500 relative focus:outline-none"
      aria-haspopup="true">
      <IconBell />
    </button>

    <!-- Menú desplegable de notificaciones -->
    <transition name="fade">
      <ul v-if="isOpen"
        class="mt-10 text-sm transform-dropdown lg:shadow-soft-3xl duration-250 min-w-44 absolute right-0 top-0 z-50 origin-top list-none rounded-lg bg-white px-2 py-4 text-left text-slate-500 opacity-100 transition-all sm:-mr-6 lg:mt-2">
        <li v-for="(notification, index) in notifications" :key="index" class="relative mb-2">
          <a href="javascript:;"
            class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700">
            <div class="flex py-1">
              <div class="my-auto">
                <img v-if="notification.imgSrc" :src="notification.imgSrc"
                  class="inline-flex items-center justify-center mr-4 text-white text-sm h-9 w-9 max-w-none rounded-xl" />
                <div v-else
                  class="inline-flex items-center justify-center my-auto mr-4 text-white transition-all duration-200 ease-nav-brand text-sm h-9 w-9 rounded-xl"
                  :class="notification.iconBgClass">
                  <!-- SVG Icono -->
                  <svg width="12px" height="12px" viewBox="0 0 43 36" xmlns="http://www.w3.org/2000/svg">
                    <!-- Contenido del SVG -->
                  </svg>
                </div>
              </div>
              <div class="flex flex-col justify-center">
                <h6 class="mb-1 font-normal leading-normal text-sm">
                  <span class="font-semibold">{{ notification.title }}</span>
                  {{ notification.message }}
                </h6>
                <p class="mb-0 leading-tight text-xs text-slate-400">
                  <i class="mr-1 fa fa-clock"></i>
                  {{ notification.time }}
                </p>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </transition>
  </li>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import IconBell from '../atoms/icons/IconBell.vue';

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Datos de las notificaciones
const notifications = ref([
  {
    // imgSrc: require('@/assets/img/team-2.jpg'),
    title: 'New message',
    message: ' from Laur',
    time: '13 minutes ago',
  },
  {
    // imgSrc: require('@/assets/img/small-logos/logo-spotify.svg'),
    title: 'New album',
    message: ' by Travis Scott',
    time: '1 day',
  },
  {
    imgSrc: '',
    iconBgClass: 'bg-gradient-to-tl from-slate-600 to-slate-300',
    title: '',
    message: 'Payment successfully completed',
    time: '2 days',
  },
]);

// Cerrar el menú al hacer clic fuera
const clickOutside = (event: MouseEvent) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', clickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutside);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
