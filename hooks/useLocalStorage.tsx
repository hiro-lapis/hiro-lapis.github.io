import { Kvs, FormatType } from '@/types/Component'

export const useLocalStorage = () => {
  const setStorage = (kvs: Kvs) => {
    localStorage.setItem(kvs.key, kvs.value)
  }
  const getStorage = (key: string, format: FormatType) => {
    return localStorage.getItem(key)
  }
  const initStorage = (key: string) => {
    localStorage.removeItem(key)
  }
  return {
    setStorage,
    getStorage,
    initStorage,
  }
}
