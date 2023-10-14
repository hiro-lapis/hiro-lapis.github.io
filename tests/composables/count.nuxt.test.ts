// @vitest-environment nuxt

// import tessting composables
import { describe, test, expect } from 'vitest'
// import tesst target function
import { useCount } from '../../composables/count'
// import utils
import { setup, $fetch } from '@nuxt/test-utils'


describe('My test', async () => {
  // // wait for Nuxt to be ready (ex.ref, composables)
  // await setup({
  //   // test context options
  // })
  test('my test', () => {
    const { count, increment } = useCount()
    increment()
    expect(count.value).toBe(1)
  })
})
