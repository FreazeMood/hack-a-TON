<script setup lang="ts">
import axios from 'axios'
const props = defineProps < { id: string }>()
let task = $ref(null)

onMounted(async () => {
  const getTask = await axios.get(`http://localhost:3000/createdtasks/${props.id}`)
  const in_proccess = getTask.data.inProccess = true
  task = getTask.data
  const putTask = axios.put(`http://localhost:3000/createdtasks/${props.id}`, getTask.data)
})

const deleteTask = async () => {
  console.log('executing')
  try {
    const res = await axios.delete(`http://localhost:3000/createdtasks/${props.id}`)
    console.log(res)
  }
  catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div v-for="(question, i) in task" :key="i">
    <div v-if="question && i !== 'inProccess' && i !== 'id' && i !== 'taskTitle'">
      {{ question }}
      <input type="text" class="border-2 rounded ma-1 color-black" required>
    </div>
  </div>

  <button type="submit" @click="deleteTask()">
    submit
  </button>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
