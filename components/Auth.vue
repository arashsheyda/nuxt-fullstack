<script setup lang="ts">
const { me } = useAuth()
const { auth } = useRuntimeConfig()
const emit = defineEmits(['onLogin', 'onRegister', 'onError'])


const tabs = [
  auth?.mongoose.exclude.includes('login') ? {} : {
    label: 'Log In',
    slot: 'login',
  },
  auth?.mongoose.exclude.includes('register') ? {} : {
    label: 'Register',
    slot: 'register',
  },
]

const hidden = ref(true)

const loginForm = ref({
  email: '',
  password: '',
})

const registerForm = ref({
  email: '',
  password: '',
})

async function login() {
  try {
    const data = await $fetch('/api/auth/login', { method: 'POST', body: loginForm.value })
    if (data.loggedIn) {
      me()
      emit('onLogin', data.user)
    }
  } catch (error: any) {
    emit('onError', error)
  }
}

async function register() {
  try {
    const data = await $fetch('/api/auth/register', { method: 'POST', body: registerForm.value })
    if (data.registered) {
      me()
      emit('onRegister', data.user)
    }
  } catch (error: any) {
    emit('onError', error)
  }
}
</script>

<template>
  <UTabs class="p-4" :items="tabs">
    <template #login="{ item }">
      <UCard>
        <template #header>
          <div class="flex">
            <UIcon class="w-12 h-12 mr-2 bg-primary" name="i-ph-user" />
            <div>
              <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Log in to your account.
              </p>
            </div>
          </div>
        </template>

        <UForm :state="loginForm">
          <UFormGroup label="Email" name="email" class="mb-3" required>
            <UInput v-model="loginForm.email" placeholder="user@gmail.com" icon="i-ph-envelope" />
          </UFormGroup>
          <UFormGroup label="Password" name="password" required>
            <UInput
              v-model="loginForm.password"
              placeholder="password"
              icon="i-ph-lock"
              :type="hidden ? 'password' : 'text'"
              :ui="{ icon: { trailing: { pointer: '' } } }"
            >
              <template #trailing>
                <UButton
                  :icon="hidden ? 'i-ph-eye-closed' : 'i-ph-eye'"
                  variant="link"
                  :padded="false"
                  @click="hidden = !hidden"
                />
              </template>
            </UInput>
          </UFormGroup>
        </UForm>

        <template #footer>
          <UButton class="w-full justify-center" @click="login">
            Log in
          </UButton>
        </template>
      </UCard>
    </template>
    <template #register="{ item }">
      <UCard @submit.prevent="register">
        <template #header>
          <div class="flex">
            <UIcon class="w-12 h-12 mr-2 bg-cyan-400" name="i-ph-user-plus" />
            <div>
              <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Create an account
              </p>
            </div>
          </div>
        </template>

        <UFormGroup label="Email" name="email" class="mb-3" required>
          <UInput v-model="registerForm.email" placeholder="user@gmail.com" icon="i-ph-envelope" />
        </UFormGroup>

        <UFormGroup label="Password" name="password" required>
          <UInput
            v-model="registerForm.password"
            placeholder="password"
            icon="i-ph-lock"
            :type="hidden ? 'password' : 'text'"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                :icon="hidden ? 'i-ph-eye-closed' : 'i-ph-eye'"
                variant="link"
                :padded="false"
                @click="hidden = !hidden"
              />
            </template>
          </UInput>
        </UFormGroup>

        <template #footer>
          <UButton class="w-full justify-center" type="submit" color="cyan">
            Register
          </UButton>
        </template>
      </UCard>
    </template>
  </UTabs>
</template>
