import { useEffect, useState } from 'react'

const TIME_ZONE_OFFSET = 9

const MILLISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24
const DAYS_PER_MONTH = 30
const MONTHS_PER_YEAR = 12

const useTimeAgo = (timestamp: Date) => {
  const [timeAgo, setTimeAgo] = useState<string>('')

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date()
      const previousTime = new Date(timestamp)
      //new Date를 하면 kst로 변환되어 +9시간 되는데 이미 db에 kst로 변환되어 저장되어있기때문에 아래처럼 함
      previousTime.setHours(previousTime.getHours() - TIME_ZONE_OFFSET)

      const timeDifference = currentTime.getTime() - previousTime.getTime()

      const seconds = Math.floor(timeDifference / MILLISECONDS_PER_SECOND)
      const minutes = Math.floor(seconds / SECONDS_PER_MINUTE)
      const hours = Math.floor(minutes / MINUTES_PER_HOUR)
      const days = Math.floor(hours / HOURS_PER_DAY)
      const months = Math.floor(days / DAYS_PER_MONTH)
      const years = Math.floor(months / MONTHS_PER_YEAR)

      if (years > 0) setTimeAgo(`${years}달 전`)
      else if (months > 0) setTimeAgo(`${months}달 전`)
      else if (days > 0) setTimeAgo(`${days}일 전`)
      else if (hours > 0) setTimeAgo(`${hours}시간 전`)
      else if (minutes > 0) setTimeAgo(`${minutes}분 전`)
      else setTimeAgo(`${seconds}초 전`)
    }

    const interval = setInterval(calculateTimeAgo, MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE) // 매 분마다 갱신

    calculateTimeAgo() // 처음 한 번은 직접 호출

    return () => clearInterval(interval)
  }, [timestamp])

  return timeAgo
}

export default useTimeAgo
