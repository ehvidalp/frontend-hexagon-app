<script setup lang="ts">
import { shallowRef } from 'vue';
import IconDashboard from '@/components/atoms/icons/IconDashboard.vue';
import IconProfile from '@/components/atoms/icons/IconProfile.vue';
import IconCard from '@/components/atoms/icons/IconCard.vue';
import DynamicButton from '../atoms/DynamicButton.vue';
import { useUserStore } from '@/stores/userStore';

defineProps({
  isSidebarOpen: Boolean,
});
const { userInformation } = useUserStore();
// const { name, lastName, email, image } = userInformation;
const menuItems = shallowRef([
  { name: 'Dashboard', icon: IconDashboard, route: '/dashboard' },
  { name: 'Cuentas', icon: IconCard, route: '/accounts' },
  { name: 'Perfil', icon: IconProfile, route: '/profile' },
]);

</script>
<template>
  <aside :class="[
    'fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300',
    'md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]',
    isSidebarOpen ? 'ml-0' : 'ml-[-100%] lg:ml-0',
  ]">
    <div class="mt-24">
      <div class="mt-8 text-center">
        <img :src="userInformation?.image" alt="profile picture"
          class="w-20 h-20 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
        <h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
          {{ userInformation?.name + ' ' + userInformation?.lastName }}
        </h5>
        <span class="hidden text-gray-400 lg:block">{{ userInformation?.email }}</span>
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
</template>
