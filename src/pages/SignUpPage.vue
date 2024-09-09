<template>
    <div v-motion="{ opacity: 1, y: 0, duration: 0.5 }"
        :style="{ opacity: isLoading ? 0 : 1, transform: isLoading ? 'translateY(20px)' : 'translateY(0)' }"
        class="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <div class="p-8">
            <h2
                class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Create Account
            </h2>

            <form @submit.prevent="handleSignUp">
                <UserInput :icon="User" type="text" placeholder="Full Name" v-model="name" />
                <UserInput :icon="Mail" type="email" placeholder="Email Address" v-model="email" />
                <UserInput :icon="Lock" type="password" placeholder="Password" v-model="password" />
                <p v-if="error" class="text-red-500 font-semibold mt-2">{{ error }}</p>
                <PasswordStrengthMeter :password="password" />

                <button
                    class="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                    :style="{ transform: isLoading ? 'scale(0.98)' : 'scale(1.02)' }" type="submit"
                    :disabled="isLoading">
                    <Loader v-if="isLoading" class="animate-spin mx-auto" size="24" />
                    <span v-else>Sign Up</span>
                </button>
            </form>
        </div>

        <div class="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <p class="text-sm text-gray-400">
                Already have an account?
                <router-link to="/login" class="text-green-400 hover:underline">Login</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

import UserInput from '@/components/UserInput.vue';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter.vue';
import { User, Mail, Lock, Loader } from 'lucide-vue-next';
import { directive as motion } from '@vueuse/motion';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const error = computed(() => authStore.error);
const isLoading = computed(() => authStore.isLoading);

const handleSignUp = async () => {
    try {
        await authStore.signup(email.value, password.value, name.value);
        router.push('/verify-email');
    } catch (error) {
        console.log(error);
    }
};
</script>