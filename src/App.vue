<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
    <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay="0" />
    <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay="5" />
    <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay="2" />

    <router-view v-if="!isCheckingAuth" />
    <LoadingSpinner v-else />
    
    <Toaster />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';
import FloatingShape from './components/FloatingShape.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import { Toaster } from 'vue-toastification';

const authStore = useAuthStore();
const isCheckingAuth = ref(true);

onMounted(async () => {
  try {
    await authStore.checkAuth();
  } catch (error) {
    console.error('Error during authentication check:', error);
  } finally {
    isCheckingAuth.value = false;
  }
});
</script>

<style>
/* Your styles here */
</style>
