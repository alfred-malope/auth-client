<template>
    <div v-motion="{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }"
        class="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <div class="p-8">
            <h2 class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Reset Password
            </h2>

            <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>
            <p v-if="message" class="text-green-500 text-sm mb-4">{{ message }}</p>

            <form @submit.prevent="handleSubmit">
                <UserInput :icon="Lock" type="password" placeholder="New Password" v-model="password" required />
                <UserInput :icon="Lock" type="password" placeholder="Confirm New Password" v-model="confirmPassword" required />

                <button
                    class="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                    type="submit" :disabled="isLoading">
                    <Loader v-if="isLoading" class="animate-spin mx-auto" size="24" />
                    <span v-else>Set New Password</span>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useAuthStore from '@/stores/authStore';

import UserInput from '@/components/UserInput.vue';
import { Lock, Loader } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';

const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const route = useRoute();
const toast = useToast();
const authStore = useAuthStore();

const token = computed(() => route.params.token);
const error = computed(() => authStore.error);
const message = computed(() => authStore.message);
const isLoading = computed(() => authStore.isLoading);

const handleSubmit = async () => {
    if (password.value !== confirmPassword.value) {
        toast.error("Passwords do not match");
        return;
    }

    try {
        await authStore.resetPassword(token.value, password.value);
        toast.success("Password reset successfully, redirecting to login page...");
        setTimeout(() => {
            router.push("/login");
        }, 2000);
    } catch (err) {
        toast.error(err.response?.data?.message || "Error resetting password");
    }
};
</script>

<style scoped>
/* Add any necessary styles */
</style>
