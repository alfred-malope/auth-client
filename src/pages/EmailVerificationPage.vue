<template>
    <div v-motion="{ initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }"
        class="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">

        <div class="p-8">
            <h2
                class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Verify Your Email
            </h2>
            <p class="text-center text-gray-300 mb-6">Enter the 6-digit code sent to your email address.</p>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="flex justify-between">
                    <input v-for="(digit, index) in code" :key="index" ref="inputRefs" type="text" maxlength="1"
                        :value="digit" @input="handleChange(index, $event.target.value)"
                        @keydown="handleKeyDown(index, $event)"
                        class="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none" />
                </div>

                <p v-if="error" class="text-red-500 font-semibold mt-2">{{ error }}</p>

                <button
                    class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                    :disabled="isLoading || code.some(digit => !digit)">
                    <Loader v-if="isLoading" class="size-6 animate-spin mx-auto" />
                    <span v-else>Verify Email</span>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { Loader } from 'lucide-vue-next';

const code = ref(["", "", "", "", "", ""]);
const inputRefs = ref([]);
const authStore = useAuthStore();
const isLoading = ref(authStore.isLoading);
const error = ref(authStore.error);
const router = useRouter();

const handleChange = (index, value) => {
    const newCode = [...code.value];

    // Handle pasted content
    if (value.length > 1) {
        const pastedCode = value.slice(0, 6).split("");
        for (let i = 0; i < 6; i++) {
            newCode[i] = pastedCode[i] || "";
        }
        code.value = newCode;

        // Focus on the last non-empty input or the first empty one
        const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
        inputRefs.value[focusIndex].focus();
    } else {
        newCode[index] = value;
        code.value = newCode;

        // Move focus to the next input field if value is entered
        if (value && index < 5) {
            inputRefs.value[index + 1].focus();
        }
    }
};

const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code.value[index] && index > 0) {
        inputRefs.value[index - 1].focus();
    }
};

const handleSubmit = async () => {
    const verificationCode = code.value.join("");
    try {
        await authStore.verifyEmail(verificationCode);
        router.push('/');
    } catch (err) {
        console.error(err.message || "Verification failed");
    }
};

// Auto submit when all fields are filled
watch(code, (newValue) => {
    if (newValue.every((digit) => digit !== "")) {
        handleSubmit();
    }
});
</script>

<style scoped>
/* Add any necessary styles */
</style>