<script setup lang="ts">
import type { UserAccount } from '@/types/User';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  account: Object as () => UserAccount,
  showActions: {
    type: Boolean,
    default: true,
  },
});

const goToAccount = (id: string) => {
  router.push({ name: 'dashboard-account-detail', params: { id } });
};

</script>
<template>
  <div class="relative flex p-4 border-0 rounded-t-inherit rounded-xl bg-gray-50 w-auto">
    <div class="flex flex-col">
      <h6 class="mb-4 leading-normal text-sm">{{ account?.name }}</h6>
      <span class="mb-2 leading-tight text-xs">Número de cuenta: <span class="font-semibold text-slate-700 sm:ml-2">{{
        account?.id }}</span></span>
      <span class="leading-tight text-xs">Saldo:<span class="font-semibold text-slate-700 sm:ml-2">Q {{
        account?.currentBalance }}</span></span>
      <span class="leading-tight text-xs">Estado<span class="font-semibold text-slate-700 sm:ml-2">Activa</span></span>
      <span class="leading-tight text-xs">Apertura<span class="font-semibold text-slate-700 sm:ml-2">{{
        account?.openDate }}</span></span>
    </div>
    <div v-if="showActions" class="ml-auto text-right">
      <button type="button" @click="goToAccount(account?.id || '')"
        class="inline-block px-4 py-3 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-150 hover:scale-102 active:opacity-85 bg-x-25 text-slate-700">Ver</button>
    </div>
  </div>
</template>
