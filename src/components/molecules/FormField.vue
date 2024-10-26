<script lang="ts" setup>
import { type PropType } from 'vue';
import DynamicInput from '../atoms/DynamicInput.vue';
import DynamicText from '../atoms/DynamicText.vue';
import type { DynamicInputType } from '@/types/DynamicInput';
import { DynamicTextType } from '@/types/DynamicText';

const dynamicTextType = DynamicTextType.LABEL;

defineProps({
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
    type: String,
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
</script>

<template>
  <div class="flex flex-col">

    <DynamicText :tag="dynamicTextType">
      {{ label }}
    </DynamicText>

    <DynamicInput :type="inputType" :name="labelName" :placeholder="placeholder" :value="modelValue"
      @input="handleInput" />
  </div>
</template>
