<script setup lang="ts">
import type { DynamicTextType } from '@/types/DynmaicText';
import { type PropType } from 'vue';

defineProps({
  tag: {
    type: String as PropType<DynamicTextType>,
    required: false,
    default: 'spam',
  },

});
</script>

<template>
  <component :is="tag" class="font-semibold text-sm text-gray-600">
    <slot />
  </component>
</template>
