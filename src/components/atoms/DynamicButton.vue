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
</script>

<template>
  <button :type="type"
    class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">

    <slot></slot>
  </button>
</template>
