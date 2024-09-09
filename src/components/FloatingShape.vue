<template>
    <motion.div :class="['absolute rounded-full opacity-20 blur-xl', color, size]"
        :style="{ top: top, left: left}" :animate="{
            y: ['0%', '100%', '0%'],
            x: ['0%', '100%', '0%'],
            rotate: [0, 360]
        }" :transition="{
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        delay: delay
    }" aria-hidden="true" />
</template>

<script>
import { directive as motion } from '@vueuse/motion';

export default {
    components: {
        motion,
    },
    props: {
        color: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        top: {
            type: String,
            required: true,
        },
        left: {
            type: String,
            required: true,
        },
        delay: {
            type: String,
            default: 0,
        },
    },
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>