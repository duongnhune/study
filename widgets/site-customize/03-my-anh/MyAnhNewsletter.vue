<script setup lang="ts">
import { useSubscriptionForm, computed } from '#imports';

interface Country {
  value: string;
  label: string;
}

interface Props {
  formID: string;
  title: string;
  countries: Country[];
  privacyText: string;
  submitButtonText: string;
}

const props = defineProps<Props>();

const {
  form,
  formModel,
  formModelErrors,
  firstLoading,
  submitLoading,
  subscriber,
  submitForm
} = useSubscriptionForm(props.formID);

// Country select binding
const selectedCountry = computed({
  get: () => formModel.customFields['country']?.[0] || '',
  set: (val: string) => {
    formModel.customFields['country'] = [val];
  }
});

async function handleSubmit() {
  await submitForm();
}
</script>

<template>
  <div class="bz-block is-padding-top is-padding-bottom bz-block-html-content myanh-block-form" id="myanh-block-form">
    <div class="container">
      <div class="bz-box is-center">
        <div class="bz-box__title">
          <div class="bz-box__title__main">
            <div class="bz-box__title__name">{{ title }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-html-content">
            <div class="bz-form">
              <div v-if="firstLoading" class="text-center py-4">Loading...</div>
              <div v-else-if="subscriber" class="text-center py-4">
                <h4 class="mb-2">Thank you for subscribing!</h4>
                <p>We'll keep you updated with our latest news.</p>
              </div>
              <form v-else @submit.prevent="handleSubmit">
                <div class="row g-2 mb-3">
                  <div class="col-6">
                    <label class="form-label">Email</label>
                    <input class="form-control" type="email" placeholder="Email address" v-model="formModel.email"
                      :class="{ 'is-invalid': formModelErrors.email }" required>
                    <div v-if="formModelErrors.email" class="invalid-feedback d-block">{{ formModelErrors.email }}</div>
                  </div>
                  <div class="col-6">
                    <label class="form-label">Choose country</label>
                    <select class="form-select" v-model="selectedCountry" required>
                      <option value="">Select</option>
                      {{ console.log('===countries', countries) }}
                      <option v-for="country in countries" :key="country.value" :value="country.value">
                        {{ country.label }}
                      </option>
                    </select>
                    <div v-if="formModelErrors['customFields.country']" class="invalid-feedback d-block">{{
                      formModelErrors['customFields.country'] }}</div>
                  </div>
                </div>
                <div class="row g-2 mb-3">
                  <div class="col-12">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="checkDefault"
                        v-model="formModel.customFields['agree']" :true-value="['1']" :false-value="[]">
                      <label class="form-check-label" for="checkDefault">SIGN UP TO RECIEIVE EMAIL UPDATE FROM MY
                        ANH</label>
                    </div>
                    <div v-if="formModelErrors['customFields.agree']" class="invalid-feedback d-block">{{
                      formModelErrors['customFields.agree'] }}</div>
                  </div>
                </div>
                <div class="row g-2 mb-3">
                  <div class="col-12 text-center">
                    <p>{{ privacyText }}</p>
                  </div>
                </div>
                <div class="row g-2 mb-3">
                  <div class="col-12">
                    <div class="d-grid">
                      <button class="btn btn-light rounded-pill" type="submit" :disabled="submitLoading">
                        <span v-if="!submitLoading">{{ submitButtonText }}</span>
                        <span v-else>Submitting...</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myanh-block-form .bz-form {
    max-width: 380px;
    margin-left: auto;
    margin-right: auto
}

.myanh-block-form .bz-form .form-label {
    color: #000;
    font-size: 1rem;
}

.myanh-block-form .bz-form .form-check .form-check-label {
    color: #000;
}

.myanh-block-form .bz-form .form-control {
    border-left: none;
    border-right: none;
    border-top: none;
    padding-left: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0
}

.myanh-block-form .bz-form .form-select {
    border-left: none;
    border-right: none;
    border-top: none;
    padding-left: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0
}

.myanh-block-form .bz-form p {
    color: #000;
    font-size: .75rem
}

.myanh-block-form .bz-form .btn span {
    text-decoration: underline
}
</style>