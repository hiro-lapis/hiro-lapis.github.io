'use client'
import { useState, useMemo, useEffect } from 'react'
import { useTimer } from '@/hooks/useTimer'
import { Button, Textarea, Progress } from '@nextui-org/react'

const Page = () => {
  const [text, setText] = useState('')
  const wordCount = useMemo(() => {
    return text.split(/\s+/).filter(Boolean).length
  }, [text]) // textが更新されるたびに再計算
  // indep,integどちらを練習するか
  const [mode, setMode] = useState('indep')
  const color = useMemo(() => {
    if (mode === 'indep') {
      if (wordCount >= 100) return 'success'
      if (wordCount >= 70) return 'primary'
      if (wordCount >= 50) return 'warning'
    }
    if (mode === 'integ') {
      if (wordCount >= 130) return 'success'
      if (wordCount >= 90) return 'primary'
      if (wordCount >= 50) return 'warning'
    }
    return 'default'
  }, [wordCount])
  const { remain, rate, switching, setTimeLimit, time, convertMs } = useTimer()

  const initialIndepWordCounts = [
    { second: 15, count: 0 },
    { second: 30, count: 0 },
    { second: 45, count: 0 },
  ]
  const initialIntegWordCounts = [
    { second: 15, count: 0 },
    { second: 35, count: 0 },
    { second: 60, count: 0 },
  ]
  const [wordCounts, setWordCounts] = useState(initialIndepWordCounts)
  // word count record based on threshold second
  useMemo(() => {
    const index = wordCounts.map((c) => c.second).findIndex((w) => w === time)
    if (index !== -1) {
      setWordCounts(
        wordCounts.map((w, i) =>
          i === index
            ? { second: wordCounts[index].second, count: wordCount }
            : w,
        ),
      )
    }
  }, [time])

  // voice recording
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState<string>('')
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  // recognition setting(client side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const Recognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new Recognition()
      recognition.lang = 'en-US'
      recognition.continuous = true
      recognition.interimResults = true
      setRecognition(recognition)
    }
    setTimeLimit(45)
  }, [])
  // record start/stop
  useEffect(() => {
    if (!recognition) return
    setTimeLimit(mode === 'indep' ? 45 : 60)
    switching()
    if (isRecording) {
      recognition.start()
    } else {
      recognition.stop()
    }
  }, [isRecording])
  // recording handler
  useEffect(() => {
    if (!recognition) return
    recognition.onresult = (event) => {
      const results = event.results
      for (let i = event.resultIndex; i < results.length; i++) {
        if (results[i].isFinal) {
          setText((prevText) => prevText + results[i][0].transcript)
          setTranscript('')
        } else {
          setTranscript(results[i][0].transcript)
        }
      }
    }
    // error handler
    recognition.onerror = (e) => {
      if (e.error === 'no-speech') {
        // error is caused by no speech, restart recording
        recognition.start()
      }
    }
  }, [recognition])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="my-auto wid">
        {/* button group */}
        <div className="flex space-x-4 pl-2 mb-4">
          <Button
            color={isRecording ? 'default' : 'primary'}
            size="sm"
            onClick={() => {
              setIsRecording((prev) => !prev)
            }}
            isLoading={isRecording}
          >
            {isRecording ? 'stop' : 'rec'}
          </Button>
          <Button
            color={'default'}
            size="sm"
            onClick={() => {
              setText('')
            }}
          >
            reset
          </Button>
          <Button
            color={'default'}
            size="sm"
            onClick={() => {
              setMode(mode === 'indep' ? 'integ' : 'indep')
            }}
          >
            {mode}
          </Button>
        </div>
        <div className="mb-4">
          <p>{'time limit ' + remain}</p>
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
            maxValue={['indep'].includes(mode) ? 100 : 150}
            color={color}
          />
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="each letter serve as a foundation for your future..."
          aria-label="writing textarea"
          color={color}
          size="lg"
          className="max-w-s my-auto"
          minRows={20}
          maxRows={20}
        />
        <div className="mb-2">
          <p>transcript:{transcript}</p>
        </div>
        {wordCounts.map((wordCount) => (
          <p key={wordCount.second} className="mt-1 ml-2">
            {convertMs(wordCount.second)}sec({wordCount.count})
          </p>
        ))}
      </div>
    </div>
  )
}

export default Page
