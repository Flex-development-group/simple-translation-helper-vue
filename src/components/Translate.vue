<script setup>
import { computed, useSlots } from "vue";
import { useStorage } from "@vueuse/core";

const props = defineProps({
  translationKey: {
    type: String,
    required: true,
  },
  defaultText: {
    type: String,
    required: true
  },
  as: {
    type: String,
    default: 'span',
  },
  options: {
    type: Object,
    default: () => ({}),
  },
})

const slots = useSlots()
const hasSlot = computed(() => !!slots.default)
const content = computed(() => {
  // If there is no slot, return the translation with the given translation method
  // if(!hasSlot.value) return useTranslation(props.translationKey, props.options)
  if(!hasSlot.value) return props.translationKey
  if (slots.default()[0]?.children !== props.translationKey) return slots.default()[0]?.children
  return props.defaultText
})

const showKeys = computed(() => useStorage('show-translation-keys', false))

</script>
<template>
  <Component :is="as">
    <template v-if="showKeys.value">{{ props.translationKey }}</template>
    <slot v-else-if="hasSlot" />
    <template v-else>{{ content }}</template>
  </Component>
</template>

<style scoped></style>
