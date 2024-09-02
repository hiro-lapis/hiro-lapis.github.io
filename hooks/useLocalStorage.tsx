import { Kvs, FormatType } from '@/types/Component'

export const useLocalStorage = () => {
  const setStorage = (kvs: Kvs) => {
    localStorage.setItem(kvs.key, kvs.value)
  }
  const getStorage = (key: string, format: FormatType) => {
    return localStorage.getItem(key)
  }
  // writing
  const WRITING_PREFIX = 'writing-'
  const WRITING_LIST = 'writinglist'
  const getWritingListStorage = () => {
    return getStorage(WRITING_LIST, 'string')
  }
  const getWritingStorage = (key: string) => {
    return getStorage(WRITING_PREFIX + key, 'string')
  }
  const setWritingStorage = (kvs: Kvs) => {
    // check if exist same title data
    const data = localStorage.getItem(`${WRITING_PREFIX}${kvs.key}`)
    if (
      data &&
      !confirm('there is already exists data. are you ok overwrite?')
    ) {
      return
    }
    if (kvs.key.includes(',') || kvs.key.includes(WRITING_PREFIX)) {
      alert('please rename other title')
      return
    }
    // list info
    const listInfo = getStorage(WRITING_LIST, 'string')
    if (listInfo && !listInfo?.split(',').includes(kvs.key)) {
      setStorage({ key: WRITING_LIST, value: listInfo + kvs.key })
    }
    kvs.key += WRITING_PREFIX + kvs.key
    setStorage(kvs)
  }
  const initStorage = (key: string) => {
    localStorage.removeItem(key)
  }
  return {
    setStorage,
    getStorage,
    setWritingStorage,
    getWritingStorage,
    getWritingListStorage,
    initStorage,
  }
}
