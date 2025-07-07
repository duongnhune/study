<script setup lang="ts">
import { onMounted, ref } from '#imports';
import { useSubscriptionForm } from '#imports';

declare var bootstrap: any;

let modal: any;

const props = defineProps<{
  formID: string;
  buttonText: string;
  modalTitle: string;
}>();

const {
  form,
  formModel,
  formModelErrors,
  firstLoading,
  submitLoading,
  subscriber,
  resetForm,
  submitForm
} = useSubscriptionForm(props.formID);

const isSuccess = ref(false);

async function handleSubmit() {
  const result = await submitForm();
  if (result) {
    isSuccess.value = true;
  }
}

function close() {
  isSuccess.value = false;
  resetForm();
}

onMounted(() => {
  modal = new bootstrap.Modal('#pre-order-information-modal');
});
</script>

<template>
  <div class="bz-block is-padding-bottom bz-block-html-content myanh-block-cta" id="myanh-block-cta">
    <div class="container">
      <div class="bz-html-content">
        <div class="text-center">
          <a class="bz-cta-button" href="#" data-bs-toggle="modal" data-bs-target="#pre-order-information-modal">
            {{ buttonText }}
          </a>
        </div>
      </div>
    </div>
    <div class="modal fade" id="pre-order-information-modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">{{ modalTitle }}</h1>
            <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="firstLoading" class="loading">
              Loading...
            </div>
            <div v-else-if="subscriber" class="success">
              <h3 class="mb-3">Thank you for your pre-order!</h3>
              <p>We'll keep you updated with our latest news.</p>
            </div>
            <div v-else class="bz-form">
              <div class="row mb-3">
                <div class="col-12">
                  <form-input v-model="formModel.name" label="Name" :error="formModelErrors.name" placeholder="Enter your name" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12">
                  <form-input v-model="formModel.email" label="Email" :error="formModelErrors.email" placeholder="Enter your email" />
                </div>
              </div>
              <div class="row mb-3" v-for="field in form?.formFields" :key="field.id">
                <div class="col-12">
                  <form-custom-field v-model="formModel.customFields[field.key]" :field="field" :error="formModelErrors[`customFields.${field.key}`]" :placeholder="field.description || 'Enter your answer'" />
                </div>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <div class="d-grid">
              <button v-if="!isSuccess" class="btn btn-light rounded-pill text-uppercase" type="button" @click="handleSubmit"
                :disabled="submitLoading">
                {{ submitLoading ? 'Submitting...' : 'Pre-order' }}
              </button>
              <button v-else class="btn btn-light rounded-pill text-uppercase" type="button" @click="close">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  text-align: center;
  padding: 2rem;
}

.success {
  text-align: center;
  padding: 2rem;
  color: #4CAF50;
}

.myanh-block-cta a.bz-cta-button {
    text-decoration: underline;
    color: #000;
    font-size: 16px;
}

@media (min-width: 768px) {
    .myanh-block-cta a.bz-cta-button {
        font-size: 18px
    }
}
</style>