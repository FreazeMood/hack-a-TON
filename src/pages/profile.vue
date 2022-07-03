<script setup>
const user = useUserStore()
const router = useRouter()

onBeforeMount(() => {
  if (!user.publicKey || !user.secretKey || !user.address)
    router.push('/signin')
})
</script>

<template>
  <div class="w-600px h-100 ma flex justify-center items-center flex-col">
    <div class="flex justify-center items-center flex-col">
      <span>Your wallet address: </span>
      <span>{{ user.address }}</span>
    </div>
    <div class="flex justify-center items-center flex-col">
      <span>Your secret key:</span>
      <span>{{ user.secretKey }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: home
</route>
