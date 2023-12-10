<script setup lang="ts">
import type { Post } from '~/types'
// TODO: replace with useDateFormat
import { formatTime } from '~/utils'

defineProps<{
  item: Post
}>()

const emit = defineEmits(['delete'])

const { user } = useAuth()

function deleteItem() {
  emit('delete')
}
</script>

<template>
  <ULandingCard
    :key="item.name"
    class="group"
    :color="item.color"
    :to="{
      name: 'post',
      params: { post: item.slug },
    }"
    icon="i-ph-newspaper-duotone"
    :title="item.name"
    :description="item?.description"
  >
    <div class="absolute right-4 flex gap-2">
      <template v-if="user.email === item.user.email">
        <UTooltip text="Delete">
          <UButton
            class="opacity-10 group-hover:opacity-100 transition-all duration-500"
            color="red"
            variant="outline"
            size="xs"
            icon="i-ph-trash-duotone"
            @click="deleteItem"
          />
          <!-- deleteModal = true;selected = item -->
        </UTooltip>
        <UTooltip text="Edit">
          <UButton
            class="opacity-10 group-hover:opacity-100 transition-all duration-500"
            color="cyan"
            variant="outline"
            size="xs"
            icon="i-ph-pen-duotone"
            :to="{
              name: 'post',
              params: { post: item.slug },
              query: { edit: 'true' },
            }"
          />
        </UTooltip>
      </template>
      <span v-else class="flex items-center gap-1 text-sm opacity-40">
        <UIcon name="i-ph-user-duotone" />
        {{ item.user.email }}
      </span>
    </div>

    <div class="flex justify-between text-sm">
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
  </ULandingCard>
</template>
