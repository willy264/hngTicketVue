<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()

// Initialize auth state from localStorage on app load
auth.initialize()

// No need for watch since auth store already handles persistence
</script>

<template>
  <RouterView />
</template>

<style>
@import './styles/main.css';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
