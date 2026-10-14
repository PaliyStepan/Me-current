<!-- components/experience/Experience.vue -->
<template>
  <section class="experience">
    <SectionTitle text="Мой опыт" @animated="showRest = true" class="experience__header" />

    <div v-if="showRest" class="experience__content">
      <TimeLine :items="experience" />
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/common/sectionTitle/SectionTitle.vue'
import TimeLine from '@/components/common/timeLine/TimeLine.vue'
import { ref } from 'vue'

const showRest = ref<boolean>(false)

const experience = [
  {
    yearStart: '2023',
    yearEnd: '2026',
    name: 'ИТ-компания Лоция',
    link: 'https://loodsen.ru/',
    position: 'Middle frontend-developer',
    duties: [
      'Ведение и разработка внешних и внутренних продуктов: SaaS-решения для B2B-сектора (CRM, админ-панели, корпоративные порталы) и B2C-проекты (интернет-магазины, публичные сайты)',
      'Разработка на Vue 2/3 (Options API, Composition API), Nuxt 2/3, TypeScript, Pinia. Написание composable',
      'Разработка на React, Hooks, Next.js (Pages Router, App Router), TypeScript, Redux Toolkit, ReactUse. Написание кастомных хуков',
      'Проектирование фронтенд-архитектуры на основе FSD и Atomic Design, создание как кастомных переиспользуемых UI-компонентов, так и работа с готовыми UI-библиотеками (PrimeVue, Element Plus, Vuetify, Material-UI), а также Vee-validate, VueUse, Vue-final-modal, E-charts (vue-echarts), Swiper, i18n',
      'Ведение релизного цикла: проведение релизов, мерж собственных и чужих веток, разрешение конфликтов, доставка кода на стенды (dev, stage, prod)',
      'Интеграция с REST API',
      'TypeScript: типизация компонентов, событий (emit), запросов и ответов от API',
      'Вёрстка интерфейсов: HTML5, CSS3/SCSS, адаптивная и кроссбраузерная вёрстка по макетам Figma (pixel perfect)',
      'Оптимизация и рефакторинг существующего кода',
      'Согласование API с бэкендом, построение процессов с дизайнерами',
      'Участие в планировании спринтов, оценка и декомпозиция задач',
      'Менторство junior-разработчиков: код-ревью, онбординг, помощь в сложных задачах',
      'Реализация бизнес-логики: ролевые модели, динамические и пошаговые формы, личные кабинеты, оформление заказов, витрины, конфигураторы, дашборды, отчёты с экспортом в офисные форматы, работа с большими таблицами',
      'Написание unit-тестов (Vitest) для компонентов и бизнес-логики',
    ],
    progress: [
      'Участвовал в 16 проектах: 12 — на Vue, 4 — на React. В 10 проектах прошёл полный цикл: от архитектуры до деплоя. 6 проектов — поддержка и рефакторинг легаси-кода',
      'Разработал внешний сайт компании на Vue 3/Nuxt 3: <a href="https://loodsen.ru/" target="_blank">https://loodsen.ru/</a>',
      'Провел миграцию двух проектов с Vue 2 на Vue 3 (перевел с Vuex на Pinia и с Webpack на Vite)',
      'Совместно с командой разработал UI-библиотеку для внутренних проектов на Vue',
    ],
  },
  {
    yearStart: '2022',
    yearEnd: '2023',
    name: 'ИТ-компания Лоция',
    link: 'https://loodsen.ru/',
    position: 'Junior+ frontend-developer',
    duties: [
      'Разработка на Vue 2 (Vuex), Vue 3 (Composition API) + Nuxt 3 + TypeScript + Pinia',
      'Верстка и адаптация сложных таблиц, форм, модальных окон',
      'Разработка переиспользуемых UI-компонентов для Vue 2 (Options API)/Vue 3 (Composition API)',
      'Интеграция с REST API (axios, fetch)',
      'Поддержка и доработка legacy-проектов на Vue 2',
      'Верстка html-писем',
      'Коммуникация с бэкендом для уточнения и настройки API-контрактов',
      'Выстраивание флоу с дизайнерами',
      'Участие в планировании спринтов, оценка и декомпозиция задач',
    ],
    progress: [
      'Участвовал в полном цикле разработки 5 проектов: от архитектуры до деплоя (vue2/3, nuxt)',
      'Перевел 35+ компонентов с Options API на Composition API',
      'Прошел курс по vue 3 и получил сертификат «Vue.js 3. Разработка клиентских приложений»',
    ],
  },
  {
    yearStart: '2021',
    yearEnd: '2022',
    name: 'Digital агенство Wispo',
    link: 'https://www.wispo.ru/',
    position: 'Старший верстальщик',
    duties: [
      'Адаптивная и кроссбраузерная верстка/modex',
      'Написание логики на vanilla js',
      'Подключение плагинов/библиотек swiper/select/slick/bootstrap',
      'Рефакторинг legacy-кода',
      'Обучение младших верстальщиков (код-ревью, best practices)',
      'Верстка html-писем',
    ],
    progress: [
      'Сверстал с нуля 12+ проектов (интернет магазины, лендинги, корпоративные сайты)',
      'Довел junior верстальщика до middle',
    ],
  },
  {
    yearStart: '2020',
    yearEnd: '2021',
    name: 'Digital студия Braind',
    link: 'https://braind.agency/',
    position: 'Старший верстальщик',
    duties: [
      'Адаптивная и кроссбраузерная верстка',
      'Написание логики на vanilla js',
      'Обучение младших верстальщиков (код-ревью, best practices)',
      'Верстка html-писем',
    ],
    progress: [
      'Сверстал с нуля 10+ проектов (интернет магазины, лендинги, корпоративные сайты)',
      'Получил опыт в работе с командой, где есть свой style guide',
      'Осуществил поддержку и доработку более 20 чужих проектов',
    ],
  },
  {
    yearStart: '2018',
    yearEnd: '2020',
    name: 'Digital-маркетинг студия Высота',
    link: 'https://vysota.digital/',
    position: 'Верстальщик',
    duties: [
      'Адаптивная и кроссбраузерная верстка/modex',
      'Написание логики на vanilla js/jQuery',
      'Подключение плагинов/библиотек swiper/select/slick/bootstrap',
      'Рефакторинг legacy-кода',
      'Верстка html-писем',
    ],
    progress: [
      'Сверстал с нуля 25+ проектов (интернет магазины, лендинги, корпоративные сайты, обучающие платформы)',
      'Осуществил поддержку и доработку более 14 чужих проектов',
    ],
  },
]
</script>

<style scoped lang="scss">
.experience {
  @media (max-width: 1200px) {
    padding-left: 50px;
    padding-right: 20px;
  }

  &__header {
    @include section-header;

    @media (max-width: 1200px) {
      position: static !important;
      margin-right: -20px;
    }
  }

  &__content {
    @media (max-width: 1200px) {
      width: auto;
      margin-left: -10px;
    }
  }
}
</style>
