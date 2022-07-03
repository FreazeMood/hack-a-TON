<script setup>
const user = useUserStore()
</script>

<template>
  <div v-if="user && user.balance" class="text-2xl font-900 color-white">
    {{ user.balance }} TON
  </div>
</template>

<style lang="scss" scoped>

</style>
