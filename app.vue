<template>
  <div>
    <div class="flex justify-center">
      <button
        @click="increment"
      >
        {{ count }}
      </button>
    </div>
    <NuxtWelcome />
  </div>
</template>

<script lang="ts" setup>
console.log('Hello World')

const {
  count,
  increment,
} = useCount()

</script>
