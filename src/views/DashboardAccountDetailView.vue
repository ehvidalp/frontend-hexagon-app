<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserAccounts } from '@/stores/userAccounts'
import { type UserAccount } from '@/types/User';
import DigitalCard from '@/components/molecules/DigitalCard.vue';
import CardAccount from '@/components/organisms/CardAccount.vue';
import TransactionsTable from '@/components/organisms/TransactionsTable.vue';

const route = useRoute()
const router = useRouter()
const { getAccountById, getUserAccounts } = useUserAccounts()

const accountId = route.params.id as string
const account = ref<UserAccount | null>(null)

onMounted(async () => {
  await getUserAccounts();
  account.value = getAccountById(accountId) ?? null
  if (!account.value) {
    router.push({ name: 'dashboard-accounts' })
  }
});

</script>

<template>
  <div v-if="account" class="flex gap-4 flex-wrap">
    <CardAccount :account="account" :show-actions="false" class="mr-40" />
    <DigitalCard />
    <TransactionsTable :transactions="account?.transactions || []" />

  </div>
  <div v-else>
    Loading account details...
  </div>
</template>
