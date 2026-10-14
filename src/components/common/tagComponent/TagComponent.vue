<template>
  <div class="tag-component">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.tag-component {
  display: flex;
  font-family: 'La Belle Aurore', cursive;
  font-size: 20px;
  line-height: 18px;
  user-select: none;
  color: var(--color-tags);
  transition: color $default-transition;
}
</style>
