<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  priority: 'low' | 'medium' | 'high'
}>();

const styles = computed(() => {
  switch (props.priority) {
    case 'low':
      return 'bg-gray-100 text-gray-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
});
</script>

<template>
  <span :class="['px-3 py-1 rounded-full text-sm font-medium', styles]">
    {{ priority.charAt(0).toUpperCase() + priority.slice(1) }}
  </span>
</template>