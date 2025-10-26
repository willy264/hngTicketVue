<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  variant?: 'default' | 'outline' | 'danger' | 'secondary' | 'success'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>(), {
  variant: 'default',
  type: 'button',
  disabled: false
});

const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2';

const variantClasses = {
  default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  outline: 'border-2 border-current hover:bg-gray-100 focus:ring-current',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
} as const;

const classes = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  props.disabled ? 'opacity-50 cursor-not-allowed' : ''
]);
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>