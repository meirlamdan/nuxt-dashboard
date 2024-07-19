<script setup lang='ts'>
 

defineProps<{
  user: User
}>()

const { logOut } = useAuth()
</script>

<template>
  <UPopover>
    <div class="text-sm">{{ user.name || user.email }}</div>

    <template #panel="{ close }">
      <div class="p-1 w-40">

        <div>
          <UButton label="הצג פרופיל" block @click="close" />
        </div>
        <div>
          <UButton @click="logOut" variant="soft" label="התנתק" block
            trailing-icon="i-heroicons-arrow-left-on-rectangle" />
        </div>
      </div>
    </template>
  </UPopover>
</template>
