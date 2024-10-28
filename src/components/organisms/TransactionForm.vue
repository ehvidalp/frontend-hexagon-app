<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import FormField from '@/components/molecules/FormField.vue';
import DynamicButton from '@/components/atoms/DynamicButton.vue';
import { DynamicButtonType } from '@/types/DynamicButton';
import { useUserAccounts } from '@/stores/userAccountsStore';
import { TypeTransaction } from '@/types/User';
import { DynamicInputType } from '@/types/DynamicInput';

const props = defineProps<{
  fromAccount: string;
  isOtherBank: boolean;
}>();

const { userAccounts, makeTransaction } = useUserAccounts();
const errorMessage = ref(''); // Mensaje de error reactivo

const validationSchema = yup.object({
  amount: yup.number().required('El monto es obligatorio').positive('Debe ser un monto positivo'),
  description: yup.string().required('La descripción es obligatoria'),
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: amount } = useField<number>('amount');
const { value: description } = useField<string>('description');
const { value: otherBankAccount } = useField<string>('otherBankAccount');

const userAccountList = computed(() =>
  userAccounts
    ?.filter(account => account.id !== props.fromAccount)
    .map(account => ({ id: account.id, name: account.name })) || []
);

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = ''; // Resetea el mensaje de error antes de la transacción
  const type: TypeTransaction = props.isOtherBank ? TypeTransaction.OTHER_BANK : TypeTransaction.TRANSFER;
  const toAccountId = props.isOtherBank ? undefined : values.otherBankAccount;

  try {
    makeTransaction(props.fromAccount, values.amount, type, toAccountId, values.description);
  } catch (error) {
    errorMessage.value = 'Fondos insuficientes para realizar esta transacción.'; // Mensaje de error en caso de excepción
    console.error('Error en la transacción:', error);
  }
});
</script>
<template>
  <div class="p-10 w-full flex items-center flex-col">
    <h1 class="font-bold text-center text-2xl mb-5">Realizar Transacción</h1>
    <section class="w-full px-5 py-7 md:max-w-md">
      <form @submit="onSubmit">
        <FormField v-model="amount" :error="errors.amount" :input-type="DynamicInputType.NUMBER" label="Monto"
          label-name="amount" />
        <FormField v-model="description" :error="errors.description" label="Descripción" label-name="description" />

        <template v-if="isOtherBank">
          <FormField v-model="otherBankAccount" :error="errors.otherBankAccount" label="Cuenta de otro banco"
            label-name="otherBankAccount" />
        </template>

        <div v-else class="mb-4">
          <label for="otherBankAccount" class="block text-gray-700 text-sm font-bold mb-2">
            Cuenta de destino
          </label>
          <select v-model="otherBankAccount" id="otherBankAccount"
            class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            :class="{ 'border-red-500': errors.otherBankAccount }">
            <option value="" disabled>Seleccione una cuenta</option>
            <option v-for="account in userAccountList" :key="account.id" :value="account.id">
              {{ account.name }}
            </option>
          </select>
          <span v-if="errors.otherBankAccount" class="text-red-500 text-xs italic">
            {{ errors.otherBankAccount }}
          </span>
        </div>

        <DynamicButton :type="DynamicButtonType.SUBMIT">
          Enviar transacción
        </DynamicButton>

        <!-- Mensaje de error en caso de fondos insuficientes -->
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
      </form>
    </section>
  </div>
</template>

<style scoped>
.form-input {
  padding: 0.5rem;
  font-size: 1rem;
  color: #333;
}
</style>
