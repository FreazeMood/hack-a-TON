<script setup>
import axios from 'axios'
const taskTitle = $ref('')
const taskUserId = $ref('') // userId, он же public_key мы должны получать из props или еще откуда-то, пока просто захардокь
const taskId = Math.random().toString(36).slice(2) // taskId to define the task while the user starts a task
const price = $ref(0.01)
const inProccess = false

// TODO OTHER TASK DATA

const createTask = async () => {
  try {
    const taskObj = {
      taskTitle,
      taskUserId,
      taskId,
      inProccess,
    }

    const res = await axios.post('http://localhost:3000/createdtasks', taskObj)
    console.log(res)
  }
  catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="h-100% flex flex-col flex justify-center items-center">
    <!-- этот див тут только для примера работы v-model -->
    <div>
      {{ taskTitle }}
    </div>
    <!--  -->
    <form class="border-gray border-10 w-100 pa-5 flex flex-col">
      <input v-model="taskTitle" class="border-2 rounded ma-1 color-black " required type="text">
      <input v-model="price" class="border-2 rounded ma-1 color-black" required type="text">
      <input v-model="taskUserId" type="text" hidden="true">
      <input type="file">
      <input class="btn rounded bg-gray-700 ma-1" type="submit" value="Submit task" @click="createTask">
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
