<template>
    <div
        class="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
        <!-- Simple Loading Spinner -->
        <motion.div class="w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full"
            :animate="{ rotate: 360 }" :transition="{ duration: 1, repeat: Infinity, ease: 'linear' }" />
    </div>
</template>

<script>
import { directive as motion } from '@vueuse/motion';

export default {
    components: {
        motion,
    },
};
</script>

<style scoped>
/* Add any necessary scoped styles */
</style>