<template>
  <section class="contacts">
    <SectionTitle text="Контакты" @animated="showRest = true" class="contacts__header" />

    <div v-if="showRest" class="contacts__description">
      Связаться со мной можно любым, удобным для Вас способом.
    </div>

    <div v-if="showRest" class="contacts__grid">
      <a
        v-for="(contact, index) in contacts"
        :key="contact.title"
        :href="contact.href"
        :style="{ animationDelay: `${index * 0.15}s` }"
        class="contacts__item"
      >
        <span class="contacts__icon-wrapper">
          <img
            :src="`/images/${contact.icon}.svg`"
            :alt="contact.title"
            class="contacts__icon"
          />
        </span>

        {{ contact.title }}
      </a>
    </div>
    <Teleport
      to=".app__inner"
      v-if="showRest"
    >
      <img src="/src/assets/images/phone.png" alt="phone" class="contacts__phone theme-img" />
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/common/sectionTitle/SectionTitle.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showRest = ref<boolean>(false)

const contacts = [
  {
    title: '+7 (981) 122 30 48',
    href: 'tel:+7(981)1223048',
    icon: 'phone',
  },
  {
    title: 'palstepweb@gmail.com',
    href: 'mailto:palstepweb@gmail.com',
    icon: 'mail',
  },
  {
    title: '@palstepa',
    href: 'https://t.me/palstepa',
    icon: 'tg',
  },
]

const appInner = document.querySelector('.app')
if (appInner) {
  appInner.classList.add('no-scroll')
}

onBeforeUnmount(() => {
  if (appInner) {
    appInner.classList.remove('no-scroll')
  }
})
</script>

<style scoped lang="scss">
.contacts {
  position: relative;
  z-index: 2;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  &__header {
    @include section-header;
    margin-bottom: 40px;

    @media (max-width: 1200px) {
      margin-bottom: 0;
    }
  }

  &__description {
    font-size: 20px;
    color: var(--color-green);
    font-weight: 300;
    margin-bottom: 40px;
    background: rgba(var(--color-bg), 0.5);
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 24px;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    animation: fadeInUp 0.4s ease forwards;
    font-size: 20px;
    transition: color $default-transition;

    &:hover {
      color: var(--color-green);
    }
  }

  &__icon-wrapper {
    display: flex;
    position: relative;
    width: 24px;
    height: 24px;
  }


  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__phone {
    position: absolute;
    bottom: 0;
    right: 0;
    max-height: 80vh;
    animation: fadeInUp $default-transition forwards;

    @media (max-width: 1200px) {
      display: none;
    }
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.no-scroll {
  overflow: hidden !important;
}
</style>
