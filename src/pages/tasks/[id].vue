<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import axios from 'axios'

const props = defineProps(['id'])
let task = $ref(null)
const started = $ref(false)
const myCarousel = ref(null)
const finishBth = ref(false)
let isFinished = ref(false)
const images = $ref([
  'https://picsum.photos/198',
  'https://picsum.photos/199',
  'https://picsum.photos/200',
  'https://picsum.photos/201',
  'https://picsum.photos/202',
])

const finishTask = () => {
  isFinished = true
  console.log('Task is finished', isFinished)
}

onBeforeMount(async () => {
  const getTask = await axios.get(`http://${import.meta.env.HOST}:3000/${props.id}`)
  if (getTask.data.inProccess === false)
    task = getTask.data
  else
    task = 'Task alredy in processing'
})

const deleteTask = async () => { // payment channel close
  console.log('executing')
  try {
    const res = await axios.delete(`http://${import.meta.env.HOST}:3000/tasks/${props.id}`)
    console.log(res)
  }
  catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div v-if="task && !task.id">
    {{ task }}
  </div>
  <div v-else-if="task && task.id">
    <div v-show="!isFinished">
      <div v-if="!started">
        <div class="m-1 text-xl">
          {{ task.title }}
        </div>
        <div class="m-2">
          Check images and ask the questions
        </div>
        <button class="btn" @click="started = true">
          Take a task
        </button>
      </div>
      <div v-else class="max-w-100 ma">
        <carousel ref="myCarousel" :items-to-show="1" :mouse-drag="false" :touch-drag="false">
          <slide v-for="(slide, n) in images" :key="slide">
            <div>
              <img :src="slide" class="rounded-2">
              <div v-for="(question, i) in task.labels" :key="i" class="m-2">
                <div v-if="question" class="flex justify-center items-center flex-1">
                  <label :for="`q-${i}`">{{ question }}</label>
                  <input :id="`q-${i}`" type="checkbox" class="border-2 rounded ma-1 color-black" required>
                </div>
              </div>
              <button v-if="images.length > n + 1" class="btn" @click="myCarousel.next()">
                Submit
              </button>
              <div v-if="images.length === n + 1">
                <button v-if="!finishBth" class="btn" @click="finishBth = !finishBth">
                  Submit
                </button>
                <button v-if="finishBth" class="btn bg-green-800" @click="isFinished = true">
                  Finish task
                </button>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
    <div v-show="isFinished">
      Task is finished. Payment channel can be closed
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
