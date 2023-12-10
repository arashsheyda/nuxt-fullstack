<script setup lang="ts">
import { useAuthModal } from '~/composables/modals';
import type { Post } from '~/types'
import { slugify } from '~/utils'

const { data, pending, error, refresh } = await useFetch<Post[]>('/api/posts')

const toast = useToast()
const { loggedIn } = useAuth()
const { modal } = useAuthModal()

const addModal = ref(false)
const deleteModal = ref(false)

const selected = ref<Post | undefined>()
const loading = ref(false)

async function deleteItem() {
  loading.value = true
  await useFetch(`/api/posts/${selected.value?.slug}`, {
    method: 'DELETE',
  })
  loading.value = false
  deleteModal.value = false
  selected.value = undefined
  await refresh()
  toast.add({
    title: 'Success!',
    description: 'Post deleted successfully.',
    color: 'amber',
    icon: 'i-ph-check',
  })
}

const form = ref<Partial<Post>>({
  name: '',
  slug: '',
  description: '',
  color: '#10aa50',
  body: '',
})

watch(() => form.value.name, () => {
  if (form.value.name) {
    form.value.slug = slugify(form.value.name)
  }
}, { immediate: true })

async function save() {
  loading.value = true

  const { data, error } = await useFetch('/api/posts/create', {
    method: 'POST',
    body: form.value,
  })

  if (error.value) {
    loading.value = false
    return toast.add({
      title: `Error ${error.value.statusCode}`,
      description: error.value.statusMessage,
      color: 'red',
      icon: 'i-ph-warning-duotone',
    })
  }

  form.value = {
    name: '',
    slug: '',
    description: '',
    color: '#10aa50',
    body: '',
  }
  loading.value = false
  addModal.value = false
  await refresh()
  toast.add({
    title: 'Success!',
    description: 'Post added successfully.',
    icon: 'i-ph-check',
  })
}

const posts = ref<HTMLElement>()

function scrollToPosts() {
  if (posts.value) {
    window.scrollTo({
      behavior: 'smooth',
      top: (posts.value.offsetTop - 77),
    })
  }
}
</script>

<template>
  <UPage>
    <ULandingHero class="md:text-start text-center" orientation="horizontal" :ui="{ container: 'flex lg:gap-12' }">
      <Illustration class="mx-auto hidden h-64 lg:block" />
      <template #title>
        Full Stack with
        <span class="text-primary-500">
          MongoDB
        </span>
      </template>
      <template #description>
        learn how to build a blogging website with authentication with Nuxt 3, Nuxt UI and Mongoose
      </template>
      <template #links>
        <UButton size="xl" color="primary" variant="outline" icon="i-simple-icons-mongodb" @click="scrollToPosts">
          scroll to Posts
        </UButton>
        <UButton size="xl" color="white" icon="i-ph-github-logo-duotone" to="https://github.com/arashsheyda/nuxt-fullstack" target="_blank">
          Source Code
        </UButton>
      </template>
    </ULandingHero>

    <div ref="posts">
      <ULandingSection class="relative !pt-0">
        <template #title>
          <UIcon name="i-logos-mongodb-icon" /> Posts
        </template>
        <!-- <template #top>
        <div class="absolute right-0 mt-3  w-36">
          <UButtonGroup>
            <UButton :title="!order ? 'Ascending' : 'Descending'" color="gray" :icon="!order ? 'i-ph-sort-ascending' : 'i-ph-sort-descending'" @click="order = !order" />
            <USelectMenu v-model="sortingOption" :options="sortingOptions" />
          </UButtonGroup>
        </div>
      </template> -->
        <UPageGrid>
          <ULandingCard
            title="Add"
            description="create new post"
            icon="i-ph-file-plus-duotone"
            class="cursor-pointer border border-primary"
            @click="loggedIn ? addModal = true : modal = true"
          >
            <Hachure />
            <UIcon class="absolute right-0 top-0 opacity-5 w-40 h-40" name="i-ph-newspaper-duotone" />
          </ULandingCard>
          <ULandingCard
            v-if="error"
            :title="`${error?.statusCode} Error: Click to refresh`"
            :description="error?.statusMessage"
            color="red"
            icon="i-ph-warning-duotone"
            class="cursor-pointer border border-red-400"
            @click="refresh"
          >
            <Hachure />
            <UIcon class="absolute right-0 top-0 opacity-5 w-36 h-36" name="i-ph-warning-diamond-duotone" />
          </ULandingCard>
          <template v-if="pending">
            <ULandingCard
              v-for="i in 8"
              title="Fetching..."
              description="please wait until fetch."
              icon="i-ph-circle-light"
              class="border border-cyan-400"
              @click="refresh"
            >
              <USkeleton class="absolute inset-0" :ui="{ rounded: 'rounded-xl' }" />
            </ULandingCard>
          </template>
          <Card v-for="item in data" :key="item.name" :item="item" @delete="deleteModal = true;selected = item" />
        </UPageGrid>
      </ULandingSection>
    </div>

    <UModal v-model="deleteModal" prevent-close>
      <UCard>
        <div>
          Are you sure you want to delete "{{ selected?.name }}" ?
        </div>
        <div class="flex gap-2 mt-4">
          <UButton :disabled="loading" color="gray" @click="deleteModal = false;selected = undefined">
            Cancel
          </UButton>
          <UButton :disabled="loading" color="red" @click="deleteItem">
            Yes, Delete
          </UButton>
        </div>
      </UCard>
    </UModal>

    <USlideover v-model="addModal">
      <UForm class="p-4" :state="form" @submit="save">
        <UFormGroup class="mb-3" label="Name" name="name" required>
          <UInput
            v-model="form.name"
            placeholder="My First Post"
            icon="i-ph-text-h-fill"
          />
        </UFormGroup>

        <UFormGroup class="mb-3" label="URL" name="slug" required>
          <UInput
            v-model="form.slug"
            placeholder="my-first-post"
            icon="i-ph-link"
          />
        </UFormGroup>

        <UFormGroup class="mb-3" label="Color" name="color">
          <UInput
            v-model="form.color"
            type="color"
            icon="i-ph-paint-bucket"
            input-class="p-1 pl-10"
          />
        </UFormGroup>

        <UFormGroup class="mb-3" label="Description" name="description">
          <UInput
            v-model="form.description"
            placeholder="Nuxt is the greatest thing!"
            icon="i-ph-chat-dots-light"
          />
        </UFormGroup>

        <UFormGroup label="Body" name="body">
          <MDCEditor v-model="form.body" />
        </UFormGroup>

        <UButton :disabled="loading" class="mt-4" type="submit">
          Submit
        </UButton>
      </UForm>
    </USlideover>

  </UPage>
</template>

<style>
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}

input[type="color"]::-webkit-color-swatch {
	border: none;
  border-radius: 3px;
}
</style>