<script setup>

const page = ref(Number(useRoute().query.page || 1))
const itemsPerPage = 5
// const openLink = (id: string) => {
//   navigateTo(`/dashboard/items/${id}`)
// }
const filters = ref({
  name: '',
  email: ''
})

const query = computed(() => {
  return {
    limit: itemsPerPage,
    offset: (page.value - 1) * itemsPerPage,
    order: 'createdAt DESC',
    filters: filters.value
  }
})

const { data: users, loading } = await useFetch('/api/user/', {
  query: query
})

const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'name',
  label: 'Name'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'role',
  label: 'Role'
}, 
{
  key: '',
  label: 'Actions'
}
]

</script>
<template>
  <div>
    <dashboardHeader title="users" :breadcrumb="['users']" />
    <div class="p-4">
      <UCard class="">
        <template #header>
          <div class="flex gap-2">
            <UInput v-model="filters.name" placeholder="search by name" />
            <UInput v-model="filters.email" placeholder="search by email" />
          </div>
        </template>
        <template #default>
          <UTable :rows="users.rows" :columns @select="openLink" :loading v-if="users" />
        </template>
        <template #footer>
          <div class="flex justify-between">
            <CountItems :count="users?.count" :itemsPerPage :page :itemsLength="users?.rows?.length" />
            <UPagination v-model="page" :page-count="itemsPerPage" :total="users?.count" />
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>