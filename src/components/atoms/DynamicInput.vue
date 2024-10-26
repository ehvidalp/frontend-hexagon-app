<script setup lang="ts">
import type { DynamicInputType } from '@/types/DynamicInput';
import { type PropType } from 'vue';

defineProps({
  placeholder: String,
  type: {
    type: String as PropType<DynamicInputType>,
    default: 'text',
  },
  name: {
    type: String,
    default: '',
    required: false,
  },
  modelValue: String,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <input :type="type" :name="name" :placeholder="placeholder" :value="modelValue" @input="handleInput"
    class=" border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
</template>
