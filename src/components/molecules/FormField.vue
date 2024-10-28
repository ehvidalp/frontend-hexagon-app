<script lang="ts" setup>
import { type PropType, computed } from 'vue';
import DynamicInput from '../atoms/DynamicInput.vue';
import DynamicText from '../atoms/DynamicText.vue';
import type { DynamicInputType } from '@/types/DynamicInput';
import { DynamicTextType } from '@/types/DynamicText';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  labelName: {
    type: String,
    required: false,
    default: '',
  },
  inputType: {
    type: String as PropType<DynamicInputType>,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  error: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const inputClasses = computed(() =>
  props.error ? 'border-red-600 focus:border-red-700 hover:border-red-700' : 'border-gray-300 focus:border-blue-600'
);
const labelClasses = computed(() => (props.error ? 'text-red-700' : 'text-gray-700'));
</script>

<template>
  <div class="flex flex-col">
    <DynamicText :tag="DynamicTextType.LABEL" :class="labelClasses">
      {{ label }}
    </DynamicText>

    <DynamicInput :type="inputType" :name="labelName" :placeholder="placeholder" :value="modelValue"
      @input="handleInput" :class="`mt-1 p-2 rounded ${inputClasses}`" />

  </div>
</template>
