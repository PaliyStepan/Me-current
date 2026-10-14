<template>
  <span class="typewriter-text">
    <span class="typewriter-text__placeholder" aria-hidden="true">
      {{ text }}
    </span>
    <span class="typewriter-text__content">
      <span
        v-for="(char, index) in displayedChars"
        :key="index"
        class="typewriter-text__char"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        {{ char === ' ' ? ' ' : char }}
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, watch, computed, onBeforeUnmount } from 'vue'

interface Props {
  text: string
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  speed: 40,
})

const emit = defineEmits<{
  animated: []
}>()

const displayedText = ref<string>('')
const totalChars = ref(0)
let typewriterInterval: ReturnType<typeof setInterval> | null = null

const displayedChars = computed(() => displayedText.value.split(''))

const stopTypewriter = () => {
  if (typewriterInterval) {
    clearInterval(typewriterInterval)
    typewriterInterval = null
  }
}

const startTypewriter = (targetText: string) => {
  stopTypewriter()

  displayedText.value = ''
  totalChars.value = targetText.length
  let currentIndex = 0

  typewriterInterval = setInterval(() => {
    if (currentIndex < targetText.length) {
      displayedText.value = targetText.slice(0, currentIndex + 1)
      currentIndex++

      if (currentIndex === targetText.length) {
        stopTypewriter()
        const lastCharDelay = (targetText.length - 1) * 0.05 + 0.2
        setTimeout(() => {
          emit('animated')
        }, lastCharDelay * 1000)
      }
    }
  }, props.speed)
}

watch(
  () => props.text,
  (newText) => {
    startTypewriter(newText)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  stopTypewriter()
})
</script>

<style lang="scss" scoped>
.typewriter-text {
  position: relative;
  display: inline-block;
  white-space: pre-wrap;

  &__placeholder {
    display: block;
    visibility: hidden;
    white-space: pre-wrap;
    word-break: break-word;
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    white-space: pre-wrap;
    word-break: break-word;
  }

  &__char {
    display: inline-block;
    opacity: 0;
    animation: fadeInChar 0.3s ease-in forwards;
    transform-origin: center;
    white-space: pre-wrap;
  }
}

@keyframes fadeInChar {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(5px);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
