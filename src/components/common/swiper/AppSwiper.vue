<template>
  <div
    ref="swiperRef"
    class="swiper"
    :parallax="true"
  >
    <div class="swiper-wrapper">
      <slot name="default" />
    </div>

    <slot name="pagination" />

    <slot name="navigation" />
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'

import { onBeforeUnmount, onMounted, ref } from 'vue'
import Swiper from 'swiper'
import type { SwiperOptions } from 'swiper/types'

const props = defineProps<{
  swiperParams: SwiperOptions
}>()

const emit = defineEmits<{
  (e: 'swiper', value: Swiper): void
}>()

defineSlots<{
  default(): unknown
  pagination(): unknown
  navigation(): unknown
}>()

const swiperRef = ref<HTMLElement>(null as unknown as HTMLElement)

const swiper = ref<Swiper | null>(null)

onMounted(() => {
  swiper.value = new Swiper(swiperRef.value, props.swiperParams)
  emit('swiper', swiper.value)
})
onBeforeUnmount(() => {
  swiper.value?.destroy()
})
</script>
