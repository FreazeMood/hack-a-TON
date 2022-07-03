<script setup lang="ts">
import axios from 'axios'
const router = useRouter()
let tasks = $ref(null)

const getTask = async () => {
  try {
    const get = await axios.get(`http://${import.meta.env.HOST}:3000/tasks`)
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
    <div v-if="tasks" class="flex justify-center items-center flex-col">
      <div v-for="(task, i) in tasks" :key="i">
        <div v-if="task.title && !task.inProccess" class="rounded-1 color-gray-800 shadow-black bg-bluegray-500 dark:shadow-bluegray-300 px-2 flex w-100 flex-col ma-2 cursor-pointer" @click="router.push(`/tasks/${task.id}`)">
          <div>
            {{ task.title }}
          </div>
          <div class="color-blue-200">
            let's get started
          </div>
        </div>
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
