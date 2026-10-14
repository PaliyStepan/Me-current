<template>
  <section class="education">
    <SectionTitle text="Обучение" @animated="showRest = true" class="education__header" />
    <div
      v-if="showRest"
      class="education__grid"
    >
      <div
        v-for="education in educations"
        :key="education.title"
        class="education__item"
      >
        <a :href="education.href" target="_blank" class="education__img-wrapper">
          <img
            :src="`/images/${education.img}`"
            :alt="education.title"
            class="education__img"
          />
        </a>

        <div class="education__info">
          <div class="education__year">
            {{ education.year }}
          </div>

          <div class="education__title">
            {{ education.title }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/common/sectionTitle/SectionTitle.vue'
import { ref } from 'vue'

const showRest = ref<boolean>(false)

const educations = [
  {
    img: 'vue.jpg',
    title: 'Vue.js 3',
    description: 'Vue.js',
    year: 2023,
    href: 'https://htmlacademy.ru/levelup/vue',
  },
  {
    img: 'anima.jpg',
    title: 'WebGL' + '/' + 'Three.js',
    description: 'Vue.js',
    year: 2024,
    href: 'https://htmlacademy.ru/intensive/animation',
  },
]
</script>

<style scoped lang="scss">
.education {
  position: relative;
  $block: &;

  @media (max-width: 1200px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  &__header {
    @include section-header
  }

  &__grid {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    gap: 20px;

    @media (max-width: 768px) {
      justify-content: space-between;
    }
  }

  &__item {
    opacity: 0;
    animation: fadeIn 0.5s ease-out forwards;

    @media (max-width: 768px) {
      flex: 0 0 45%;
    }

    @media (max-width: 576px) {

    }

    &:first-child {
      animation-delay: 0.1s;
    }

    &:last-child {
      animation-delay: 0.6s;
    }
  }

  &__img-wrapper {
    display: block;
    position: relative;
    width: 300px;
    height: 415px;
    overflow: hidden;

    @media (max-width: 768px) {
      width: 100%;
      max-width: 100%;
      height: 360px;
    }

    @media (max-width: 576px) {
      height: 200px;
    }

    &:hover {
      #{$block}__img {
        transform: scale(1.2);
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
    object-position: center;
    cursor: pointer;
    transition: transform $default-transition;
  }

  &__info {
    margin-top: 30px;

    @media (max-width: 576px) {
      margin-top: 20px;
    }
  }

  &__title {
    font-size: 18px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
