<script setup lang="ts">
import FormField from '@/components/molecules/FormField.vue';
import { DynamicInputType } from '@/types/DynamicInput';
import { DynamicButtonType } from '@/types/DynamicButton';
import DynamicButton from '@/components/atoms/DynamicButton.vue';
import { ref } from 'vue';
import IconArrow from '../icons/IconArrow.vue';

const dynamicInputType = DynamicInputType
const dynamicButtonType = DynamicButtonType

const isLoading = ref(false);

const onLogin = () => {
  console.log('entry here')
  isLoading.value = true;
  // Simulate a loading process
  setTimeout(() => {
    isLoading.value = false;
  }, 2000); // 2 seconds
};

</script>

<template>
  <div class="p-10 w-full flex items-center flex-col">
    <h1 class="font-bold text-center text-2xl mb-5">Hexagon Bank</h1>
    <section class="bg-white shadow w-full rounded-lg  px-5 py-7 md:max-w-md">
      <FormField label="Usuario" label-name="user"></FormField>
      <FormField class="" label="Contraseña" label-name="password" :input-type="dynamicInputType.PASSWORD">
      </FormField>
      <DynamicButton @click="onLogin" :type="dynamicButtonType.SUBMIT" :disabled="isLoading">
        Iniciar sesión
        <IconArrow class="ml-4" />

      </DynamicButton>
    </section>
  </div>

</template>

<style scoped lang="css">
/* Animación personalizada para hacer el spinner más dinámico */
@keyframes spin-fast {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(720deg);
  }
}

.animate-spin-fast {
  animation: spin-fast 1s linear infinite;
}
</style>
