<script setup lang="ts">
import type { Post, SortingFunction } from '~/types'
// TODO: replace with useDateFormat
import { formatTime } from '~/utils'

definePageMeta({
  middleware: 'auth',
})

const { user, clear } = useAuth()

const { data, pending, error, refresh } = await useFetch<Post[]>('/api/users/posts', {
  key: `${user.value.email}-posts`,
})

const view = useSessionStorage<'grid' | 'list'>('nuxt-mongoose-post-view', 'list')
const order = ref(false)
const sortingOptions = ['Views', 'Created', 'Updated']
const sortingOption = ref<typeof sortingOptions[number]>(sortingOptions[1])

const sortingFactors: Record<typeof sortingOptions[number], SortingFunction<any>> = {
  Views: (a, b) => a.hit - b.hit,
  Created: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  Updated: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
}

const formatted = computed(() => {
  return data.value?.slice()
    .sort((a, b) => sortingFactors[sortingOption.value](a, b) * (order.value ? 1 : -1))
})

function changeView() {
  if (view.value === 'grid') {
    view.value = 'list'
  } else {
    view.value = 'grid'
  }
}
</script>

<template>
  <UPage>
    <UPageBody class="relative mt-20">
      <UCard>
        <template #header>
          <div class="sticky top-20 flex justify-between">
            <span>
              total posts: <strong>{{ data?.length }}</strong>
            </span>
            <div>
              <UButtonGroup>
                <UButton :title="!order ? 'Ascending' : 'Descending'" color="white" :icon="!order ? 'i-ph-sort-ascending' : 'i-ph-sort-descending'" @click="order = !order" />
                <USelectMenu v-model="sortingOption" :options="sortingOptions" />
                <UButton color="gray" :icon="view === 'grid' ? 'i-ph-grid-four-duotone' : 'i-ph-list'" @click="changeView" />
              </UButtonGroup>
            </div>
          </div>
        </template>
        <UPageGrid v-if="view === 'grid'">
          <Card v-for="item in formatted" :key="item.name" :item="item" />
        </UPageGrid>
        <div v-else class="flex flex-col gap-8">
          <UCard
            v-for="item in formatted" :key="item.name"
            class="group hover:!ring-[--post-color] transition-all duration-300"
            :style="{ '--post-color': item.color }"
            icon="i-ph-newspaper-duotone"
            :title="item.name"
            :description="item.description"
          >
            <div class="flex justify-between text-sm">
              <div class="flex items-center gap-2">
                <!-- TODO: multiple selec -->
                <!-- <UCheckbox class="mr-2" /> -->
                <UIcon class="w-6 h-6 group-hover:bg-[--post-color] transition-all duration-300" name="i-ph-newspaper-duotone" />
                <span class="font-bold mr-2">
                  {{ item.name }}
                </span>
                <p class="text-xs opacity-60">
                  {{ item.description }}
                </p>
              </div>
              <div class="flex items-center gap-4">
                <UTooltip :text="`${item.hit} Views`">
                  <span class="flex items-center gap-1">
                    <UIcon name="i-ph-fire-duotone" />
                    {{ item.hit }}
                  </span>
                </UTooltip>
                <span v-if="item.createdAt" title="Created At" class="flex items-center gap-1 opacity-40">
                  <UIcon name="i-ph-calendar-blank-duotone" />
                  {{ formatTime(item.createdAt) }}
                </span>
              </div>
              <!-- TODO: actions -->
            </div>
          </UCard>
        </div>
      </UCard>
      <div class="absolute -top-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <UAvatar size="3xl" :src="`https://unavatar.io/gravatar/${user.email}`" class="bg-gray-200 dark:bg-neutral-800" />
        <div class="flex items-center gap-3">
          <span class="sm:block hidden opacity-30">
            {{ user.email }}
          </span>
          <UTooltip text="Sign out">
            <UButton size="xs" icon="i-ph-sign-out" color="orange" variant="outline" @click="clear" />
          </UTooltip>
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
