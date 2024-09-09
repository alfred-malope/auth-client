<template>
    <div v-motion="{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }"
        class="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">

        <div class="p-8">
            <h2
                class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Forgot Password
            </h2>

            <form v-if="!isSubmitted" @submit.prevent="handleSubmit">
                <p class="text-gray-300 mb-6 text-center">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                <UserInput :icon="Mail" type="email" placeholder="Email Address" v-model="email" required />

                <button
                    class="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                    type="submit" :disabled="isLoading">
                    <Loader v-if="isLoading" class="size-6 animate-spin mx-auto" />
                    <span v-else>Send Reset Link</span>
                </button>
            </form>

            <div v-else class="text-center">
                <div v-motion="{ initial: { scale: 0 }, animate: { scale: 1 }, transition: { type: 'spring', stiffness: 500, damping: 30 } }"
                    class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail class="h-8 w-8 text-white" />
                </div>
                <p class="text-gray-300 mb-6">
                    If an account exists for {{ email }}, you will receive a password reset link shortly.
                </p>
            </div>
        </div>

        <div class="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <RouterLink to="/login" class="text-sm text-green-400 hover:underline flex items-center">
                <ArrowLeft class="h-4 w-4 mr-2" /> Back to Login
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import UserInput from '../components/UserInput.vue';
import { ArrowLeft, Loader, Mail } from 'lucide-vue-next';
import { directive as motion } from '@vueuse/motion';
import { RouterLink } from 'vue-router';

const email = ref('');
const isSubmitted = ref(false);
const authStore = useAuthStore();
const isLoading = ref(false);

const handleSubmit = async () => {
    isLoading.value = true;
    try {
        await authStore.forgotPassword(email.value);
        isSubmitted.value = true;
    } catch (err) {
        console.error(err.response?.data?.message || "Error submitting request");
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
/* Your styles here */
</style>