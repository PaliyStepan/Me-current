<template>
  <section class="home">
    <div class="home__center">
      <SectionTitle
        text="Степан Палий"
        description="front-end developer"
        size="xl"
        @markShown="showInfo = true"
      />
    </div>

    <transition name="slide-up">
      <div v-if="showInfo" class="home__info">
        <div
          v-for="(item, index) in info"
          :key="index"
          class="home__info-item"
          ref="counterElements"
        >
          <div class="home__info-item-count">
            <span :id="`counter-${index}`">0</span>
            <span v-if="item.suffix" class="home__info-item-suffix">
              {{ item.suffix }}
            </span>
          </div>

          <div class="home__info-item-title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </transition>
  </section>

  <Teleport to=".app__inner">
    <div class="home__me">
      <img
        src="/src/assets/images/me.png"
        alt="phone"
        class="theme-img home__me-img"
        ref="meImage"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { CountUp } from 'countup.js'
import SectionTitle from '@/components/common/sectionTitle/SectionTitle.vue'
import gsap from 'gsap'

const showInfo = ref<boolean>(false)
const meImage = ref<HTMLImageElement | null>(null)

const info = [
  {
    count: 8,
    suffix: '+',
    title: 'лет коммерческой разработки',
  },
  // {
  //   count: 57,
  //   title: 'реализованных проектов с нуля',
  // },
  {
    count: 12,
    title: 'проектов на Vue 2/3',
  },
  {
    count: 4,
    title: 'проекта на React',
  },
]

const counterElements = ref<HTMLElement[]>([])
const animatedFlags = new Set<number>()
const counters: CountUp[] = []
let startAnimationTriggered = false

const isElementInViewport = (el: HTMLElement): boolean => {
  const rect = el.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  return rect.top <= windowHeight && rect.bottom >= 0 && rect.left <= windowWidth && rect.right >= 0
}

const startVisibleCounters = () => {
  if (!showInfo.value) return

  counterElements.value.forEach((element, index) => {
    const targetCount = info[index].count

    if (isElementInViewport(element) && !animatedFlags.has(index)) {
      animatedFlags.add(index)

      const counterId = `counter-${index}`
      const counterElement = document.getElementById(counterId)

      if (counterElement) {
        const countUp = new CountUp(counterElement, targetCount, {
          duration: 2.5,
          useEasing: true,
          useGrouping: false,
          separator: '',
          decimal: '.',
          prefix: '',
          suffix: '',
          startVal: 0,
        })

        if (!countUp.error) {
          countUp.start()
          counters.push(countUp)
        }
      }
    }
  })
}

let scrollTimeout: ReturnType<typeof setTimeout>
const handleScroll = () => {
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    startVisibleCounters()
  }, 100)
}

watch(showInfo, (newValue) => {
  if (newValue && !startAnimationTriggered) {
    startAnimationTriggered = true
    setTimeout(() => {
      startVisibleCounters()
    }, 100)
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)

  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }

  counters.forEach((counter) => {
    if (counter && counter.reset) {
      counter.reset()
    }
  })
})

onMounted(() => {
  if (!meImage.value) return

  const tl = gsap.timeline()

  tl.fromTo(
    meImage.value,
    {
      filter: 'blur(10px)',
      ease: 'power2.inOut',
    },
    {
      duration: 1.3,
      filter: 'blur(15px)',
      ease: 'power2.inOut',
    },
  ).fromTo(
    meImage.value,
    {
      filter: 'blur(15px)',
      ease: 'power2.inOut',
    },
    {
      duration: 1.5,
      filter: 'blur(0px)',
      ease: 'power2.inOut',
    },
  )
})
</script>

<style scoped lang="scss">
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow: auto;

  @media (max-width: 1200px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  &__center {
    margin-top: auto;
    margin-bottom: auto;
    height: 158px;
    transform: translateY(-67px);
  }

  &__info {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 30px;
    flex-wrap: wrap;
    margin-top: auto;
    overflow: hidden;
    background-color: var(--color-bg-opacity);
    z-index: 3;
    border-radius: 3px;
    transition: background-color $default-transition;
    flex-shrink: 0;
    padding-right: 20px;

    @media (max-width: 1440px) {
      width: 480px;
      padding-right: 0;
      gap: 0;
    }

    @media (max-width: 1200px) {
      left: 50px;
    }

    @media (max-width: 576px) {
      right: 50px;
      width: auto;
    }
  }

  &__info-item {
    display: flex;
    align-items: center;
    gap: 20px;
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease backwards;

    @media (max-width: 1440px) {
      flex: 0 0 50%;
      width: 50%;
    }

    @media (max-width: 576px) {
      flex: 0 0 100%;
      width: 100%;
    }

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
  }

  &__info-item-count {
    font-size: 56px;
    color: var(--color-green);
    line-height: 1.2;
    flex-shrink: 0;

    @media (max-width: 576px) {
      font-size: 36px;
    }

    span {
      display: inline-block;
    }
  }

  &__info-item-suffix {
    font-size: 40px;
    margin-left: 5px;

    @media (max-width: 576px) {
      font-size: 30px;
    }
  }

  &__info-item-title {
    width: 140px;
    font-size: 20px;
    line-height: 20px;

    @media (max-width: 576px) {
      width: auto;
      font-size: 18px;
    }
  }

  &__ava {
    position: absolute;
    right: 0;
    top: 20px;
    width: 400px;
    height: 400px;
    overflow: hidden;
    border: 1px solid var(--color-green);
    z-index: 2;
  }

  &__ava-img {
    position: absolute;
    bottom: 0;
    max-width: 100%;
  }

  &__me {
    position: absolute;
    right: -200px;
    width: 800px;
    bottom: 0;

    @media (max-width: 1600px) {
      right: 0;
      width: 600px;
    }

    @media (max-width: 1300px) {
      width: 550px;
    }

    @media (max-width: 1200px) {
      display: none;
    }
  }

  &__me-img {
    width: 100%;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
