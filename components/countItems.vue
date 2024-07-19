<script setup lang='ts'>
defineProps<{
  page: number
  itemsPerPage: number,
  itemsLength: number
  count: any
}>()
</script>

<template>
  <div> {{ `${(page - 1) * itemsPerPage + 1}-${(page - 1) * itemsPerPage +
    itemsLength} of ${count}` }}
  </div>

</template>

<style scoped></style>