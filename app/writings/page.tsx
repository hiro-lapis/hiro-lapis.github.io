'use client'
import { useState, useMemo, useEffect } from 'react'
import { firaMono, raleway, roboto, robotoMono } from '@/app/fonts'
import { useTimer } from '@/hooks/useTimer'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Button, Textarea, Progress } from '@nextui-org/react'

const Page = () => {
  const [text, setText] = useState('')
  const wordCount = useMemo(() => {
    return text.split(/\s+/).filter(Boolean).length
  }, [text]) // textが更新されるたびに再計算
  // indep,integどちらを練習するか
  const [mode, setMode] = useState('initial')
  const color = useMemo(() => {
    if (mode === 'indep') {
      if (wordCount >= 100) return 'success'
      if (wordCount >= 70) return 'primary'
      if (wordCount >= 50) return 'warning'
    }
    if (mode === 'integ') {
      if (wordCount >= 300) return 'success'
      if (wordCount >= 220) return 'primary'
      if (wordCount >= 180) return 'warning'
    }
    return 'default'
  }, [wordCount])
  const { started, remain, rate, switching, setTimeLimit, time, convertM } =
    useTimer()
  const start = (mode: 'indep' | 'integ') => {
    setMode(mode)
    if (mode == 'integ') {
      setTimeLimit(60 * 20)
      setWordCounts(initialIntegWordCounts)
    } else {
      setTimeLimit(60 * 10)
      setWordCounts(initialIndepWordCounts)
    }
    switching()
  }

  const initialIndepWordCounts = [
    { second: 60, count: 0 },
    { second: 120, count: 0 },
    { second: 180, count: 0 },
    { second: 240, count: 0 },
    { second: 300, count: 0 },
    { second: 360, count: 0 },
    { second: 420, count: 0 },
    { second: 480, count: 0 },
    { second: 540, count: 0 },
    { second: 600, count: 0 },
  ]
  const initialIntegWordCounts = [
    { second: 240, count: 0 },
    { second: 480, count: 0 },
    { second: 720, count: 0 },
    { second: 960, count: 0 },
    { second: 1200, count: 0 },
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
  const placeHolderList = [
    'each letter makes you better',
    'only action change your life',
    'have a nice day, have a nice study',
    'run first. pleasure comes after you',
    'great results love tireless efforts',
    'just do it',
  ]
  const getRandomArbitrary = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
  }
  const [placeHolderText, setplaceHolderText] = useState('')
  useEffect(() => {
    setplaceHolderText(
      placeHolderList[getRandomArbitrary(0, placeHolderList.length)],
    )
  }, [])

  // set font family
  const [fontFamily, setFontFamily] = useState('filaMono')
  const changeFont = () => {
    if (fontFamily === firaMono.className) {
      setFontFamily(raleway.className)
      return
    }
    if (fontFamily === raleway.className) {
      setFontFamily(roboto.className)
      return
    }
    if (fontFamily === roboto.className) {
      setFontFamily(robotoMono.className)
      return
    }
    setFontFamily(firaMono.className)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="my-auto wid">
        <div className="flex space-x-4 pl-2 mb-4">
          {['initial', 'indep'].includes(mode) ? (
            <Button
              color={started ? 'default' : 'primary'}
              size="sm"
              onClick={() => start('indep')}
            >
              {started ? 'stop' : 'indep(10m)'}
            </Button>
          ) : (
            ''
          )}
          {['initial', 'integ'].includes(mode) ? (
            <Button
              color={started ? 'default' : 'primary'}
              size="sm"
              onClick={() => start('integ')}
            >
              {started ? 'stop' : 'integ(20m)'}
            </Button>
          ) : (
            ''
          )}
          <Button color={'primary'} variant="flat" size="sm" onClick={save}>
            {'save'}
          </Button>
          <Button color={'primary'} variant="flat" size="sm" onClick={load}>
            {'load'}
          </Button>
          <Button
            color={'primary'}
            variant="flat"
            size="sm"
            onClick={changeFont}
          >
            {'change font'}
          </Button>
          <Button
            color={'primary'}
            variant="flat"
            size="sm"
            onClick={changeFont}
          >
            {'change font'}
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
            maxValue={['indep', 'initial'].includes(mode) ? 120 : 300}
            color={color}
          />
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          label={placeHolderText}
          aria-label="writing textarea"
          size="lg"
          className={`max-w-s my-auto ${fontFamily}`}
          minRows={20}
          maxRows={20}
        />
        {wordCounts.map((wordCount) => (
          <span key={wordCount.second} className="mt-1 ml-2">
            {convertM(wordCount.second)}m({wordCount.count})
          </span>
        ))}
      </div>
    </div>
  )
}

export default Page
