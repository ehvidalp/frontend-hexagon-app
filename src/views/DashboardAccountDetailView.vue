<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserAccounts } from '@/stores/userAccountsStore'
import { type UserAccount } from '@/types/User';
import DigitalCard from '@/components/molecules/DigitalCard.vue';
import CardAccount from '@/components/organisms/CardAccount.vue';
import TransactionsTable from '@/components/organisms/TransactionsTable.vue';
import DynamicButton from '@/components/atoms/DynamicButton.vue';
import ModalCard from '@/components/organisms/ModalCard.vue';
import TransactionForm from '@/components/organisms/TransactionForm.vue';

const route = useRoute()
const router = useRouter()
const { getAccountById, getUserAccounts } = useUserAccounts()

const accountId = route.params.id as string
const account = ref<UserAccount | null>(null)
const showModal = ref({
  value: false,
  isOtherBank: false,
})

onMounted(async () => {
  await getUserAccounts();
  account.value = getAccountById(accountId) ?? null
  if (!account.value) {
    router.push({ name: 'dashboard-accounts' })
  }
});

const setShowingModal = (showModalData: { value: boolean, isOtherBank: boolean }) => {
  showModal.value = showModalData
}

</script>

<template>
  <div v-if="account" class="flex gap-4 flex-wrap">
    <section class="w-96 flex flex-col justify-center">
      <CardAccount :account="account" :show-actions="false" />
      <div class="flex flex-col gap-2 md:flex-row">
        <DynamicButton @click="setShowingModal({ value: true, isOtherBank: false })">
          Transferir
        </DynamicButton>
        <DynamicButton @click="setShowingModal({ value: true, isOtherBank: true })">
          Transferir a terceros
        </DynamicButton>
      </div>
    </section>
    <ModalCard :is-open="showModal.value" @close="setShowingModal({ value: $event ?? false, isOtherBank: false })">
      <TransactionForm :from-account="account?.id || ''" :is-other-bank="showModal.isOtherBank" />
    </ModalCard>
    <DigitalCard />
    <TransactionsTable :transactions="account?.transactions || []" />
  </div>
  <div v-else>
    Loading account details...
  </div>
</template>
