<template>
  <AppLayout />
  <ModalsContainer />
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'
import AppLayout from "@/layouts/AppLayout.vue"
import { ModalsContainer } from 'vue-final-modal'

let observer: MutationObserver | null = null;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

function wrapBadge() {
  const badge = document.getElementById('layero-badge');
  if (!badge || badge.parentElement?.classList.contains('hide-badge')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'hide-badge';

  badge.parentNode?.insertBefore(wrapper, badge);
  wrapper.appendChild(badge);
}

onMounted(() => {
  timeoutId = setTimeout(() => {
    wrapBadge();

    observer = new MutationObserver(wrapBadge);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }, 200);
});

onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  observer?.disconnect();
  observer = null;
});
</script>
