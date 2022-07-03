<script setup>
import axios from 'axios'
const taskTitle = $ref('')
const taskUserId = $ref('') // userId, он же public_key мы должны получать из props или еще откуда-то, пока просто захардокь
const price = $ref(0.01)
const inProccess = false
const question1 = $ref('')
const question2 = $ref('')
const question3 = $ref('')
const question4 = $ref('')
const question5 = $ref('')
const question6 = $ref('')
const question7 = $ref('')

// TODO OTHER TASK DATA

const createTask = async () => {
  try {
    const taskObj = {
      taskTitle,
      taskUserId,
      inProccess,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,

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

      <input v-model="question1" class="border-2 rounded ma-1 color-black" placeholder="your question here" required type="text">
      <input v-model="question2" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">
      <input v-model="question3" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">
      <input v-model="question4" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">
      <input v-model="question5" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">
      <input v-model="question6" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">
      <input v-model="question7" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">

      <input type="file">
      <input class="btn rounded bg-gray-700 ma-1" type="submit" value="Submit task" @click="createTask">
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
