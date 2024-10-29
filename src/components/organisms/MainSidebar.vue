<script setup lang="ts">
import { shallowRef, computed } from 'vue';
import IconProfile from '@/components/atoms/icons/IconProfile.vue';
import IconCard from '@/components/atoms/icons/IconCard.vue';
import DynamicButton from '../atoms/DynamicButton.vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter, useRoute } from 'vue-router';


defineProps({
  isSidebarOpen: Boolean,
});
const { userInformation, clearUser } = useUserStore();
const router = useRouter();
const route = useRoute();
const menuItems = shallowRef([
  { name: 'Cuentas', icon: IconCard, route: 'dashboard-accounts' },
  { name: 'Perfil', icon: IconProfile, route: 'dashboard-profile' },
]);

const onMenuItemClick = (routeName: string) => {
  router.push({ name: routeName });
};

const getButtonVariant = (itemRoute: string) => {
  return computed(() => (route.name === itemRoute ? 'transparent-active' : 'transparent'));
};

const logout = () => {
  clearUser();
  router.push({ name: 'login' });
};

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
          <DynamicButton :variant="getButtonVariant(item.route).value" @click="onMenuItemClick(item.route)">
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            <div class="w-2/5 text-left">
              {{ item.name }}
            </div>
          </DynamicButton>
        </li>
        <li class="absolute bottom-0 w-5/6 ">
          <DynamicButton variant="transparent" @click="logout">
            Cerrar Sesion
          </DynamicButton>
        </li>
      </ul>
    </div>
  </aside>
</template>
