<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
}>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false
});

defineEmits<{
  'update:modelValue': [value: string | number]
}>();

const baseClasses = [
  'w-full mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200',

  'border',
  'rounded-lg',
  'focus:ring-2',
  'focus:ring-blue-500',
  'focus:border-blue-500',
  'disabled:bg-gray-100',
  'disabled:cursor-not-allowed'
].join(' ');
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="baseClasses"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>