<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()

auth.initialize()

</script>

<template>
  <RouterView />
</template>

<style>
@import './style.css';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
