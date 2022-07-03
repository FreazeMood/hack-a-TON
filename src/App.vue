<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Datatoning',
  meta: [
    { name: 'description', content: 'Image dataset labeling' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: computed(() => '/favicon-16x16.2c72beb2.png'),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>

