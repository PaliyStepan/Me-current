<template>
  <Component
    :is="componentData.is"
    v-bind="componentData.bind"
    class="v-button"
    :class="classes"
    draggable="false"
  >
    <span v-if="$slots.leftAddon" class="v-button__addon v-button__addon--left">
      <slot name="leftAddon" />
    </span>
    <span class="v-button__text">
      <slot />
    </span>
    <span v-if="$slots.rightAddon" class="v-button__addon v-button__addon--right">
      <slot name="rightAddon" />
    </span>
  </Component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

export type VButtonProps = {
  size?: 'md'
  to?: string | object | null
  target?: string | null
  disabled?: boolean
  color?: 'basic'
  type?: 'filled' | 'outline' | 'link'
  exact?: boolean
}

const props = withDefaults(defineProps<VButtonProps>(), {
  to: null,
  target: '_self',
  disabled: false,
  color: 'basic',
  size: 'md',
  icon: false,
  type: 'filled',
})

const classes = computed(() => [
  `v-button--${props.size}`,
  {
    'is-disabled': props.disabled,
  },
])

const componentData = computed(() => {
  if (props.to) {
    return {
      is: RouterLink,
      bind: {
        to: props.to,
        target: props.target,
        exact: props.exact,
        class: { 'is-disabled': props.disabled },
      },
    }
  }
  return {
    is: 'button',
    bind: {
      type: 'button',
      disabled: props.disabled,
    },
  }
})
</script>

<style lang="scss">
.v-button {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding-right: 20px;
  padding-left: 20px;
  border: 1px solid var(--color-text);
  color: var(--color-text);
  cursor: pointer;
  flex-wrap: nowrap;
  justify-content: center;
  transition: background-color $default-transition, color $default-transition, border-color $default-transition;
  font-size: 16px;
  flex-shrink: 0;


  @media (max-width: 1200px) {
    height: 32px;
    font-size: 14px;
  }


  &.is-active {
    background-color: var(--color-green);
    border-color: var(--color-green);
  }
}
</style>
