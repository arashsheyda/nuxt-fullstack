<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
}>()

const model = useVModel(props, 'modelValue')
</script>

<template>
  <div class="post grid grid-cols-2 rounded-lg">
    <MDC class="p-4 border border-gray-400/20 bg-gray-800 rounded-tl-lg rounded-bl-lg" :value="model" />
    <div class="relative">
      <textarea ref="editor" v-model="model" placeholder="## Hi" class="w-full h-full p-4 bg-transparent" />
      <Hachure class="pointer-events-none absolute opacity-40" />
    </div>
  </div>
</template>
