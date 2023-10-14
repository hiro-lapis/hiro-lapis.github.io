<template>
    <div>
      <div class="flex justify-center">
        <button
          @click="increment"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
