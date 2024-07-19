<script setup lang='ts'>
const model = ref({
  name: '',
  email: '',
  password: ''
})

const save = async (e: Event) => {
  e.preventDefault()
  await useFetch('/api/user/signUp', {
    method: 'POST',
    body: model.value,
    watch: false
  })
}

</script>

<template>
  <div>
    <div class="text-2xl mb-10 text-center">sign up</div>
    <form @submit="save">
      <div class="w-56  shadow-xl p-5 rounded-lg mx-auto border">
        <div class="space-y-1">
          <UInput type="text" v-model="model.name" placeholder="name" />
          <UInput type="text" v-model="model.email" placeholder="email" />
          <UInput type="text" v-model="model.password" placeholder="password" />
        </div>
        <div class="text-center mt-4">
          <UButton type="submit">submit</UButton>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>