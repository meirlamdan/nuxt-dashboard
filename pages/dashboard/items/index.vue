<script setup lang="ts">

const page = ref(Number(useRoute().query.page || 1))
const itemsPerPage = 5

const openLink = (id: string) => {
  navigateTo(`/dashboard/items/${id}`)
}
const filters = ref({
  name: ''
})

const query = computed(() => {
  return {
    limit: itemsPerPage,
    offset: (page.value - 1) * itemsPerPage,
    order: 'createdAt DESC',
    filters: filters.value
  }
})

const { data: items, pending } = await useFetch('/api/item', {
  query: query,
})

const columns = [{
  key: 'createdAt',
  label: 'createdAt'
}, {
  key: 'name',
  label: 'name'
}, {
  key: 'description',
  label: 'description'
}]

watch(page, () => {
  navigateTo({ query: { page: page.value } })
})

</script>
<template>
  <div>
    <dashboardHeader title="items" :breadcrumb="['items']" />
    <div>
      <UCard>
        <template #header>
          <div class="flex justify-between">
            <div>
              <UInput v-model="filters.name" @change="page = 1" placeholder="search by name" />
            </div>
            <UButton label="add item" @click="navigateTo('/dashboard/items/add')" />
          </div>

        </template>
        <template #default>
          <UTable v-if="items"
            :rows="items?.rows?.map((row) => ({ ...row, createdAt: dateFormat(row.createdAt!) })) || []" :columns
            @select="openLink($event.id)" :loading="pending" />
        </template>
        <template #footer>
          <div class="flex justify-between">
            <CountItems :count="items?.count" :itemsPerPage :page :itemsLength="items?.rows?.length || 0" />
            <UPagination v-model="page" :page-count="itemsPerPage" :total="items?.count || 0" />
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>