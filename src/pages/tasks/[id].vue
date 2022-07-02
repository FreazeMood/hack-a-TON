<script setup lang="ts">
const props = defineProps < { id: string }>()
onMounted(() => console.log(props.id))
</script>
