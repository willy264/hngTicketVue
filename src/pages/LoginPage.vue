<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'sonner';
import { ShieldCheck, Zap, FolderKanban } from 'lucide-vue-next';
import Button from '../components/ui/Button.vue';
import Input from '../components/ui/Input.vue';
import { useAuthStore } from '../stores/auth';
import { mockAuthApi } from '../lib/utils';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const features = [
  { icon: ShieldCheck, text: "Secure authentication" },
  { icon: Zap, text: "Real-time updates" },
  { icon: FolderKanban, text: "Organized ticket management" },
];

async function handleSubmit(e: Event) {
  e.preventDefault();
  
  if (!email.value || !password.value) {
    toast.error("Please fill in all fields");
    return;
  }

  isLoading.value = true;
  try {
    const user = await mockAuthApi.login(email.value, password.value);
    authStore.login(user);
    toast.success("Logged in successfully");
    router.push('/dashboard');
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "An error occurred");
    password.value = "";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex w-full">
    <div class="hidden lg:flex lg:w-1/2 justify-center relative bg-blue-600 p-12">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div
          class="absolute inset-0"
          :style="{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23fff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E')`,
            backgroundSize: '24px 24px'
          }"
        />
      </div>
      <div class="relative z-10 flex flex-col justify-center max-w-md">
        <h1 class="text-5xl font-bold text-white mb-8">Welcome Back!</h1>
        <p class="text-xl text-blue-100">
          Sign in to your account to manage tickets and track support requests.
        </p>
        <div class="mt-12 space-y-8">
          <div v-for="(feature, idx) in features" :key="idx" class="flex items-center space-x-4 text-blue-100">
            <component :is="feature.icon" class="w-6 h-6" />
            <span>{{ feature.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p class="mt-2 text-gray-600">Sign in to continue to your dashboard</p>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                type="email"
                id="email"
                v-model="email"
                :disabled="isLoading"
                class="mt-1"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                id="password"
                v-model="password"
                :disabled="isLoading"
                class="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            :disabled="isLoading"
            class="w-full"
          >
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </Button>

          <p class="text-center text-sm text-gray-600">
            Don't have an account?
            <router-link
              to="/auth/signup"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

