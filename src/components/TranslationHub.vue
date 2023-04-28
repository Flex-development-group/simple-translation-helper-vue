<script setup>
import { useStorage } from "@vueuse/core"
import { computed, ref, useSlots, watch } from "vue"

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    validator: (value) => ["top-left", "top-right", "bottom-left", "bottom-right"].includes(value),
    default: "top-right",
  },
})

const position = ref(props.position)

switch (position.value) {
  case "top-left":
    position.value = "top-8 left-8"
    break
  case "top-right":
    position.value = "top-8 right-8"
    break
  case "bottom-left":
    position.value = "bottom-8 left-8"
    break
  case "bottom-right":
    position.value = "bottom-8 right-8"
    break
}

const slots = useSlots()
const hasSlot = computed(() => !!slots.default)

const showKeys = useStorage("show-translation-keys", false)
const toggleShowKeys = () => (showKeys.value = !showKeys.value)

if (!props.active) {
  showKeys.value = false
}
</script>

<template v-if="active">
  <slot v-if="hasSlot" :toggle-translation-keys="toggleShowKeys" />
  <div v-else class="fixed" :class="position">
    <button
        @click="toggleShowKeys"
        class="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm text-white shadow-sm font-sm hover:text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped></style>
