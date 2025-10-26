<script setup lang="ts">

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#000000a3] bg-opacity-50 backdrop-blur-sm" :show="isOpen">
      <div class="relative w-full max-w-md p-8 bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out">
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <Button
            type="button"
            @close="$emit('close')"
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span class="sr-only">Close</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
        <div class="mt-3"><slot/></div>
      </div>
    </div>
</template>