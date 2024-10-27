<script setup lang="ts">
import IconMenu from '@/components/atoms/icons/IconMenu.vue';
import UserNotifications from '@/components/organisms/UserNotifications.vue';

const props = defineProps<{
  isSidebarOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-sidebar', value: boolean): void;
}>();

const toggleSidebar = () => {
  emit('toggle-sidebar', !props.isSidebarOpen);
};
</script>

<template>
  <section class="sticky z-10 top-0 h-16 border-b bg-white p-4 flex w-full justify-between">
    <h5 hidden class="text-lg text-left font-semibold text-gray-600 lg:block">Dashboard</h5>
    <div class="flex flex-row justify-between w-full lg:w-auto">
      <button @click="toggleSidebar" class="w-12 h-12 -mr-2 border-r lg:hidden">
        <IconMenu />
      </button>
      <div class="flex space-x-4">
        <UserNotifications />
      </div>
    </div>
  </section>
</template>
