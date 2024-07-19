<script setup lang='ts'>
defineProps<{
  value?: any;
  label: string
}>()
</script>

<template>
  <div class="">
    <div class="text-sm text-gray-500 font-bold">{{ label }}</div>
    <div>
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<style scoped></style>