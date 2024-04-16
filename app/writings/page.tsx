'use client'
import { useState, useMemo } from 'react'
import { Textarea } from '@nextui-org/react'

const page = () => {
  const [text, setText] = useState('')
  const wordCount = useMemo(() => {
    return text.split(/\s+/).filter(Boolean).length
  }, [text]) // textが更新されるたびに再計算

  return (
    <div className="w-96 mx-auto">
      <div className="my-auto wid">
        <p className="mb-1">wordcount: {wordCount} </p>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="each letter feeds on your future..."
          color="success"
          className="max-w-s my-auto"
        />
      </div>
    </div>
  )
}

export default page
