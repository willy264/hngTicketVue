<script setup lang="ts">
import { Ticket, Twitter, Github } from 'lucide-vue-next';
</script>

<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <div class="container mx-auto px-4 py-8 flex">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <Ticket class="w-6 h-6 text-blue-600" />
            <span class="text-gray-900 font-semibold">ZenFlow</span>
          </div>
          <p class="text-gray-600 text-sm">
            Streamline your support workflow with our intuitive ticket
            management system.
          </p>
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center space-x-4">
          <a
            href="https://x.com/william_da3447"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <span class="sr-only">Twitter</span>
            <Twitter class="w-5 h-5" />
          </a>
          <a
            href="https://github.com/willy264/hngTicketVue"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <span class="sr-only">GitHub</span>
            <Github class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>