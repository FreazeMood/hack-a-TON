<script setup>
import axios from 'axios'
import { initial } from 'cypress/types/lodash'
const router = useRouter()
const taskTitle = $ref('')
const customerPublicKey = $ref('')
const price = $ref(0.01)
const inProccess = false
const question1 = $ref('')
const question2 = $ref('')
const question3 = $ref('')
const question4 = $ref('')
const question5 = $ref('')
const question6 = $ref('')
const question7 = $ref('')
const user = useUserStore()

onBeforeMount(() => {
  if (!user || !user.publicKey)
    router.push('/signin')
})
// TODO OTHER TASK DATA

const addTask = async () => {
  if (!user || !user.publicKey)
    router.push('/signin')

  try {
    const taskObj = {
      title: taskTitle,
      customerPublicKey: user.publicKey,
      inProccess,
      labels: [
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
        question7,
      ],

    }

    const res = await axios.post(`http://${import.meta.env.VITE_HOST}:3000/tasks`, taskObj)
    if (res.data)
      router.push('/')
  }
  catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="h-100% flex flex-col flex justify-center items-center">
    <form class="border-gray border-10 w-100 pa-5 flex flex-col" @submit.prevent>
      <label class="text-left" for="title">Title</label>
      <input v-model="taskTitle" name="title" class="border-2 rounded ma-1 color-black " required type="text">
      <label class="text-left" for="price">TON's for data labeling</label>
      <input v-model="price" name="price" class="border-2 rounded ma-1 color-black" required type="text">
      <input v-model="question1" class="border-2 rounded ma-1 color-black" placeholder="your question here" required type="text">
      <input v-model="question2" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">
      <input v-model="question3" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">
      <input v-model="question4" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">
      <input v-model="question5" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">
      <input v-model="question6" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">
      <input v-model="question7" class="border-2 rounded ma-1 color-black" placeholder="your question here" type="text">

      <input type="file">
      <input class="btn rounded bg-gray-700 ma-1" type="submit" value="Submit task" @click="addTask">
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
