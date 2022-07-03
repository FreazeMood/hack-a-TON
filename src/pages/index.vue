<script setup lang="ts">
// const post = $ref(null)
const user = useUserStore()

onMounted(async () => {
  // await user.signUp()
  await user.signIn('ZjMLu3B1aKxaHEbSLG/8umh3DehN6VhBUJ7jMXSdsDhb9yDSuLpoU0uaCTR+vHFv4eaA+dBaLBoCwmsH2Hzlbw==')
  console.log(user.address)
  console.log(user.secretKey)
})
</script>

<template>
  <div>H1</div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
