import { defineStore } from 'pinia'

export const useStore = defineStore(
  'main',
  () => {
    const count = ref(3)
    const getCount = computed<number>(() => count.value)
    const doubleCount = computed(() => count.value * 2)
    const increment = () => {
      count.value += 1
    }
    const decrement = () => {
      count.value -= 1
    }

    // text
    const text = ref('')
    const setText = (newText: string) => text.value = newText
    const getText = computed(() => text.value)
    const autoSaveText = ref(true)
    const changeAutoSaveText = () => autoSaveText.value = !autoSaveText.value
    const enabledAutoSaveText = computed(() => autoSaveText.value)

    return {
      count,
      getCount,
      doubleCount,
      increment,
      decrement,
      text,
      setText,
      getText,
      autoSaveText,
      enabledAutoSaveText,
      changeAutoSaveText,
     }
  },
  // https://prazdevs.github.io/pinia-plugin-persistedstate/guide/#usage
  {
    persist: true,
  },
)
