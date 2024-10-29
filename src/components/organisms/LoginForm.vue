<script setup lang="ts">
import FormField from '@/components/molecules/FormField.vue';
import DynamicButton from '@/components/atoms/DynamicButton.vue';
import IconArrow from '@/components/atoms/icons/IconArrow.vue';
import { useUserStore } from '@/stores/userStore';
import { useForm, useField } from 'vee-validate';
import { ref } from 'vue';
import { DynamicInputType } from '@/types/DynamicInput';
import { DynamicButtonType } from '@/types/DynamicButton';
import type { UserLoginForm } from '@/types/User';
import { loginValidationSchema } from '@/schemas/loginFormSchemas';
import { useRouter } from 'vue-router';

const isLoading = ref(false);
const router = useRouter();
const { login, userInformation } = useUserStore(); // Asegúrate de que el store tenga el estado actualizado del usuario

const { handleSubmit, errors } = useForm<UserLoginForm>({
  validationSchema: loginValidationSchema,
});

const { value: user } = useField<string>('user');
const { value: password } = useField<string>('password');

const onSubmit = handleSubmit(async (userLoginForm: UserLoginForm) => {
  isLoading.value = true;
  try {
    // Realiza el login
    await login(userLoginForm);

      router.push({ name: 'dashboard-accounts' });

  } catch (error) {
    console.error('Error de login:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="p-10 w-full flex items-center flex-col">
    <h1 class="font-bold text-center text-2xl mb-5">Hexagon Bank</h1>
    <section class="bg-white shadow w-full rounded-lg px-5 py-7 md:max-w-md">
      <form @submit="onSubmit">
        <FormField v-model="user" :error="errors.user" label="Usuario" label-name="user" />
        <FormField v-model="password" :error="errors.password" label="Contraseña" label-name="password"
          :input-type="DynamicInputType.PASSWORD" />
        <DynamicButton :type="DynamicButtonType.SUBMIT" :disabled="isLoading">
          Iniciar sesión
          <IconArrow class="ml-4" />
        </DynamicButton>
      </form>
    </section>
  </div>
</template>
