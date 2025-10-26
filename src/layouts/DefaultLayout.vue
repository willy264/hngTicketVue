<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="grow relative">
      <div class="absolute top-50 right-10 w-72 h-72 bg-linear-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-2xl" />
      <div class="absolute -bottom-50 left-40 w-96 h-96 bg-linear-to-br from-pink-600/10 to-orange-600/10 rounded-full blur-2xl" />
      <RouterView />
    </main>
    <Footer />
  </div>
</template>