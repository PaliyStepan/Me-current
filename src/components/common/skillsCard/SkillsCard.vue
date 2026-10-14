<template>
  <div class="skills-card">
    <div class="skills-card__inner">
      <div class="skills-card__visible">
        <img
          v-if="isImage"
          :src="`/images/${icon}.svg`"
          :alt="icon"
          class="skills-card__icon"
        />

        <VIcon v-else :name="icon" class="skills-card__icon" />
        <div class="skills-card__title">
          {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VIcon from '@/components/ui/VIcon/VIcon.vue'

defineProps<Props>()

interface Props {
  title: string
  icon: string
  isImage?: boolean
}
</script>

<style scoped lang="scss">
.skills-card {
  position: relative;
  border: 1px solid var(--color-green);
  padding: 20px;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__visible {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 60px;
    height: 60px;
  }
}
</style>
