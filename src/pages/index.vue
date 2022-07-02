<script setup lang="ts">
import axios from 'axios'
let post = $ref(null)

const getTask = async () => {
  try {
    const p = await axios.get('http://localhost:3000/posts/1')
    post = p.data
  }
  catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  getTask()
})
</script>

<template>
  <div v-if="post">
    {{ post.title }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
