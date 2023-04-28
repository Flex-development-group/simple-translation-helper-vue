<script setup>
import { computed, useSlots } from "vue";
import { useStorage } from "@vueuse/core";
import TranslationStore from "../stores/TranslationStore.js";

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

const translateMethod = TranslationStore.value.translateMethod

const slots = useSlots()
const hasSlot = computed(() => !!slots.default)

const translation = computed(() => translateMethod(props.translationKey, props.options))

const content = computed(() => {
  // If there is no slot, return the translation with the given translation method
  if(!hasSlot.value) return translation.value === props.translationKey ? props.defaultText : translation.value
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
