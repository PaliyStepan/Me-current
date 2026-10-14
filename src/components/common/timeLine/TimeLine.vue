<template>
  <div class="timeline">
    <div
      v-for="(item, index) in items"
      :key="index"
      :ref="(el) => setItemRef(el, index)"
      class="timeline__item"
      :class="{ 'timeline__item--visible': visibleItems[index] }"
    >
      <!-- Линия времени -->
      <div class="timeline__line">
        <div class="timeline__dot"></div>
      </div>

      <!-- Соединительные линии -->
      <div
        v-if="index !== 0"
        class="timeline__connector timeline__connector--before"
      ></div>

      <div
        v-if="index !== items.length - 1"
        class="timeline__connector timeline__connector--after"
      ></div>

      <div class="timeline__content">
        <div class="timeline__period">
          <div class="timeline__period-inner">
            <span class="timeline__year">{{ item.yearStart }}</span>
            <span class="timeline__year-separator">—</span>
            <span class="timeline__year">
            {{ item.yearEnd === 'now' ? 'настоящее время' : item.yearEnd }}
          </span>
          </div>
        </div>

        <div class="timeline__card">
          <div class="timeline__card-header">
            <div class="timeline__company">
              <a class="timeline__link" :href="item.link" target="_blank" rel="noopener noreferrer">
                {{ item.name }}
                <svg
                  class="timeline__link-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 3H21V9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
            <span class="timeline__position">
              <span class="timeline__position-separator">
                /
              </span>
              {{ item.position }}
            </span>
          </div>

          <div class="timeline__card-body">
            <div v-if="item.duties && item.duties.length" class="timeline__section">
              <div class="timeline__section-title">Обязанности</div>
              <ul class="timeline__list">
                <li v-for="(duty, i) in item.duties" :key="i">{{ duty }}</li>
              </ul>
            </div>

            <div v-if="item.progress && item.progress.length" class="timeline__section">
              <div class="timeline__section-title">Достижения</div>
              <ul class="timeline__list">
                <li v-for="(progressItem, i) in item.progress" :key="i" v-html="progressItem"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export interface TimelineItem {
  yearStart: string
  yearEnd: string
  name: string
  link: string
  position: string
  duties?: string[]
  progress?: string[]
}

defineProps<{
  items: TimelineItem[]
}>()

const timelineItems = ref<HTMLElement[]>([])
const visibleItems = ref<boolean[]>([])

let observer: IntersectionObserver | null = null

const setItemRef = (el: any, index: number) => {
  if (el) {
    timelineItems.value[index] = el
  }
}

const initObserver = () => {
  if (observer) observer.disconnect()

  const validItems = timelineItems.value.filter(item => item !== null && item !== undefined)
  if (validItems.length === 0) return

  visibleItems.value = new Array(timelineItems.value.length).fill(false)

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = timelineItems.value.findIndex((item) => item === entry.target)
        if (index !== -1 && entry.isIntersecting && !visibleItems.value[index]) {
          visibleItems.value[index] = true
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px 0px 0px',
    }
  )

  timelineItems.value.forEach((item) => {
    if (item) observer?.observe(item)
  })
}

onMounted(() => {
  nextTick(() => {
    initObserver()
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped lang="scss">
.timeline {
  --color-green-light: rgba(106, 190, 185, 0.1);
  --color-green-dark: #4a9e99;

  display: flex;
  flex-direction: column;
  gap: 40px;

  &__item {
    display: flex;
    gap: 30px;
    position: relative;

    @media (max-width: 768px) {
      gap: 20px;
    }
  }

  &__line {
    position: relative;
    display: flex;
    justify-content: center;
    width: 30px;
    flex-shrink: 0;
    align-self: center;
  }

  &__dot {
    width: 16px;
    height: 16px;
    background-color: var(--color-green);
    border-radius: 50%;
    border: 3px solid rgba(106, 190, 185, 0.3);
    flex-shrink: 0;
    z-index: 1;
    position: relative;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  &__connector {
    position: absolute;
    left: 14px;
    width: 2px;
    background-color: var(--color-green);
    pointer-events: none;
    z-index: 0;
  }

  &__connector--before {
    bottom: 50%;
    height: calc(50% + 20px);
  }

  &__connector--after {
    top: 50%;
    height: calc(50% + 20px);
  }

  &__content {
    position: relative;
    flex: 1;
    padding-bottom: 20px;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  &__card {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
  }

  &__item--visible {
    .timeline__dot {
      opacity: 1;
      transform: scale(1);
    }

    .timeline__content {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__period {
    position: sticky;
    top: 6px;
    margin-bottom: 12px;
    font-family: monospace;
    z-index: 2;
    padding-left: 1px;

  }

  &__period-inner {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: var(--color-bg);
    padding: 8px;
    border-radius: 8px;
  }

  &__year {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-green);
    background: var(--color-green-light);
    padding: 4px 10px;
    border-radius: 20px;
  }

  &__year-separator {
    color: #94a3b8;
    font-size: 0.875rem;
  }

  &__card-header {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 2px solid #f1f5f9;
  }

  &__company {
    margin-bottom: 8px;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #1e293b;
    text-decoration: none;
    transition: color 0.2s ease;
    font-size: 20px;
    font-weight: 700;

    &:hover {
      color: var(--color-green);

      .timeline__link-icon {
        opacity: 1;
      }
    }
  }

  &__link-icon {
    opacity: 0.6;
    transition: opacity 0.2s ease, transform 0.2s ease;
    flex-shrink: 0;
  }

  &__position {
    display: inline-block;
    font-size: 15px;
    font-weight: 500;
    color: var(--color-green);
  }

  &__position-separator {
    color: var(--color-dark);
  }

  &__card-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__section-title {
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #64748b;
    margin: 0 0 12px 0;
  }

  &__list {
    margin: 0;
    padding-left: 20px;

    li {
      position: relative;
      font-size: 15px;
      line-height: 16px;
      color: #334155;
      margin-bottom: 8px;

      &:before {
        position: absolute;
        left: -12px;
        top: -2px;
        content: '-';
        color: var(--color-green);
      }

      :deep(a) {
        color: var(--color-green);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

@media (prefers-color-scheme: dark) {
  .timeline {
    &__card {
      background: #1e293b;
      border-color: #334155;
    }

    &__link {
      color: #f1f5f9;
    }

    &__list li {
      color: #cbd5e1;
    }

    &__section-title {
      color: #94a3b8;
    }
  }
}
</style>
