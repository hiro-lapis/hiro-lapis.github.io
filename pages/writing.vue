<template>
  <div>
    <div class="btn-box">
      <UButton
      :id='uButton'
      @click="switching"
      size="md"
      >{{ started ? 'stop' : 'start'}}
      </UButton>
      <UButton
      :id='uSaveButton'
      size="md"
      >{{ 'save' }}</UButton>
      <!-- @click="state.setText(text)" -->
    </div>
    <div class="m-auto w-[400px]">
      <UInput
        :id='uInput'
        type="number"
        size="xs"
        min="0"
        v-model="timeLimit"
        :loading="started"
        :disabled="started"
      >
      <template #trailing>
        <span class="text-gray-500 dark:text-gray-400 text-xs">{{ 'limit:' + remain }}</span>
      </template>
      </UInput>
      <!-- <UCheckbox v-model="state.autoSaveText" name="autosave" label="auto save" /> -->
      <p>time: {{ ms }}</p>
      <p>count: {{ wordCount }}</p>
      <UTextarea
        v-model="text"
        :id="uTextArea"
        autoresize
        color="white"
        variant="outline"
        :rows="10"
        :maxrows="20"
        class="w-full m-auto"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const state = useStore()

const useTimer = () => {
  const timer = ref(0)
  const timeLimit = ref(600)
  const started = ref(false)
  const intervalID = ref<NodeJS.Timeout>()
  const start = () => {
    if (started.value) return
    started.value = true
    if (timer.value >= timeLimit.value) {
      timer.value = 0
    }
    if (intervalID.value) return
    intervalID.value = setInterval(() => {
      if (!started.value) {
        return
      }
      if (timer.value >= timeLimit.value) {
        stop()
        alert('time up!')
        clearInterval(intervalID.value)
        return
      }
      timer.value++
    }, 1000)
  }
  const stop = () => {
    started.value = false
  }
  const reset = () => {
    timer.value = 0
    if (started.value) stop()
  }
  const switching = () => {
    if (started.value) stop()
    else start()
  }
  const convertMs = (second: number) => {
    const min = Math.floor(second / 60)
    const m = min < 10 ? '0' + min.toString() : min.toString()
    const sec = second % 60
    const s = sec < 10 ? '0' + sec.toString() : sec.toString()
    return `${m}:${s}`
  }
  const timeLimitMs = computed(() => convertMs(timeLimit.value))
  const ms = computed(() => convertMs(timer.value))
  const remain = computed(() => convertMs(timeLimit.value - timer.value))
  return {
    timer,
    timeLimit,
    timeLimitMs,
    start,
    stop,
    reset,
    remain,
    switching,
    started,
    ms,
  }
}
const {
  start,
  started,
  ms,
  switching,
  timeLimit,
  remain,
} = useTimer()
watch(() => started.value, (newV, oldV) => {
  if (!newV && oldV && (state.enabledAutoSaveText)) {
    state.setText(text.value)
  }
})

const useWriting = () => {
  const text = ref('')
  const wordCount = computed(() => {
    if (text.value.trim() === '') return 0
    return text.value.trim().split(/\s+/).length
  })
  return {
    text,
    wordCount,
  }
}
const {
  text,
  wordCount,
} = useWriting()

onMounted(() => {
  text.value = state.getText ?? ''
  console.log(state.getText)
})

const uInput = useId()
const uTextArea = useId()
const uButton = useId()
const uSaveButton = useId()
</script>
