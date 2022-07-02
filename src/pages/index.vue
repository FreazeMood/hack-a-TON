/* eslint-disable no-console */
/* eslint-disable no-console */
<script setup lang="ts">
import axios from 'axios'
let post = $ref(null)

const getTask = async () => {
  try {
    const p = await axios.get('http://localhost:3000/createdtasks') // the "3" in the end is the id of the task in the DB
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
    {{ post.taskTitle }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
