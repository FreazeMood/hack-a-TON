<script setup lang="ts">
import axios from 'axios'
let tasks = $ref(null)

const getTask = async () => {
  try {
    const get = await axios.get('http://localhost:3000/createdtasks')
    tasks = get.data
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
  <div>
    <div v-if="tasks">
      <div v-for="task in tasks">
        <ul v-if="task.taskTitle && !task.inProccess" class="chooseTask">
          <li>
            {{ task.taskTitle }}
          </li>
          <button class="chooseBtn">
            <a href="#" />
            let's get started
          </button>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.chooseTask{
    padding-top: 5%;
}

.chooseBtn{
    color: aqua;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
