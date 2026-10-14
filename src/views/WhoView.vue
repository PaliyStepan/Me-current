<template>
  <section class="who">
    <SectionTitle text="Кто я" @animated="showRest = true" class="who__header" />
    <div v-if="showRest" class="who__grid">
      <div
        v-for="(item, idx) in about"
        :key="idx"
        v-html="item"
        class="who__item"
        :style="{ animationDelay: `${idx * 0.1}s` }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/common/sectionTitle/SectionTitle.vue'
import { ref } from 'vue'

const showRest = ref<boolean>(false)

const about = [
  'Приветствую!',
  'Меня зовут Степан, мне 38 лет.',
  'Я родом из Норильска. 19 лет жил в Санкт-Петербурге и теперь уже 3 года живу в Тюмени.',
  'В веб разработке более 8 лет.',
  'Участвовал в создании больше 57 проектов с нуля.',
  'Мой стек — Html/Pug, Css/Scss, Vue 2/3, Nuxt, TypeScript.',
  'Нравится верстать и оживлять вёрстку данными и логикой.',
  'Верю, что интерфейс должен быть не только удобным, но и красивым.',
  'Веду активный образ жизни, тренажерка, бассейн, лонгборд, ролики, гитара.',
  'Могу сыграть на гитаре - иногда даже на дейликах.',
  'Моя суперсила: доводить проекты до конца.',
  'Мой основной подход в работе - <span>делай, как для себя</span>.',
]
</script>

<style scoped lang="scss">
.who {
  position: relative;

  @media (max-width: 1200px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  &__header {
    @include section-header
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item {
    opacity: 0;
    animation: fadeInUp 0.5s ease-out forwards;
    font-size: 20px;
    line-height: 23px;
    font-weight: 300;


    @media (max-width: 1200px) {
      font-size: 16px;
      line-height: 20px;
    }


    :deep(span) {
      font-weight: 400;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
