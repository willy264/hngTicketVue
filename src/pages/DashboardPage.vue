<script setup lang="ts">
import { onMounted } from 'vue';
import Button from '../components/ui/Button.vue';
import { useAuthStore } from '../stores/auth';
import { useTicketStore } from '../stores/tickets';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();
const ticketStore = useTicketStore();

async function refreshPage() {
  if (authStore.user) {
    await ticketStore.fetchStats(authStore.user.id);
  }
}

onMounted(async () => {
  if (authStore.user) {
    await ticketStore.fetchStats(authStore.user.id);
  }
});
</script>

<template>
  <div v-if="ticketStore.error" class="flex items-center justify-center min-h-[50vh]">
    <div class="text-center">
      <h2 class="text-xl font-semibold text-red-800 mb-2">Error Loading Dashboard</h2>
      <p class="text-red-600">{{ ticketStore.error }}</p>
      <Button @click="refreshPage" class="mt-4">
        Retry
      </Button>
    </div>
  </div>

  <div v-else class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-gray-600 mt-2">
          Welcome back, {{ authStore.user?.name || "User" }}!
        </p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="p-6 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
        <h2 class="text-xl font-semibold mb-4">Total Tickets</h2>
        <p class="text-4xl font-bold">{{ ticketStore.stats.total }}</p>
      </div>
      <div class="p-6 bg-linear-to-br from-green-500 to-green-600 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
        <h2 class="text-xl font-semibold mb-4">Open Tickets</h2>
        <p class="text-4xl font-bold">{{ ticketStore.stats.open }}</p>
      </div>
      <div class="p-6 bg-linear-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
        <h2 class="text-xl font-semibold mb-4">In Progress</h2>
        <p class="text-4xl font-bold">{{ ticketStore.stats.inProgress }}</p>
      </div>
      <div class="p-6 bg-linear-to-br from-gray-500 to-gray-600 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
        <h2 class="text-xl font-semibold mb-4">Closed Tickets</h2>
        <p class="text-4xl font-bold">{{ ticketStore.stats.closed }}</p>
      </div>
    </div>
    <div class="mt-8">
      <RouterLink
        to="/tickets"
        class="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 inline-flex justify-start justify-items-start items-center ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:shadow active:bg-blue-800"
      >
        Manage Tickets
      </RouterLink>
    </div>
  </div>
</template>