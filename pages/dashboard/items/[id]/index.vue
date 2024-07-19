<script setup lang='ts'>

const { id } = useRoute().params
const { data } = await useFetch(`/api/item/${id}`)

const deleteItem = async () => {
  if (!confirm('are you sure?')) return
  await useFetch(`/api/item/${id}`, {
    method: 'DELETE'
  })
  navigateTo('/dashboard/items')
}
</script>

<template>
  <DashboardHeader title="item details" :breadcrumb="['items']" />
  <UCard>
    <template #header>
      <div class="flex gap-2 justify-end">
        <UButton label="edit" @click="navigateTo({ path: `/dashboard/items/${id}/edit` })" />
        <UButton label="delete" @click="deleteItem()" />
      </div>
    </template>
    <div class="flex gap-10 flex-wrap">
      <ColValue :value="dateFormat(data?.createdAt || '')" label="createdAt" />
      <ColValue label="ID" :value="data?.id" />
      <ColValue label="name" :value="data?.name" />
      <ColValue label="description" :value="data?.description" />
    </div>
  </UCard>
</template>

<style scoped></style>