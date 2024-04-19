import { useState, useMemo, useEffect, } from 'react'

export const useTimer = () => {
    const [time, setTime] = useState(0)
    const [timeLimit, setTimeLimit] = useState(600)
    const [started, setStarted] = useState(false)
    const [intervalID, setIntervalID] = useState<NodeJS.Timeout>()

    useEffect(() => {
        if (time >= timeLimit) {
            setTime(0)
        }
        if (started) {
            setIntervalID(setInterval(() => {
                setTime((prev) => prev + 1)
            }, 1000))
        } else {
            clearInterval(intervalID)
        }

        if (time >= timeLimit) {
            stop()
            clearInterval(intervalID)
            return
        }
        return () => {
            clearInterval(intervalID)
        }
    }
    , [started])
    const start = () => {
        if (started) return
        setStarted(true)
        if (time >= timeLimit) {
            setTime(0)
        }
    }
    const stop = () => {
        setStarted(false)
    }
    const switching = () => {
        if (started) stop()
            else start()
    }
    const reset = () => {
        setTime(0)
        if (started) stop()
    }
    const convertMs = (second: number) => {
        const min = Math.floor(second / 60)
        const m = min < 10 ? '0' + min.toString() : min.toString()
        const sec = second % 60
        const s = sec < 10 ? '0' + sec.toString() : sec.toString()
        return `${m}:${s}`
    }
    const timeLimitMs = useMemo(() => convertMs(timeLimit), [])
    const ms = useMemo(() => convertMs(time), [time])
    const remain = useMemo(() => convertMs(timeLimit - time), [time])
    const rate = useMemo(() => {
        return 100 - Math.floor(time / timeLimit * 100)
      }, [time,])
    return {
        time,
        timeLimit,
        start,
        stop,
        reset,
        switching,
        started,
        ms,
        setTimeLimit,
        timeLimitMs,
        remain,
        rate,
    }

}
