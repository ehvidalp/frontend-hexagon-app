<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
    @click.self="closeModal">
    <div class="bg-white rounded-lg shadow-lg w-full h-full md:max-w-lg md:h-auto md:rounded-lg relative">

      <button @click="closeModal" class="text-gray-500 hover:text-gray-700 absolute right-4 top-2 text-xl">
        &times;
      </button>

      <div class="p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{ isOpen: boolean }>()

const emit = defineEmits<{ (e: 'close'): void }>()
const closeModal = () => emit('close')
</script>
