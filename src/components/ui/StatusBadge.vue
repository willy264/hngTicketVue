<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  status: 'open' | 'in_progress' | 'closed'
}>();

const styles = computed(() => {
  switch (props.status) {
    case 'open':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'closed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
});
</script>

<template>
  <span :class="['px-3 py-1 rounded-full text-sm font-medium', styles]">
    {{ status.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}
  </span>
</template>