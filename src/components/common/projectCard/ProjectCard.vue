<template>
  <div class="project-card">
    <a :href="link" target="_blank" class="project-card__img-wrap">
      <img :src="img" :alt="title" class="project-card__img" />
    </a>
    <div class="project-card__title">
      {{ title }}
    </div>
    <div class="project-card__description">
      {{ description }}
    </div>
    <div class="project-card__row">
      <button class="project-card__button" @click="handleAboutClick">О проекте</button>
      <a :href="link" class="project-card__button" target="_blank"> Смотреть проект </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  link: string
  title: string
  description: string
  img: string
}

interface Emits {
  (e: 'about'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleAboutClick = () => {
  emit('about')
}
</script>

<style scoped lang="scss">
.project-card {
  position: relative;

  $block: &;

  &__img-wrap {
    height: 300px;
    width: 100%;
    display: block;
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
    transition: filter 0.3s ease;

    @media (max-width: 576px) {
      margin-bottom: 16px;
      height: 230px;
    }

    &:hover {
      #{$block}__img {
        transform: scale(1.15);
        filter: grayscale(0);
      }
    }
  }

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left center;
    transition:
      transform $default-transition,
      filter $default-transition;
    filter: grayscale(1);
  }

  &__title {
    color: var(--color-green);
    font-size: 22px;
    font-weight: 700;
    line-height: 22px;
    margin-bottom: 16px;

    @media (max-width: 576px) {
      margin-bottom: 10px;
    }
  }

  &__description {
    margin-bottom: 18px;
    font-size: 16px;
    line-height: 110%;

    @media (max-width: 576px) {
      margin-bottom: 10px;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  &__button {
    font-size: 16px;
    cursor: pointer;
    transition: color $default-transition;

    &:hover {
      color: var(--color-green);
    }
  }
}
</style>
