import { defineStore } from 'pinia'

export const useStore = defineStore(
  'main',
  () => {
    const count = ref(3)
    // const count = ref(3)
    const getCount = computed(() => count.value)
    const doubleCount = computed(() => count.value * 2)
    const increment = () => {
      count.value += 1
    }
    const decrement = () => {
      count.value -= 1
    }

    return { count, getCount, doubleCount, increment, decrement }
  },
  // https://prazdevs.github.io/pinia-plugin-persistedstate/guide/#usage
  {
    persist: true,
  },
)
