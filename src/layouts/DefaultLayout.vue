<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="grow relative">
      <div class="absolute top-10 right-10 w-72 h-72 bg-linear-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-2xl" />
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-linear-to-br from-pink-600/10 to-orange-600/10 rounded-full blur-2xl" />
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-linear-to-br from-green-600/5 to-blue-600/5 rounded-full blur-2xl" />
      <RouterView />
    </main>
    <Footer />
  </div>
</template>