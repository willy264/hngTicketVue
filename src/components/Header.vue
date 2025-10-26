<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { Ticket } from 'lucide-vue-next';
import Button from './ui/Button.vue';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

function logout() {
  authStore.logout();
  router.push('/auth/login');
}
</script>

<template>
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <RouterLink to="/" class="flex items-center space-x-2">
          <Ticket class="w-6 h-6 text-blue-600" />
          <span class="text-xl font-bold text-gray-900">ZenFlow</span>
        </RouterLink>

        <nav class="flex items-center">
          <div v-if="authStore.user" class="flex items-center space-x-6">
            <RouterLink
              to="/dashboard"
              class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/tickets"
              class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Tickets
            </RouterLink>
            <div class="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
              <div class="hidden md:flex items-center space-x-2">
                <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  {{ authStore.user?.email?.[0]?.toUpperCase() ?? 'U' }}
                </div>
                <span class="text-sm text-gray-600">{{ authStore.user.email }}</span>
              </div>
              <Button
                @click="logout"
                class="bg-white text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-300"
              >
                Logout
              </Button>
            </div>
          </div>
          <ul v-else class="flex items-center space-x-4">
            <li>
              <RouterLink to="/auth/login">
                <Button
                  variant="outline"
                  class="text-white border-white hover:bg-white hover:text-blue-600"
                >
                  Login
                </Button>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/auth/signup">
                <Button class="bg-white text-blue-600 hover:bg-blue-50">
                  Get Started
                </Button>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>