<template>
  <div class="section-title" :class="`section-title--${size}`">
    <TagComponent text="<h1>" class="section-title__open tag-open"  :style="{ animationDelay: '1s' }"/>
    <TypewriterText :text="text" class="section-title__text" @animated="onAnimated" />
    <transition name="fade">
      <TagComponent text="</h1>" v-if="showEnd" class="section-title__close" />
    </transition>

    <div v-if="showDescription && description" class="section-title__description">
      {{ description }}
    </div>

    <div v-show="showMark && mark" class="section-title__mark">
      {{ mark }}
    </div>
  </div>
</template>

<script setup lang="ts">
import TypewriterText from '@/components/common/typewriterText/TypewriterText.vue'
import TagComponent from '@/components/common/tagComponent/TagComponent.vue'
import { ref } from 'vue'

const showEnd = ref<boolean>(false)
const showDescription = ref<boolean>(false)
const showMark = ref<boolean>(false)

interface Props {
  text: string
  description?: string
  mark?: string
  size?: 'basic' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'basic'
})

const emit = defineEmits<{
  (e: 'animated'): void
  (e: 'markShown'): void
}>()

const onAnimated = () => {
  showEnd.value = true
  emit('animated')

  setTimeout(() => {
    showDescription.value = true
  }, 250)

  setTimeout(() => {
    showMark.value = true
    emit('markShown')
  }, 500)
}
</script>

<style scoped lang="scss">
.section-title {
  display: flex;
  flex-wrap: wrap;

  $block: &;

  &__open {
    width: 100%;

    @media (max-width: 1200px) {
      margin-right: 8px;
      height: 18px;
    }
  }

  &__close {
    align-self: flex-end;
    margin-left: 16px;

    @media (max-width: 1200px) {
      width: 100%;
      margin-left: 0;
      height: 18px;
      margin-top: 6px;
    }
  }

  &__text {
    transform: translateY(-2px);
    font-size: 60px;
    font-weight: 500;
    line-height: 60px;
    min-height: 60px;

    @media (max-width: 1200px) {
      font-size: 40px;
      line-height: 40px;
      min-height: 40px;
    }
  }

  &__description {
    width: 100%;
    font-size: 30px;
    color: var(--color-green);
    margin-top: 8px;
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
    animation-delay: 0.3s;
    font-weight: 300;

    @media (max-width: 1200px) {
      font-size: 26px;
    }
  }

  &__mark {
    width: 100%;
    margin-top: 4px;
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
    animation-delay: 0.6s;
    color: var(--color-gray);
    font-size: 18px;
    font-weight: 200;
    letter-spacing: 2px;
  }

  &--xl {
    #{$block}__text {
      font-size: 70px;

      @media (max-width: 1200px) {
        font-size: 43px;
      }
    }
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translateX(25px);
  }

  &-enter-to {
    opacity: 1;
    transform: translateX(0);
  }

  &-leave-from {
    opacity: 1;
    transform: translateX(0);
  }

  &-leave-to {
    opacity: 0;
    transform: translateX(-25px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
