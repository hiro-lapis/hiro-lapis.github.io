'use client'
import { useState, useMemo, useEffect } from 'react'
import { useTimer } from '@/hooks/useTimer'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Button, Textarea, Progress, CircularProgress } from '@nextui-org/react'

const Page = () => {
  const [text, setText] = useState('')
  const wordCount = useMemo(() => {
    return text.split(/\s+/).filter(Boolean).length
  }, [text]) // textが更新されるたびに再計算

  const color = useMemo(() => {
    if (wordCount >= 100) return 'success'
    if (wordCount >= 70) return 'primary'
    if (wordCount >= 50) return 'warning'
    return 'default'
  }, [wordCount])
  const { started, remain, rate, switching } = useTimer()

  const { setStorage, getStorage } = useLocalStorage()
  const save = () => {
    if (!text.trim()) return
    setStorage({ key: 'writing', value: text.trim() })
  }
  const load = () => {
    const data = getStorage('writing', 'string')
    if (!data) {
      alert('data not found')
      return
    }
    setText(data)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="my-auto wid">
        <div className="flex space-x-4 pl-2 mb-4">
          <Button
            color={started ? 'default' : 'primary'}
            size="sm"
            onClick={switching}
          >
            {started ? 'stop' : 'start'}
          </Button>
          <Button color={'primary'} variant="flat" size="sm" onClick={save}>
            {'save'}
          </Button>
          <Button color={'primary'} variant="flat" size="sm" onClick={load}>
            {'load'}
          </Button>
        </div>
        <div className="mb-4">
          <p>{'time limit' + remain}</p>
          <Progress
            value={rate}
            maxValue={100}
            aria-label="time limit"
            color="primary"
          />
          {/* <CircularProgress
            size="md"
            value={rate}
            color="success"
            formatOptions={{ style: "percent", }}
            showValueLabel
          /> */}
        </div>
        <div className="mb-4">
          <Progress
            value={wordCount}
            label={`word count(${wordCount})`}
            showValueLabel
            maxValue={100}
            color={color}
          />
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="each letter feeds on your future..."
          aria-label="writing textarea"
          color={color}
          size="lg"
          className="max-w-s my-auto"
          minRows={20}
          maxRows={20}
        />
      </div>
    </div>
  )
}

export default Page
