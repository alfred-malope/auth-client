<template>
    <div v-motion="{ initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.5 } }"
        class="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800">

        <h2
            class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
            Dashboard
        </h2>

        <div class="space-y-6">
            <div v-motion="{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 } }"
                class="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
                <h3 class="text-xl font-semibold text-green-400 mb-3">Profile Information</h3>
                <p class="text-gray-300">Name: {{ user.name }}</p>
                <p class="text-gray-300">Email: {{ user.email }}</p>
            </div>

            <div v-motion="{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 } }"
                class="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
                <h3 class="text-xl font-semibold text-green-400 mb-3">Account Activity</h3>
                <p class="text-gray-300">
                    <span class="font-bold">Joined: </span> {{ formatDate(user.createdAt) }}
                </p>
                <p class="text-gray-300">
                    <span class="font-bold">Last Login: </span> {{ formatDate(user.lastLogin) }}
                </p>
            </div>
        </div>

        <div v-motion="{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 } }"
            class="mt-4">
            <button v-motion="{ whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }" @click="handleLogout"
                class="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Logout
            </button>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { formatDate } from '@/utils/date';

const authStore = useAuthStore();
const user = authStore.user;

const handleLogout = () => {
    authStore.logout();
};
</script>

<style scoped>
/* Add any necessary styles */
</style>