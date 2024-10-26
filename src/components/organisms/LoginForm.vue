<script setup lang="ts">
import FormField from '@/components/molecules/FormField.vue';
import { DynamicInputType } from '@/types/DynamicInput';
import DynamicButton from '@/components/atoms/DynamicButton.vue';

const dynamicInputType = DynamicInputType
</script>

<template>
  <div class="p-10 w-full flex items-center flex-col">
    <h1 class="font-bold text-center text-2xl mb-5">Hexagon Bank</h1>
    <section class="bg-white shadow w-full rounded-lg  px-5 py-7 md:max-w-md">
      <FormField label="Usuario" label-name="user"></FormField>
      <FormField class="" label="Contraseña" label-name="password" :input-type="dynamicInputType.PASSWORD">
      </FormField>
      <DynamicButton>
        Iniciar sesión

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          class="w-4 h-4 inline-block">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </DynamicButton>
    </section>
  </div>

</template>
