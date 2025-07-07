<script lang="ts" setup>
const props = defineProps({
  widgetID: {
    type: String,
    required: true
  }
});

function select(event: Event) {
  event.stopPropagation();

  window.parent.postMessage(JSON.stringify({
    type: "add-widget-request",
    data: {
      targetScopedID: props.widgetID
    }
  }), "*");
}

</script>
<template>
  <div class="add-widget" @click.stop @mouseenter.stop @mousemove.stop>
    <button class="add-widget__button" @click="select">
      <span class="material-symbols-outlined add-widget__icon">add</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.bi {
  text-align: center;
  width: 16px;
  height: 16px;

  &::before {
    font-weight: 700 !important;
  }
}

.add-widget {
  position: relative;
  display: flex;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  justify-content: center;

  &__icon {
    font-size: 20px;
    margin: 0;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: 50%;
    background-color: #FE5B00;
    color: white;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: #FF8C42;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>