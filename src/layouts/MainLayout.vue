<script setup lang="ts">
import { shallowRef } from 'vue';
import MainSidebar from '@/components/organisms/MainSidebar.vue';
import MainNavbar from '@/components/organisms/MainNavbar.vue';

const isSidebarOpen = shallowRef(false);

const toggleSidebar = (value: boolean) => {
  isSidebarOpen.value = value;
};
</script>

<template>
  <MainSidebar :isSidebarOpen="isSidebarOpen" />
  <div class="ml-auto mb-6 2xl:w-[85%] xl:w-[80%] lg:w-[75%] w-full">
    <MainNavbar @toggle-sidebar="toggleSidebar($event)" :isSidebarOpen="isSidebarOpen" />
    <main class="px-6 pt-6 2xl:container">
      <RouterView />
    </main>
  </div>
</template>
