<script setup lang='ts'>
const { user, logOut } = useAuth()

</script>

<template>
  <div class="min-h-screen">
    <div v-if="user?.id">
      <span class="me-3">{{ user?.name }}</span>
      <button @click="logOut" class="text-sky-500 ">log out</button>
    </div>
    <div v-else>
      <NuxtLink :to="'/login'">login</NuxtLink> | <NuxtLink :to="'/signUp'">sign up</NuxtLink>
    </div>
    <UContainer class="min-h-[90vh]">
      <div class="mb-10 text-lg">
        <NuxtLink :to="'/'">home</NuxtLink> | <NuxtLink :to="'/dashboard'">dashboard</NuxtLink>
      </div>
      <slot />
    </UContainer>
  </div>
</template>

<style scoped>
.router-link-active {
  font-weight: 700;
}
</style>