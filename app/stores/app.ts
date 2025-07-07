import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const isPreviewMode = ref(false);

  function setIsPreviewMode(value: boolean) {
    isPreviewMode.value = value;
  }

  function getIsPreviewMode() {
    return isPreviewMode.value;
  }

  return {
    isPreviewMode,
    setIsPreviewMode,
    getIsPreviewMode,
  };
});
