'use client'
import { useState, useMemo } from 'react'
import { Textarea } from '@nextui-org/react'

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

  return (
    <div className="w-96 mx-auto">
      <div className="my-auto wid">
        <p className="pl-2 mb-1">wordcount: {wordCount} </p>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="each letter feeds on your future..."
          color={color}
          className="max-w-s my-auto"
          minRows={20}
          maxRows={20}
        />
      </div>
    </div>
  )
}

export default Page
