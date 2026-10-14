<template>
  <button
    class="burger-button"
    :class="{ 'burger-button--active': active }"
    @click="emit('click')"
    :aria-label="active ? 'Закрыть меню' : 'Открыть меню'"
  >
    <span class="burger-button__lines">
      <span class="burger-button__line burger-button__line--1"></span>
      <span class="burger-button__line burger-button__line--2"></span>
      <span class="burger-button__line burger-button__line--3"></span>
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.burger-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.burger-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.burger-button__lines {
  display: block;
  position: relative;
  width: 24px;
  height: 24px;
}

.burger-button__line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-green);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
}

.burger-button__line--1 {
  top: 4px;
}

.burger-button__line--2 {
  top: 50%;
  transform: translateY(-50%);
}

.burger-button__line--3 {
  bottom: 4px;
}

.burger-button--active .burger-button__line--1 {
  opacity: 0;
  transform: translateY(8px) rotate(0deg);
}

.burger-button--active .burger-button__line--2 {
  transform: rotate(45deg);
}

.burger-button--active .burger-button__line--3 {
  transform: translateY(2px) rotate(-45deg);
  bottom: 12px;
}

.burger-button__line--1 {
  animation: fadeIn 0.3s ease forwards;
}

.burger-button--active .burger-button__line--1 {
  animation: fadeOut 0.3s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(8px);
  }
}

@media (max-width: 768px) {
  .burger-button {
    width: 44px;
    height: 44px;
  }
}
</style>
