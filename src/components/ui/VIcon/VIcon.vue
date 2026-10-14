<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.svg-icon {
  fill: currentColor;
  vertical-align: middle;
}
</style>
