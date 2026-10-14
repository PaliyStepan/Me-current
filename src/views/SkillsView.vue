<template>
  <section class="skills">
    <SectionTitle text="Мои навыки" @animated="showRest = true" class="skills__header" />
    <div v-if="showRest" class="skills__grid">
      <SkillsCard
        v-for="(skill, index) in skills"
        :key="skill.title"
        :title="skill.title"
        :icon="skill.icon"
        :isImage="skill.isImage"
        :style="{ animationDelay: `${index * 0.1}s` }"
        class="skills__item"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import SkillsCard from '@/components/common/skillsCard/SkillsCard.vue'
import SectionTitle from '@/components/common/sectionTitle/SectionTitle.vue'
import { ref } from 'vue'

const showRest = ref(false)

const skills = [
  {
    icon: 'html',
    title: 'Html',
  },
  {
    icon: 'css',
    title: 'Css',
  },
  {
    icon: 'js',
    title: 'JavaScript',
  },
  {
    icon: 'ts',
    title: 'TS',
  },
  {
    icon: 'vue',
    title: 'Vue 2/3',
  },
  {
    icon: 'react',
    title: 'React 18+',
    isImage: true,
  },
  {
    icon: 'nuxt',
    title: 'Nuxt',
    isImage: true,
  },
  {
    icon: 'next',
    title: 'Next',
  },
  {
    icon: 'pug',
    title: 'Pug',
    isImage: true,
  },
  {
    icon: 'git',
    title: 'Git',
  },
  {
    icon: 'pixel',
    title: 'Pixel Perfect',
  },
  {
    icon: 'vite',
    title: 'Vite',
    isImage: true,
  },
  {
    icon: 'bem',
    title: 'B.E.M.',
    isImage: true,
  },
]
</script>

<style scoped lang="scss">
.skills {
  position: relative;

  @media (max-width: 1200px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  &__header {
    @include section-header;
  }

  &__grid {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(5, 1fr);
    overflow: hidden;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 576px) {
      gap: 24px;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__item {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s ease forwards;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
