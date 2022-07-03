<script setup lang="ts">

</script>

<template>
  <nav class="relative w30 ma" text-xl mt-6>
    <RouterLink class="icon-btn mx-2" to="/" title="Home">
      <div class="absolute left-0 -top-1px">
        💎
      </div>
    </RouterLink>

    <button class="icon-btn mx-2 !outline-none" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/" target="_blank" title="GitHub">
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
