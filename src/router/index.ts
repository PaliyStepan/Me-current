import { createRouter, createWebHistory } from 'vue-router'
import { ERoute } from '@/types/routes.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ERoute.Main,
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Главная' },
    },
    {
      path: '/who',
      name: ERoute.About,
      component: () => import('@/views/WhoView.vue'),
      meta: { title: 'Кто я' },
    },
    {
      path: '/education',
      name: ERoute.Education,
      component: () => import('@/views/EducationView.vue'),
      meta: { title: 'Обучение' },
    },
    {
      path: '/experience',
      name: ERoute.Experience,
      component: () => import('@/views/ExperienceView.vue'),
      meta: { title: 'Мой опыт' },
    },
    {
      path: '/skills',
      name: ERoute.Skills,
      component: () => import('@/views/SkillsView.vue'),
      meta: { title: 'Навыки' },
    },
    {
      path: '/projects',
      name: ERoute.Projects,
      component: () => import('@/views/ProjectsView.vue'),
      meta: { title: 'Проекты' },
    },
    {
      path: '/creative',
      name: ERoute.Creative,
      component: () => import('@/views/CreativeView.vue'),
      meta: { title: 'Креатив' },
    },
    {
      path: '/contacts',
      name: ERoute.Contacts,
      component: () => import('@/views/ContactsView.vue'),
      meta: { title: 'Контакты' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: ERoute.Main },
    },
  ],
})

router.beforeEach((to, from) => {
  // console.log('Переход с', from.name, 'на', to.name)
  // to.meta.title можно использовать для обновления заголовка страницы

  // console.log(to.meta)
})

export default router
