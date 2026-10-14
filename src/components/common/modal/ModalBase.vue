<template>
  <VueFinalModal
    v-model="innerModel"
    class="modal-base"
    v-bind="modalPropsWithDefaults"
    v-on="modalEvents || {}"
  >
    <div class="modal-base__inner">
      <div class="modal-base__jumbotron">
        <button type="button" class="modal-base__close" @click="closeModal">
          <svg class="modal-base__close-icon" width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.8318 9.0002L17.6506 16.819L16.8189 17.6508L9.00003 9.83196L1.18121 17.6508L0.349443 16.819L8.16827 9.0002L0.348267 1.18137L1.18003 0.349609L9.00003 8.16843L16.8189 0.349609L17.6506 1.18137L9.8318 9.0002Z">
            </path></svg>
        </button>

        <div v-if="title" class="modal-base__title">
          {{ title }}
        </div>

        <div v-if="description" class="modal-base__description">
          {{ description }}
        </div>

        <div v-if="role" class="modal-base__role">
          <div class="modal-base__role-title">
            Что делал:
          </div>
          <div
            v-for="(r, index) in role"
            :key="index"
            class="modal-base__role-item"
          >
            {{ r }}
          </div>
        </div>

        <a v-if="link" :href="link" target="_blank" class="modal-base__link">
          {{ link }}
          <svg data-v-cac522ed="" class="modal-base__link-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-cac522ed="" d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-cac522ed="" d="M15 3H21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-cac522ed="" d="M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </a>
      </div>
    </div>
  </VueFinalModal>
</template>

<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'
import { computed } from 'vue'
import 'vue-final-modal/style.css'

interface StopEvent {
  stop: () => void
}

interface ModalEvents {
  beforeClose?: (val: StopEvent) => void
  beforeOpen?: (val: StopEvent) => void
  'update:modelValue'?: (val: boolean) => void
  opened?: () => void
  clickOutside?: () => void
  closed?: () => void
}

export type TModalProps = InstanceType<typeof VueFinalModal>['$props']
interface Props {
  modelValue?: boolean
  modalProps?: TModalProps | null
  modalEvents?: ModalEvents
  title?: string
  link?: string
  description?: string
  role?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  modalProps: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', state: boolean): void
  (e: 'close' | 'open'): void
}>()

defineSlots<{
  footer(): unknown
  default(): unknown
}>()

const innerModel = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)

    if (val) {
      emit('open')
    } else {
      emit('close')
    }
  },
})

const closeModal = () => {
  innerModel.value = false
}

const modalPropsWithDefaults = computed<TModalProps>(() => {
  return {
    overlayTransition: 'vfm-fade',
    contentTransition: 'vfm-fade',
    clickToClose: true,
    escToClose: true,
    contentClass: 'modal-base__content',
    ...props.modalProps,
  }
})
</script>

<style lang="scss">
.modal-base {
  z-index: 10001 !important;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;


  $block: &;

  .vfm__content {
    height: 100%;
    max-height: 100%;
    margin-right: auto;
    margin-left: auto;
    pointer-events: none;

    &::-webkit-scrollbar {
      width: 0;
      background: rgba(255, 255, 255, 0%);
    }
  }

  .vfm--overlay {
    background-color: var(--color-bg);
  }

  &__body {
    width: 100%;
    height: 100%;
  }

  &__inner {
    position: relative;
    display: flex;
    overflow: auto;
    width: 100%;
    max-width: 900px;
    padding-left: 40px;
    padding-right: 40px;
    margin: auto;
    height: 100%;
    flex-direction: column;
    pointer-events: none;
    justify-content: center;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      -webkit-border-radius: 16px;
      border-radius: 16px;
    }
  }

  &__jumbotron {
    position: relative;
    border: 1px solid var(--color-green);
    padding: 70px;
    pointer-events: auto;

    @media (max-width: 1200px) {
      padding: 28px;
    }
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 2;
    cursor: pointer;
    top: 20px;
    right: 20px;
    color: var(--color-green);
    width: 30px;
    height: 30px;
    transition: all $default-transition;

    @media (max-width: 1200px) {
      top: 10px;
      right: 10px;
    }

    &:hover {
      background-color: var(--color-green);
      color: var(--color-dark);
    }
  }

  &__title {
    font-size: 50px;
    line-height: 100%;
    font-weight: 600;
    margin-bottom: 24px;

    @media (max-width: 576px) {
      font-size: 30px;
      padding-right: 20px;
      word-break: break-all;
    }
  }

  &__description {
    color: var(--color-green);
    font-size: 20px;
    line-height: 100%;

    @media (max-width: 576px) {
      font-size: 18px;
    }
  }

  &__role {
    margin-top: 20px;
  }

  &__role-title {
    font-size: 18px;
    margin-bottom: 8px;
  }

  &__role-item {
    position: relative;
    padding-left: 18px;

    &:before {
      content: '-';
      position: absolute;
      top: 0;
      left: 4px;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: color $default-transition;
    margin-top: 20px;

    &:hover {
      color: var(--color-green);
    }
  }

  &__link-icon {
    transform: translateY(-1px);
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  //sizes
  &--basic {
    #{$block}__content {
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>
