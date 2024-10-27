<script setup lang="ts">
import DynamicButton from '@/components/atoms/DynamicButton.vue';
import IconDashboard from '@/components/atoms/icons/IconDashboard.vue';
import IconProfile from '@/components/atoms/icons/IconProfile.vue';
import IconCard from '@/components/atoms/icons/IconCard.vue';
import IconMenu from '@/components/atoms/icons/IconMenu.vue';
import { shallowRef } from 'vue';

const isSidebarOpen = shallowRef(false);

const menuItems = shallowRef([
  { name: 'Dashboard', icon: IconDashboard, route: '/dashboard' },
  { name: 'Accounts', icon: IconCard, route: '/accounts' },
  { name: 'Profile', icon: IconProfile, route: '/profile' },
]);

const logout = () => {
  console.log('Logout');
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <!-- Sidebar -->
  <aside :class="[
    'fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300',
    'md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]',
    isSidebarOpen ? 'ml-0' : 'ml-[-100%] lg:ml-0',
  ]">
    <div class="mt-24">
      <div class="mt-8 text-center">
        <img src="https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
          alt="profile picture" class="w-20 h-20 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
        <h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
          {{ 'Name of user' }}
        </h5>
        <span class="hidden text-gray-400 lg:block">{{ 'mail@mail.com' }}</span>
      </div>

      <ul class="space-y-2 tracking-wide mt-8">
        <li v-for="(item, index) in menuItems" :key="index">
          <DynamicButton variant="transparent">
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            <div class="w-2/5 text-left">
              {{ item.name }}
            </div>
          </DynamicButton>
        </li>
      </ul>
    </div>


  </aside>

  <!-- Main Content -->
  <div :class="['ml-auto mb-6', '2xl:w-[85%] xl:w-[80%] lg:w-[75%] w-full']">
    <div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
      <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
        <h5 hidden class="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
        <button @click="toggleSidebar" class="w-12 h-16 -mr-2 border-r lg:hidden">
          <IconMenu />
        </button>
        <div class="flex space-x-4">
          <!-- Search bar and other icons -->
        </div>
      </div>
    </div>

    <div class="px-6 pt-6 2xl:container">
      <h1>CONTENT</h1>
    </div>
  </div>
</template>
