<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import CardAccount from '@/components/organisms/CardAccount.vue';
import { useUserAccounts } from '@/stores/userAccountsStore';
import DynamicText from '@/components/atoms/DynamicText.vue';
import { DynamicTextType } from '@/types/DynamicText';

const userAccountsStore = useUserAccounts();;
const { userAccounts } = storeToRefs(userAccountsStore);
const { getUserAccounts } = userAccountsStore;

onMounted(async () => {
  if (!userAccounts.value || userAccounts.value.length === 0) {
    await getUserAccounts();
  }
});
</script>

<template>
  <div class="relative flex flex-col min-w-0 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">

    <DynamicText :tag="DynamicTextType.H2" class="ml-6">
      Cuentas asociadas
    </DynamicText>
    <section class="flex p-4 w-full">
      <ul class="flex flex-row pl-0 mb-0 rounded-lg flex-wrap w-full gap-2">
        <li v-for="account in userAccounts" :key="account.id" class="w-full xl:max-w-xl">
          <CardAccount :account="account" />
        </li>
      </ul>
    </section>
  </div>
</template>
