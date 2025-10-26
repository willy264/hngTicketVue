import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../lib/types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isLoading = ref(true);

  function initialize() {
    const storedSession = localStorage.getItem("ticketapp_session");
    if (storedSession) {
      try {
        const userData = JSON.parse(storedSession);
        user.value = userData;
      } catch (error) {
        console.error("Failed to parse session data:", error);
        localStorage.removeItem("ticketapp_session");
      }
    }
    isLoading.value = false;
  }

  function login(userData: User) {
    user.value = userData;
    localStorage.setItem("ticketapp_session", JSON.stringify(userData));
  }

  function logout() {
    user.value = null;
    localStorage.removeItem("ticketapp_session");
  }

  return {
    user,
    isLoading,
    initialize,
    login,
    logout
  };
});