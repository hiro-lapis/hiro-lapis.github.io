export const useCount = () => {
    const count = ref(0)
    const increment = () => count.value++
    return { count, increment }
}
