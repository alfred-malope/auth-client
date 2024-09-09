<template>
    <div class="relative mb-6">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <!-- Use dynamic component binding for the icon -->
            <component :is="icon" class="size-5 text-green-500" />
        </div>
        <input
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
        />
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: Object,
            required: true,
        },
        modelValue: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        },
    },
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
