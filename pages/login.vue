<script setup lang='ts'>
const model = ref({
  email: '',
  password: ''
})

const save = async (e: Event) => {
  e.preventDefault()
  const { data, error } = await useFetch('/api/user/login', {
    method: 'POST',
    body: model.value
  })

  if (error.value) {
    console.log(error.value)
    return
  }

  if (!data.value?.id) return
  const { user } = useAuth()
  user.value = data.value
  await navigateTo('/')
}

</script>

<template>
  <div class="text-2xl text-center mb-10">login</div>

  <form @submit="save">
    <div class="w-56 shadow-xl p-5 rounded-lg mx-auto border">
      <div class="space-y-1">
      <UInput type="text" v-model="model.email" placeholder="email" />
      <UInput type="text" v-model="model.password" placeholder="password" /></div>
      <div class="text-center mt-4">
        <UButton type="submit">submit</UButton>
      </div>
    </div>
  </form>
</template>

<style scoped></style>