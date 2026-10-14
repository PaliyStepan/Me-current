<template>
  <div class="app">
    <div class="app__container">
      <div class="app__inner">
        <div class="app__top">
          <TagComponent
            text="<html>"
            class="app__html-tag app__html-tag--open tag-open"
            :style="{ animationDelay: '0.1s' }"
          />
          <TagComponent
            text="<body>"
            class="app__body-tag app__body-tag--open tag-open"
            :style="{ animationDelay: '1s' }"
          />
        </div>

        <div class="app__content">
          <div class="app__aside">
            <transition name="menu-fade">
              <AppMenu
                v-model="showMenu"
                v-show="showMenu"
                class="app__menu"
              />
            </transition>
          </div>

          <div class="app__main">
            <div class="app__main-top">
              <TagComponent
                text="<main>"
                class="app__main-tag app__main-tag--open tag-open"
                :style="{ animationDelay: '1.5s' }"
              />
            </div>

            <div class="app__main-view custom-scroll">
              <RouterView />
            </div>

            <div class="app__main-bottom">
              <TagComponent
                text="</main>"
                class="app__main-tag app__main-tag--close tag-close"
                :style="{ animationDelay: '1.5s' }"
              />
            </div>
          </div>
        </div>

        <div class="app__bottom">
          <TagComponent
            text="</body>"
            class="app__body-tag app__body-tag--close tag-close"
            :style="{ animationDelay: '1s' }"
          />
          <TagComponent
            text="</html>"
            class="app__html-tag app__html-tag--close tag-close"
            :style="{ animationDelay: '0.1s' }"
          />
        </div>
      </div>

      <VThemeToggler v-show="showToggler" class="app__theme-toggler" />

      <BurgerButton
        :active="showMenu"
        class="app__burger"
        @click="showMenu = !showMenu"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TagComponent from '@/components/common/tagComponent/TagComponent.vue'
import AppMenu from '@/components/layout/AppMenu.vue'
import VThemeToggler from '@/components/ui/theme-toggler/VThemeToggler.vue'
import BurgerButton from '@/components/common/burger/BurgerButton.vue'

const showMenu = ref(false);

const showToggler = ref(false);

setTimeout(() => {
  showToggler.value = true
},3500)
</script>

<style lang="scss">
.app {
  position: relative;

  &__container {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1450px;
    padding-left: 20px;
    padding-right: 20px;

    @media (max-width: 1200px) {
      padding-left: 0;
      padding-right: 0;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    overflow: hidden;
  }

  &__top {
    padding-top: 12px;

    @media (max-width: 1200px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  &__bottom {
    padding-bottom: 12px;

    @media (max-width: 1200px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  &__content {
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
    height: 100%;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    @media (max-width: 1200px) {
      padding-top: 14px;
      padding-bottom: 14px;
    }

    &::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
      background: transparent;
    }
  }

  &__aside {
    display: flex;
    justify-content: flex-end;
    flex: 0 0 220px;

    @media (max-width: 1200px) {
      width: 0;
      flex: unset;
    }
  }

  &__menu {
    @media (min-width: 1200px) {
      display: block !important;
    }
  }

  &__main {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 0 0 calc(100% - 250px);
    max-width: calc(100% - 250px);
    padding-left: 80px;

    @media (max-width: 1200px) {
      flex: 0 0 100%;
      max-width: 100%;
      padding-left: 0;
    }
  }

  &__main-view {
    height: 100%;
    overflow: auto;
    padding-right: 20px;

    @media (max-width: 1200px) {
      padding-bottom: 14px;
      padding-right: 0;
    }
  }

  &__body-tag {
    margin-left: 54px;

    @media (max-width: 1200px) {
      margin-left: 20px;
    }
  }

  &__body-tag--open {
    padding-top: 12px;
  }

  &__body-tag--close {
    padding-bottom: 12px;
  }

  &__main-top {
    padding-bottom: 40px;

    @media (max-width: 1200px) {
      display: none;
    }
  }

  &__main-bottom {
    padding-top: 40px;

    @media (max-width: 1200px) {
      display: none;
    }
  }

  &__avatar {
    position: absolute;
    right: 0;
    bottom: 0;
    pointer-events: none;
    height: auto;
    max-width: 800px;
  }

  &__title {
    padding-top: 40px;
    display: flex;
    align-items: center;
  }

  &__title-text {
    position: relative;
    font-size: 20px;
    line-height: 20px;
    min-height: 24px;
  }

  &__theme-toggler {
    position: absolute;
    top: 40px;
    left: 20px;

    @media (max-width: 1200px) {
      top: 46px;
      left: 12px;
    }
  }

  &__burger {
    @media (min-width: 1201px) {
      display: none !important;
    }

    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 30;
  }
}



//@media (max-width: 1199px) {
//  .menu-fade-enter-active,
//  .menu-fade-leave-active {
//    transition: opacity 0.3s ease;
//  }
//
//  .menu-fade-enter-from,
//  .menu-fade-leave-to {
//    opacity: 0;
//  }
//}
//
//// На больших экранах transition не работает
//@media (min-width: 1200px) {
//  .menu-fade-enter-active,
//  .menu-fade-leave-active {
//    transition: none;
//  }
//}
</style>
