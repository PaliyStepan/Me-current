<template>
  <div class="projects">
    <SectionTitle text="Проекты" class="projects__header" @animated="showRest = true" />
    <div v-if="showRest" class="projects__buttons">
      <VButton :class="{ 'is-active': currentType === 'all' }" @click="setFilter('all')">
        Все {{ projects.length }}
      </VButton>
      <VButton
        v-for="filter in filters"
        :key="filter.type"
        :class="{ 'is-active': filter.type === currentType }"
        @click="setFilter(filter.type)"
      >
        {{ filter.name }} - {{ filteredByType(filter.type) }}
      </VButton>
    </div>

    <div v-if="showRest" class="projects__slider">
      <BasicSlider :items="filteredProjects" />
    </div>
  </div>
</template>

<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
import BasicSlider from '@/components/common/sliders/BasicSlider.vue'
import { type IProject } from '@/types/common'

import { computed, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionTitle from '@/components/common/sectionTitle/SectionTitle.vue'

const route = useRoute()
const router = useRouter()

const showRest = ref(false)

const currentType = ref('all')

const filters = [
  {
    type: 'vue',
    name: 'Vue/Nuxt',
  },
  {
    type: 'shop',
    name: 'Интернет-магазин',
  },
  {
    type: 'corporate',
    name: 'Многостраничник',
  },
  {
    type: 'edutech',
    name: 'EduTech',
  },
  {
    type: 'landing',
    name: 'Landing page',
  },
]

const projects: IProject[] = [
  {
    title: 'STT',
    description: 'Многостраничный сайт с SSR на Nuxt',
    link: 'https://stt.ru',
    img: '/images/stt.png',
    type: 'vue',
    role: [
      'Командная разработка на Vue 3, Nuxt 3',
      'Создание компонентов UI',
      'Адаптивная и кросс-браузерная вёрстка',
      'Написание бизнес-логики в т.ч. с Pinia',
      'Интеграция с API (REST)',
      'Конфигуратор автомобилей',
      'Онлайн-витрина',
      'Калькуляторы кредита и лизинга',
      'Личный кабинет с историей заказов',
    ],
  },
  {
    title: 'Loodsen.ru',
    description: 'Многостраничный сайт с SSR на Nuxt',
    link: 'https://loodsen.ru/',
    img: '/images/loodsen.png',
    role: [
      'Реализовал многостраничный сайт на Vue/Nuxt с рендерингом на сервере (SSR) для быстрой загрузки и индексации всех страниц',
      'Адаптивная и кросс-браузерная вёрстка',
      'Настройка SEO (мета-теги)',
    ],
    type: 'vue',
  },
  {
    title: 'Autoritail',
    description: 'Интернет-магазин автозапчастей, под Bitrix',
    link: 'https://autoretail.pro',
    img: '/images/autoretail.png',
    type: 'vue',
    role: [
      'Адаптивная и кросс-браузерная вёрстка',
      'Каталог товаров',
      'Полный цикл онлайн-заказа',
      'Личный кабинет с историей заказов ',
    ],
  },
  {
    title: 'Balance-ins',
    description: 'Приложение на Nuxt, для страховой компании',
    link: 'https://balance-ins.ru',
    img: '/images/balance.png',
    type: 'vue',
    role: [
      'Командная разработка на Vue 3, Nuxt 3',
      'Создание компонентов UI',
      'Написание бизнес-логики',
      'Интеграция с API (REST)',
      'Адаптивная и кросс-браузерная вёрстка',
    ],
  },
  {
    title: 'LINK',
    description: 'Единая корпоративная платформа-конструктор',
    link: 'https://loodsen.ru/products/link',
    img: '/images/link.png',
    type: 'vue',
    role: [
      'Командная разработка на Vue 3',
      'Создание компонентов UI',
      'Написание бизнес-логики',
      'Интеграция с API (REST)',
      'Адаптивная и кросс-браузерная вёрстка',
    ],
  },
  {
    title: 'Ostec-materials',
    description: 'Многостраничный сайт инжинирингового предприятия, под Bitrix',
    link: 'https://ostec-materials.ru',
    img: '/images/ostec.png',
    type: 'corporate',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
  },
  {
    title: 'DayNight',
    description: 'Интернет-магазин одежды и обуви, под Bitrix',
    link: 'https://daynight.ru',
    img: '/images/daynight.png',
    type: 'shop',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
  },
  {
    title: 'Борей',
    description: "Многостраничный сайт установки 'Борей', под Bitrix",
    link: 'https://borey-ostec.ru',
    img: '/images/borey.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'corporate',
  },
  {
    title: 'Autosew',
    description: 'Многостраничный сайт по запуску швейных производств, под Bitrix',
    link: 'https://autosew.ru',
    img: '/images/autosew.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'corporate',
  },
  {
    title: 'Just in Time Logistix',
    description: 'Лендинг логистической компании',
    link: 'https://www.jtlogistix.com',
    img: '/images/jtl.png',
    role: [
      'Адаптивная и кросс-браузерная вёрстка',
      'Написание js функционала',
      'Анимации (CSS, JavaScript, библиотеки)',
    ],
    type: 'landing',
  },
  {
    title: 'TOOFLI',
    description: 'Интернет-магазин итальянской обуви, под Bitrix',
    link: 'https://toofli.com',
    img: '/images/toofli.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'shop',
  },
  {
    title: 'Nn.gaz.ru',
    description: 'Многостраничный сайт Горьковского автозавода',
    link: 'https://nn.gaz.ru/',
    img: '/images/gazru.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'corporate',
  },
  {
    title: 'Atlant',
    description: 'Обучающая и коммуникационная платформа',
    link: 'https://modern.atlant.online',
    img: '/images/atlant.png',
    role: [
      'Командная разработка на Vue 3',
      'Создание компонентов UI',
      'Написание бизнес-логики',
      'Интеграция с API (REST)',
      'Адаптивная и кросс-браузерная вёрстка',
    ],
    type: 'vue',
  },
  {
    title: 'СибАэро',
    description: 'AI-система мониторинга обслуживания воздушных судов.',
    link: 'https://loodsen.ru/cases/ai-sistema-monitoringa-obsluzhivaniya-vozdushnykh-sudov',
    img: '/images/aero.png',
    role: [
      'Командная разработка на Vue 3',
      'Создание компонентов UI',
      'Написание бизнес-логики',
      'Интеграция с API (REST)',
      'Адаптивная и кросс-браузерная вёрстка',
    ],
    type: 'vue',
  },
  {
    title: 'LOOCH',
    description: 'Система управления проектами на Vue 3',
    link: 'https://loodsen.ru/products/sistema-upravleniya-proektami-sup',
    img: '/images/sup.png',
    role: [
      'Командная разработка на Vue 3 + nuxt-primevue',
      'Создание компонентов UI',
      'Написание бизнес-логики, в т.ч. с использованием Pinia',
      'Интеграция с API (REST)',
      'Адаптивная и кросс-браузерная вёрстка',
    ],
    type: 'vue',
  },
  {
    title: 'Cemros',
    description: 'Корпоративный портал холдинга на Vue 3',
    link: 'https://loodsen.ru/cases/korporativnyy-portal-kholdinga-tsemros',
    img: '/images/cemros.png',
    role: [
      'Командная разработка на Vue 3 + nuxt',
      'Создание компонентов UI',
      'Написание бизнес-логики',
      'Интеграция с API (REST)',
      'Адаптивная и кросс-браузерная вёрстка',
    ],
    type: 'vue',
  },
  {
    title: 'JustIngo',
    description: 'Единая цифровая платформа JustIngo для СПАО «Ингосстрах»',
    link: 'https://loodsen.ru/cases/edinaya-tsifrovaya-platforma-justingo-dlya-spao-ingosstrakh',
    img: '/images/ingos.png',
    role: [
      'Командная разработка на Vue 3',
      'Создание компонентов UI',
      'Написание бизнес-логики',
      'Интеграция с API (REST)',
      'Адаптивная и кросс-браузерная вёрстка',
    ],
    type: 'vue',
  },
  {
    title: 'Top Horse Club',
    description: 'Платформа обучения верховой езде',
    link: 'https://tophorseclub.com',
    img: '/images/horse.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'edutech',
  },
  {
    title: 'Kaino',
    description: 'Онлайн-школа 3D моделирования и визуализации',
    link: 'https://kaino.online',
    img: '/images/kaino.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'edutech',
  },
  {
    title: 'ArtEx',
    description: 'Лендинг логистической компании',
    link: 'https://artexspb.com',
    img: '/images/artex.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'landing',
  },
  // {
  //   title: 'Jtlogistix',
  //   description: 'Лендинг логистической компании',
  //   link: 'https://www.jtlogistix.com',
  //   img: '/images/jtl.png',
  //   role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
  //   type: 'landing',
  // },
  {
    title: 'Protecogroup',
    description: 'Лендинг фармацевтической компании',
    link: 'https://protecogroup.com',
    img: '/images/proteco.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'landing',
  },
  {
    title: 'Проект Холод',
    description: 'Лендинг обслуживающей компании',
    link: 'https://xn----htbbugodbckz1b.xn--p1ai',
    img: '/images/holod.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'landing',
  },
  {
    title: 'Eurasiakrep',
    description: 'Интернет-магазин крепёжной компании, под Bitrix',
    link: 'https://eurasiakrep.ru',
    img: '/images/eurazia.png',
    role: [
      'Адаптивная и кросс-браузерная вёрстка',
      'Написание js функционала',
      'Написание калькулятора',
    ],
    type: 'shop',
  },
  {
    title: 'Artdugout',
    description: 'Интернет-магазин сырного клуба, под Bitrix',
    link: 'https://artdugout.ru',
    img: '/images/cheese.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'shop',
  },
  {
    title: 'Futuroom',
    description: 'Многостраничный сайт студии дизайна и архитектуры',
    link: 'https://www.futuroom.net',
    img: '/images/futuroom.png',
    role: [
      'Адаптивная и кросс-браузерная вёрстка',
      'Написание js функционала',
      'Анимации (CSS, JavaScript, библиотеки)',
    ],
    type: 'corporate',
  },
  {
    title: 'Эко Сервис',
    description: 'Многостраничный сайт Пеллетов',
    link: 'https://pelet74.ru',
    img: '/images/eco.png',
    role: [
      'Адаптивная и кросс-браузерная вёрстка',
      'Написание js функционала',
      'Разработка опросника/квиза',
    ],
    type: 'corporate',
  },
  {
    title: 'Streloy',
    description: 'Многостраничный сайт логистической компании',
    link: 'https://streloy.ru',
    img: '/images/streloy.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'corporate',
  },
  {
    title: 'Гости Любят',
    description: 'Многостраничный сайт сети апартаментов',
    link: 'https://guests.love',
    img: '/images/gosti.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'corporate',
  },
  {
    title: 'Полифасад Термо',
    description: 'Лендинг фасадных панелей',
    link: 'https://polifasad-t.ru',
    img: '/images/poly.png',
    role: [
      'Адаптивная и кросс-браузерная вёрстка',
      'Написание js функционала',
      'Разработка опросника/квиза',
    ],
    type: 'landing',
  },
  {
    title: 'Shinhaus',
    description: 'Интернет-магазин авто товаров, под Bitrix',
    link: 'https://shinhaus.ru',
    img: '/images/shiny.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала', 'Разработка форм'],
    type: 'shop',
  },
  {
    title: 'ФСК',
    description: 'Многостраничный сайт тендерной площадки, под Bitrix',
    link: 'https://tender.fsknw.ru',
    img: '/images/fsc.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала', 'Разработка форм'],
    type: 'corporate',
  },
  {
    title: 'ГАЗ Рейд Спорт',
    description: 'Многостраничный сайт гоночной команды, под Bitrix',
    link: 'https://raidsport.gaz.ru',
    img: '/images/gaz-raid.png',
    role: [
      'Адаптивная и кросс-браузерная вёрстка',
      'Написание js функционала',
      'Анимации (CSS, JavaScript, библиотеки)',
    ],
    type: 'corporate',
  },
  {
    title: 'Icsoba',
    description: 'Многостраничный сайт научной ассоциации, под Bitrix',
    link: 'https://icsoba.org',
    img: '/images/icsoba.png',
    role: [
      'Доведение вёрстки до стандартов компании (адаптивность, кросс-браузерность)',
      'Рефакторинг и оптимизация кода после фрилансера',
      'Написание js функционала',
    ],
    type: 'corporate',
  },
  {
    title: 'Sewparts',
    description: 'Интернет-магазин швейных запчастей, под Bitrix',
    link: 'https://sewparts.ru',
    img: '/images/sewparts.png',
    role: [
      'Адаптивная и кросс-браузерная вёрстка',
      'Написание js функционала',
      'Анимации (CSS, JavaScript, библиотеки)',
    ],
    type: 'shop',
  },
  {
    title: 'Hitfitness',
    description: 'Многостраничный сайт Сети фитнес-клубов, под Bitrix',
    link: 'https://hitfitness.club',
    img: '/images/fitness.png',
    role: [
      'Адаптивная и кросс-браузерная вёрстка',
      'Написание js функционала',
      'Анимации (CSS, JavaScript, библиотеки)',
      'Разработка форм',
    ],
    type: 'corporate',
  },
  {
    title: 'РВШОМ',
    description: 'Многостраничный сайт школы остеопатической медицины',
    link: 'https://rusosteopathy.com',
    img: '/images/rvshom.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала', 'Разработка форм'],
    type: 'corporate',
  },
  {
    title: 'Glavkrep',
    description: 'Интернет-магазин крепежа, под Bitrix',
    link: 'https://glavkrep.ru',
    img: '/images/glavkrep.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала', 'Разработка форм'],
    type: 'shop',
  },
  {
    title: 'Vysota',
    description: 'Лендинг веб-студии, под Bitrix',
    link: 'https://vysota.digital',
    img: '/images/vysota.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'landing',
  },
  {
    title: 'Агентство "Консультант"',
    description: 'Лендинг агентства',
    link: 'https://pereplanirovka174.ru',
    img: '/images/adv.png',
    role: [
      'Адаптивная и кросс-браузерная вёрстка',
      'Написание js функционала',
      'Разработка опросника/квиза',
    ],
    type: 'landing',
  },
  {
    title: 'Most',
    description: 'Интернет-магазин, под Bitrix',
    link: 'https://mostpsyschool.ru',
    img: '/images/psih.png',
    role: [
      'Адаптивная и кросс-браузерная вёрстка',
      'Написание js функционала',
      'Анимации (CSS, JavaScript, библиотеки)',
    ],
    type: 'shop',
  },
  {
    title: 'МАТП города Салехарда',
    description: 'Многостраничный сайт, под Bitrix',
    link: 'https://matp-salekhard.ru',
    img: '/images/myp.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'corporate',
  },
  {
    title: 'Newtonefitness',
    description: 'Многостраничный сайт сети фитнеса, под Bitrix',
    link: 'https://newtonefitness.ru',
    img: '/images/newton.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'corporate',
  },
  {
    title: 'Aldengroup',
    description: 'Интернет-магазин, под Bitrix',
    link: 'https://aldengroup.ru/',
    img: '/images/alden.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'shop',
  },
  {
    title: 'Space four',
    description: 'Интернет-магазин, под Bitrix',
    link: 'https://spacefour.ru/',
    img: '/images/space-four.png',
    role: ['Адаптивная и кросс-браузерная вёрстка', 'Написание js функционала'],
    type: 'shop',
  },
]

const setFilter = (type: string) => {
  currentType.value = type
  if (type === 'all') {
    const { ...restParams } = route.query
    router.push({ query: restParams })
  } else {
    router.push({ query: { ...route.query, filter: type } })
  }
}

const initializeFilterFromUrl = () => {
  const filterParam = route.query.filter as string

  if (filterParam && filters.some((filter) => filter.type === filterParam)) {
    currentType.value = filterParam
  } else {
    currentType.value = 'all'
    if (filterParam) {
      const { ...restParams } = route.query
      router.replace({ query: restParams })
    }
  }
}

const filteredProjects = computed(() => {
  if (currentType.value === 'all') {
    return projects
  } else {
    return projects.filter((item) => item.type === currentType.value)
  }
})

const filteredByType = (type: string) => {
  return projects.filter((item) => item.type === type).length
}

watch(
  () => route.query.filter,
  (newFilter) => {
    if (newFilter && filters.some((filter) => filter.type === newFilter)) {
      if (currentType.value !== newFilter) {
        currentType.value = newFilter as string
      }
    } else if (!newFilter) {
      if (currentType.value !== 'all') {
        currentType.value = 'all'
      }
    }
  },
)

onMounted(() => {
  initializeFilterFromUrl()
})
</script>

<style scoped lang="scss">
.projects {
  @media (max-width: 1200px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  &__header {
    @include section-header;
    margin-bottom: 36px;

    @media (max-width: 576px) {
      margin-bottom: 0;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 30px;
    overflow: auto;

    @media (max-width: 1200px) {
      padding-bottom: 6px;
      width: auto;
      min-width: 100%;
      margin-left: -50px;
      margin-right: -50px;
      margin-bottom: 16px;
      padding-left: 50px;
      padding-right: 50px;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
  }

  &__slider {
    padding-left: 20px;

    @media (max-width: 1200px) {
      padding-left: 0;
      width: auto;
      min-width: 100%;
      margin-left: -50px;
      margin-right: -50px;
      overflow: hidden;
    }
  }
}
</style>
