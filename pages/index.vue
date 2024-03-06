<template>
  <div>
    <UInput :id='uInput' v-model="value" />
    <UButton
      :id='uButton'
      size="md"
    >スタート</UButton>
    <NuxtWelcome />
  </div>
</template>

<script lang="ts" setup>
console.log('Hello World')

const value = ref('')
const uInput = useId()
const uButton = useId()
</script>
