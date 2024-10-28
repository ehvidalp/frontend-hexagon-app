<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { TypeTransaction, type UserTransaction } from '@/types/User'

const props = defineProps<{
  transactions: UserTransaction[]
}>()

const formattedTransactions = computed(() => {
  return props.transactions.map(transaction => {
    const isExpense = transaction.type === TypeTransaction.WITHDRAWAL || transaction.type === TypeTransaction.OTHER_BANK || transaction.type === TypeTransaction.TRANSFER
    const sign = isExpense ? '-' : '+'
    const amount = `${sign} Q ${transaction.amount.toLocaleString()}`

    const colorClasses = isExpense
      ? 'from-red-600 to-rose-400 text-red-600 border-red-600'
      : 'from-green-600 to-lime-400 text-lime-500 border-lime-500'

    return {
      ...transaction,
      amount,
      colorClasses,
      formattedDate: new Intl.DateTimeFormat('es-GT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(new Date(transaction.date))
    }
  })
})
</script>

<template>
  <div class="w-full flex pl-5 flex-col mt-6 max-w-3xl">
    <h6>Tus Transacciones</h6>
    <h6 class="mb-4 font-bold leading-tight uppercase text-xs text-slate-500 mt-8">Último corte</h6>
    <ul class="flex flex-col pl-0 mb-0">
      <li v-for="transaction in formattedTransactions" :key="transaction.description"
        class="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">

        <div class="flex items-center">
          <div
            :class="`leading-pro ease-soft-in text-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid ${transaction.colorClasses} bg-transparent text-center align-middle font-bold uppercase transition-all hover:opacity-75`">
          </div>
          <div class="flex flex-col">
            <h6 class="mb-1 leading-normal text-sm text-slate-700">{{ transaction.description }}</h6>
            <span class="leading-tight text-xs">{{ transaction.formattedDate }}</span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center">
          <p
            :class="`relative z-10 inline-block m-0 font-semibold leading-normal text-transparent bg-gradient-to-tl ${transaction.colorClasses} text-sm bg-clip-text`">
            {{ transaction.amount }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
