<template>
  <div>
    <UInput :id='uInput' v-model="value" />
    <UButton
      :id='uButton'
      @click=""
      size="md"
    >スタート</UButton>
    <NuxtWelcome />
  </div>
</template>

<script lang="ts" setup>
console.log('Hello World')

const value = useState('value', () => '')
const uInput = useId()
const uButton = useId()
</script>
