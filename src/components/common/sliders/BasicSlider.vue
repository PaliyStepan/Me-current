<template>
  <div class="slider-basic" :class="{ 'is-anim': anim }">
    <Swiper
      :breakpoints="sliderOptions.breakpoints"
      :key="items.length"
      :navigation="sliderOptions.navigation"
      :modules="sliderOptions.modules"
      auto-height
      :loop="sliderOptions.loop"
      class="slider-basic__swiper"
      @swiper="onSwiper"
    >
      <SwiperSlide
        v-for="project in items"
        :key="project.title"
        class="slider-basic__slide"
      >
        <ProjectCard
          :title="project.title"
          :link="project.link"
          :img="project.img"
          :description="project.description"
          @about="onAboutClick(project)"
        />
      </SwiperSlide>
    </Swiper>

    <button class="slider-basic__button slider-basic__button--prev jsSliderButtonPrev" aria-label="Previous slide">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <button class="slider-basic__button slider-basic__button--next jsSliderButtonNext" aria-label="Next slide">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>


  <ModalBase
    v-model="showModal"
    :title="currentProject.title"
    :description="currentProject.description"
    :role="currentProject.role"
    :link="currentProject.link"
  >
  </ModalBase>
</template>

<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { SwiperOptions } from 'swiper/types'
import type { Swiper as SwiperType } from 'swiper'
import { type IProject } from '@/types/common'
import ProjectCard from '@/components/common/projectCard/ProjectCard.vue'
import 'swiper/css'
import { onMounted, ref, watch, nextTick } from 'vue'
import ModalBase from '@/components/common/modal/ModalBase.vue'


defineSlots<{
  default(): unknown
}>()

interface Props {
  items: IProject[]
}

const anim = ref(false)
const swiperInstance = ref<SwiperType | null>(null)

const props = defineProps<Props>()
const showModal = ref(false)

const sliderOptions: SwiperOptions = {
  breakpoints: {
    0: {
      slidesPerView: 'auto', // автоширина
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
  autoHeight: false,
  navigation: {
    prevEl: '.jsSliderButtonPrev',
    nextEl: '.jsSliderButtonNext',
  },
  loop: false,
  modules: [Navigation, Pagination],
}

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper
  nextTick(() => {
    swiper.navigation.update()
  })
}

const currentProject = ref<IProject>({
  title: '',
  description: '',
  link: '',
  img: '',
  role: [],
})

const onAboutClick = (project: IProject) => {
  currentProject.value = project
  showModal.value = true
}

onMounted(() => {
  anim.value = true
})

watch(
  () => props.items,
  () => {
    anim.value = false
    setTimeout(() => {
      anim.value = true
      if (swiperInstance.value) {
        nextTick(() => {
          swiperInstance.value?.update()
          swiperInstance.value?.navigation.update()
        })
      }
    }, 100)
  },
)

</script>

<style scoped lang="scss">
.slider-basic {
  opacity: 0;
  position: relative;

  $block: &;

  &.is-anim {
    opacity: 1;
    transition: opacity 0.5s ease;
  }

  &__button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10;
    color: #333;

    &:hover {
      border-color: #ccc;
    }

    &:disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    @media (max-width: 1200px) {
      display: none;
    }
  }

  &__button--prev {
    left: -20px;
  }

  &__button--next {
    right: -20px;
  }

  &__swiper {
    @media (max-width: 1200px) {
      padding-left: 50px;
      padding-right: 50px;
    }
  }

  &__slide {
    @media (max-width: 1200px) {
      flex: 0 0 250px;
      width: 250px;
    }
  }
}
</style>
