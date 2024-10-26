<script setup lang="ts">
import type { DynamicButtonType } from '@/types/DynamicButton';
import { type PropType } from 'vue';

defineProps({
  type: {
    type: String as PropType<DynamicButtonType>,
    required: false,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// Definimos los eventos que el componente puede emitir
const emit = defineEmits<{
  (e: 'click'): void;
}>();

// Función para manejar el clic y emitir el evento 'click'
const handleClick = () => {
  emit('click');
};
</script>

<template>
  <button :type="type" :disabled="disabled" @click="handleClick"
    class="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center">
    <slot></slot>
  </button>
</template>
