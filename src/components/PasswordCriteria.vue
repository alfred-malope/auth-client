<template>
    <div class="mt-2 space-y-1">
        <div v-for="(item, index) in criteria" :key="index" class="flex items-center text-xs">
            <component :is="item.met ? Check : X" class="size-4"
                :class="item.met ? 'text-green-500 mr-2' : 'text-gray-500 mr-2'" />
            <span :class="item.met ? 'text-green-500' : 'text-gray-400'">
                {{ item.label }}
            </span>
        </div>
    </div>
</template>

<script>
import { Check, X } from "lucide-vue-next"; 

export default {
    props: {
        password: {
            type: String,
            required: true,
        },
    },
    components: {
        Check,
        X,
    },
    computed: {
        criteria() {
            return [
                { label: "At least 6 characters", met: this.password.length >= 6 },
                { label: "Contains uppercase letter", met: /[A-Z]/.test(this.password) },
                { label: "Contains lowercase letter", met: /[a-z]/.test(this.password) },
                { label: "Contains a number", met: /\d/.test(this.password) },
                { label: "Contains special character", met: /[^A-Za-z0-9]/.test(this.password) },
            ];
        },
    },
};
</script>