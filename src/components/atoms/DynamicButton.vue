<script setup lang="ts">
import type { DynamicButtonType } from '@/types/DynamicButton';
import { defineProps, defineEmits, computed, type PropType } from 'vue';

const props = defineProps({
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
  variant: {
    type: String as PropType<'default' | 'transparent'>,
    required: false,
    default: 'default',
  },
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};

const variantClasses = computed(() => {
  return props.variant === 'default'
    ? 'bg-blue-500 text-white'
    : 'bg-transparent text-gray-500';
});

const hoverClasses = computed(() => {
  return 'hover:bg-blue-600 hover:text-white';
});

const focusClasses = 'focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50';
const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed';
</script>

<template>
  <button :type="type" :disabled="disabled" @click="handleClick" :class="[
    'w-full py-2.5 rounded-lg text-sm font-semibold text-center flex justify-center items-center transition duration-200',
    variantClasses,
    hoverClasses,
    focusClasses,
    disabledClasses,
  ]">
    <slot></slot>
  </button>
</template>
