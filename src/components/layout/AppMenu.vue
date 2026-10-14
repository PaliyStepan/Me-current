<template>
  <div class="menu">
    <div class="menu__inner">
      <TagComponent text="<nav>" class="menu__tag tag-open" :style="{ animationDelay: isMobile ? '0s' : '1.6s' }" />

      <div
        class="menu__list tag-close"
        :style="{ animationDelay: isMobile ? '0s' : '1.8s' }"
      >
        <div v-for="link in links" :key="link.text" class="menu__item">
          <button
            v-if="link.children"
            class="menu__link menu__link--button"
            :class="{ 'is-active': isActiveParent(link) }"
            @click="toggleDropdown(link.text)"
          >
            {{ link.text }}
          </button>

          <RouterLink
            v-else
            :to="link.to || '/'"
            class="menu__link"
            active-class="is-active"
            @click="closeDropdown"
          >
            {{ link.text }}
          </RouterLink>

          <transition name="dropdown">
            <div v-if="link.children && activeDropdown === link.text" class="menu__dropdown">
              <RouterLink
                v-for="(child, index) in link.children"
                :key="child.text"
                :to="child.to || '/'"
                class="menu__link menu__link--child"
                active-class="is-active"
                :style="{ animationDelay: `${index * 0.05}s` }"
                @click="closeByDropdownLink"
              >
                {{ child.text }}
              </RouterLink>
            </div>
          </transition>
        </div>
      </div>

      <TagComponent text="</nav>" class="menu__tag tag-close" :style="{ animationDelay: isMobile ? '0s' : '1.6s' }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TagComponent from '@/components/common/tagComponent/TagComponent.vue'
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 1200px)')

const model = defineModel<boolean>({ default: false })

interface IChildLink {
  to?: string
  text: string
}

interface ILink {
  to?: string
  text: string
  children?: IChildLink[]
}

const route = useRoute()

const links: ILink[] = [
  {
    to: '/',
    text: 'Главная',
  },
  {
    text: 'Обо мне',
    children: [
      {
        to: '/who',
        text: 'Кто я',
      },
      {
        to: '/experience',
        text: 'Опыт',
      },
      {
        to: '/education',
        text: 'Обучение',
      },
      {
        to: '/skills',
        text: 'Навыки',
      },
    ],
  },
  {
    to: '/projects',
    text: 'Проекты',
  },
  {
    to: '/contacts',
    text: 'Контакты',
  },
]

const activeDropdown = ref<string | null>(null)

// Проверка, активен ли родительский пункт (если какой-то из детей активен)
const isActiveParent = (link: ILink) => {
  if (!link.children) return false
  return link.children.some((child) => route.path === child.to)
}

// Открыть dropdown на основе текущего маршрута
const openDropdownByRoute = () => {
  for (const link of links) {
    if (link.children) {
      const isChildActive = link.children.some((child) => route.path === child.to)
      if (isChildActive) {
        activeDropdown.value = link.text
        break
      }
    }
  }
}

const toggleDropdown = (text: string) => {
  if (activeDropdown.value === text) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = text
  }
}

const closeMobileMenu = () => {
  if (isMobile.value) {
    setTimeout(() => {
      model.value = false
    }, 350)
  }
}

const closeDropdown = () => {
  activeDropdown.value = null;
  closeMobileMenu();
}

const closeByDropdownLink = () => {
  closeMobileMenu();
}

watch(
  () => route.path,
  () => {
    openDropdownByRoute()
  },
)

onMounted(() => {
  openDropdownByRoute()
})
</script>

<style scoped lang="scss">
.menu {
  $block: &;

  @media (max-width: 1200px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 20;
    background-color: var(--color-bg);
  }

  &__inner {
    @media (max-width: 1200px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-top: 10px;
    padding-bottom: 20px;
    padding-left: 32px;

    @media (max-width: 1200px) {
      padding-top: 16px;
      padding-bottom: 22px;
      padding-left: 0;
    }
  }

  &__tag {
    @media (max-width: 1200px) {
      font-size: 24px;
    }
  }

  &__item {
    width: 100px;

    @media (max-width: 1200px) {
      width: auto;
      text-align: center;
    }
  }

  &__link {
    position: relative;
    display: inline-block;
    color: var(--color-green);
    transition: color $default-transition;
    font-size: 20px;
    line-height: 20px;
    font-weight: 300;
    cursor: pointer;

    @media (max-width: 1200px) {
      font-size: 22px;
      line-height: 23px;
    }

    &:not(#{$block}__link--button) {
      &:before {
        display: block;
        background-color: var(--color-text);
        content: '';
        height: 18px;
        left: -18px;
        position: absolute;
        top: 50%;
        transform: rotate(30deg) translateY(-60%);
        transition: opacity $default-transition;
        width: 1px;
        opacity: 0;
        pointer-events: none;
      }
    }

    &.is-active,
    &:hover,
    &:focus {
      color: var(--color-text);
      outline: none;
    }

    &.is-active {
      &:not(#{$block}__link--button) {
        &:before {
          opacity: 1;
        }
      }
    }

    &--child {
      font-size: 19px;
      line-height: 100%;
      opacity: 0;
      transform: translateX(-8px);
      animation: childFadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;

      @media (max-width: 1200px) {
        font-size: 20px;
      }
    }
  }

  &__dropdown {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
    padding-top: 8px;
    gap: 4px;

    @media (max-width: 1200px) {
      padding-left: 0;
      align-items: center;
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@keyframes childFadeIn {
  0% {
    opacity: 0;
    transform: translateX(-8px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
