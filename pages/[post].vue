<script setup lang="ts">
import type { Post } from '~/types';

const toast = useToast()
const route = useRoute()
const router = useRouter()
const { loggedIn, user } = useAuth()

const url = `/api/posts/${route.params.post}`

const { data, pending } = await useFetch<Post>(url).then(async (res) => {
  if (res.data.value)
    await $fetch(url, { method: 'PATCH' })
  return res
})

const editable = ref(false)
const editing = ref(false)

function toggleEdit() {
  if (editing.value) {
    editing.value = false
    router.replace({ query: { edit: undefined } })
  }
  else {
    editing.value = true
    router.replace({ query: { edit: 'true' } })
  }
}

onMounted(async () => {
  if (loggedIn.value && data.value?.user.email === user.value.email) {
    editable.value = true
    if (route.query.edit)
      editing.value = true
  }
})

async function update() {
  await $fetch(url, {
    method: 'PUT',
    body: {
      name: data.value?.name,
      body: data.value?.body,
    },
  })
  toast.add({
    icon: 'i-ph-floppy-disk-duotone',
    color: 'green',
    title: 'Updated!',
  })
}
</script>

<template>
  <UPage class="relative">
    <div class="post relative m-4 rounded-lg" :class="editing ? 'border border-cyan-400' : 'p-4 bg-gray-950 min-h-screen'">
      <template v-if="pending">
        <div class="flex flex-col gap-8">
          <USkeleton
            v-for="i in 16"
            :key="i"
            class="w-full"
            :style="{ height: `${Math.floor(Math.random() * (3 - 1 + 1) + 1)}rem` }"
            :ui="{ rounded: 'rounded-lg' }"
          />
        </div>
      </template>
      <template v-else-if="data">
        <MDCEditor v-if="editable && editing" v-model="data.body" class="min-h-screen" />
        <MDC v-else-if="data.body" :value="data.body" />
        <div v-else class="flex justify-center p-10 text-center">
          <h1>
            no content!
            <br>
            <UButton v-if="editable && !editing" color="cyan" :icon="editing ? 'i-ph-x' : 'i-ph-pen-duotone'" @click="toggleEdit">
              Start writing...
            </UButton>
          </h1>
        </div>
      </template>
    </div>

    <div v-if="editable" class="absolute right-0 top-1 flex gap-2">
      <UButton v-if="editing" color="green" icon="i-ph-floppy-disk-duotone" @click="update" />
      <UButton color="cyan" :icon="editing ? 'i-ph-x' : 'i-ph-pen-duotone'" @click="toggleEdit" />
    </div>
  </UPage>
</template>

<style>
.post h1,
.post h2,
.post h3,
.post h4,
.post h5,
.post h6 {
  font-weight: bold;
  margin-bottom: 1rem;
}

.post h1 {
  font-size: 2rem;
}

.post h2 {
  font-size: 1.8rem;
}

.post h3 {
  font-size: 1.6rem;
}

.post h4 {
  font-size: 1.4rem;
}

.post h5 {
  font-size: 1.2rem;
}

.post h6 {
  font-size: 1rem;
}

/* Paragraphs */
.post p {
  margin-bottom: 1rem;
  line-height: 1.5;
}

/* Links */
.post a {
  color: #007bff;
  /* Adjust the color as needed */
  text-decoration: none;
}

.post a:hover {
  text-decoration: underline;
}

/* Preformatted text */
.post pre {
  background-color: #f8f9fa;
  /* Adjust the background color as needed */
  padding: 1rem;
  overflow: auto;
  font-family: 'Courier New', Courier, monospace;
}

/* Lists */
.post ul,
.post ol {
  margin-bottom: 1rem;
}

/* List items */
.post li {
  margin-bottom: 0.5rem;
}
</style>
