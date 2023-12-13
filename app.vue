<script setup lang="ts">
import type { H3Error } from 'h3'

const toast = useToast()
const router = useRouter()
const { loggedIn, user, clear } = useAuth()
const { modal } = useAuthModal()

const items = [
  [
    {
      label: 'Account',
      slot: 'account',
      disabled: true,
    },
  ],
  [
    {
      label: 'Home',
      icon: 'i-ph-house-duotone',
      click: () => router.replace({ name: 'index' }),
    },
    {
      label: 'About',
      icon: 'i-ph-info-duotone',
      click: () => router.replace({ name: 'about' }),
    },
    {
      label: 'Profile',
      icon: 'i-ph-user-duotone',
      click: () => router.replace({ name: 'profile' }),
    },
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-ph-sign-out',
      click: () => {
        clear()
        toast.add({
          color: 'amber',
          title: 'Logged out!',
          icon: 'i-ph-sign-out',
          description: 'user signed out successfully.',
        })
      },
    },
  ],
]

function onLogin(user: string) {
  modal.value = false
  toast.add({
    title: 'Logged In',
    icon: 'i-ph-sign-in',
    description: `${user} logged in successfully.`,
  })
}

function onRegister(user: string) {
  modal.value = false
  toast.add({
    title: 'Registered',
    icon: 'i-ph-sign-in',
    description: `${user} registered successfully.`,
  })
}

function onError(error: H3Error) {
  toast.add({
    title: `Error ${error.statusCode}`,
    icon: 'i-ph-warning-duotone',
    description: error.statusMessage,
  })
}
</script>

<template>
  <Html>
    <Body>
      <NuxtLoadingIndicator />

      <UHeader>
        <template #logo>
          <Logo class="mt-2 w-64 h-20" />
        </template>
        <template #panel-button>
          <span />
        </template>
        <template #right>
          <Socials />
          <UDropdown v-if="loggedIn" :items="items" mode="hover">
            <UAvatar :src="`https://unavatar.io/gravatar/${user.email}`" class="bg-gray-200 dark:bg-neutral-800" />

            <template #account>
              <div class="text-left w-full">
                <p>
                  Signed in as
                </p>
                <p class="truncate font-medium">
                  {{ user.email }}
                </p>
              </div>
            </template>
          </UDropdown>
          <UButton v-else color="gray" @click="modal = true">
            Login
          </UButton>
        </template>
      </UHeader>

      <UMain>
        <UContainer>
          <NuxtPage />
        </UContainer>
      </UMain>

      <UFooter :ui="{ wrapper: 'border-t border-gray-400/20' }">
        <template #left>
          © {{ new Date().getFullYear() }}
          <NuxtLink class="underline" to="https://github.com/arashsheyda/nuxt-fullstack" target="_blank">
            MIT License
          </NuxtLink>
        </template>
        <template #center>
          <span class="flex items-center text-sm">
            Powered by
            <ULink class="m-1" to="https://nuxt.com" target="_blank">
              <UIcon class="w-5 h-5 mt-1" name="i-logos-nuxt-icon" />
            </ULink>
            <span class="mx-2">
              |
            </span>
            Hosted on
            <ULink class="m-1" to="https://vercel.com" target="_blank">
              <UIcon class="w-5 h-5 mt-1" name="i-logos-vercel-icon" />
            </ULink>
          </span>
        </template>
        <template #right>
          <Socials />
        </template>
      </UFooter>

      <UModal v-model="modal">
        <Auth @onLogin="onLogin" @onRegister="onRegister" @orError="onError" />
      </UModal>

      <Teleport to="body">
        <UNotifications />
      </Teleport>
    </Body>
  </Html>
</template>

<style>
span[class^="i-"] {
  background-size: contain;
  background-position: center;
}
</style>