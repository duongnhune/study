import type { Form, Subscriber } from '@breezingin/breezing-shared';
import { ref, reactive, onMounted } from 'vue';

type FormModel = {
  formID: string;
  name: string;
  email: string;
  customFields: Record<string, string[]>;
};

export function useSubscriptionForm(formID: string) {
  const { $api } = useNuxtApp();

  // State
  const form = ref<Form | null>(null);
  const subscriber = ref<Subscriber | null>(null);
  const firstLoading = ref(true);
  const submitLoading = ref(false);
  const formModelErrors = ref<Record<string, string>>({});

  // Form model
  const formModel = reactive<FormModel>({
    formID,
    name: '',
    email: '',
    customFields: {}
  });

  // Methods
  async function loadData(): Promise<Form | null> {
    firstLoading.value = true;
    try {
      // Load form
      const formData = await $api<Form>(`/form/${formID}`);
      form.value = formData;

      // Initialize custom fields with empty arrays
      if (formData.formFields) {
        formData.formFields.forEach(field => {
          if (!formModel.customFields[field.key]) {
            formModel.customFields[field.key] = [];
          }
        });
      }

      return formData;
    } catch (error) {
      console.error('Failed to load data', error);
      return null;
    } finally {
      firstLoading.value = false;
    }
  }

  async function submitForm(): Promise<Subscriber | null> {
    submitLoading.value = true;
    formModelErrors.value = {};
    
    try {
      const data = await $api<Subscriber>('/form-subscription', {
        method: 'POST',
        body: formModel
      });
      
      subscriber.value = data;
      return data;
    } catch (error: any) {
      formModelErrors.value = error.data?.details || {};
      return null;
    } finally {
      submitLoading.value = false;
    }
  }

  function resetForm(): FormModel {
    formModel.name = '';
    formModel.email = '';
    formModel.customFields = {};
    
    // Re-initialize custom fields
    if (form.value?.formFields) {
      form.value.formFields.forEach(field => {
        formModel.customFields[field.key] = [];
      });
    }
    
    formModelErrors.value = {};
    subscriber.value = null;
    
    return formModel;
  }

  // Initialize
  onMounted(() => loadData());

  return {
    // State
    form,
    formModel,
    formModelErrors,
    firstLoading,
    submitLoading,
    subscriber,
    
    // Methods
    submitForm,
    resetForm,
    loadData
  };
} 