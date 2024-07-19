<script setup lang="ts">

const props = defineProps<{
  title: string
  breadcrumb: string[]
}>()

const links = [
  {
    label: 'users',
    icon: 'i-heroicons-users',
    to: '/dashboard/users'
  },
  {
    label: 'charts',
    icon: 'i-heroicons-chart-bar',
    to: '/dashboard/charts'
  },
  {
    label: 'items',
    icon: 'i-heroicons-shopping-bag',
    to: '/dashboard/items'
  }
]

const homeLink = {
  label: 'home',
  icon: 'i-heroicons-home',
  to: '/'
}

const dashboardLink = {
  label: 'dashboard',
  icon: 'i-heroicons-squares-2x2',
  to: '/dashboard'
}


const linksArr = computed(() => {
  const arr = [homeLink, dashboardLink]
  if (props.breadcrumb) {
    arr.push(...props.breadcrumb.map(bc => links.find(l => l.label === bc)!))
  }
  return arr
})
const { user } = useAuth()
</script>
<template>

  <div class="flex justify-between me-2">
    <UBreadcrumb :links="linksArr" class="mt-8" />
    <DashboardUserPopover class="mt-8" v-if="user" :user="user" />
  </div>
  <div class="my-10 ms-3 text-lg">{{ title }}</div>

</template>