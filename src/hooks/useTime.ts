import {useEffect, useState} from "react";

export const useTime = ({weather}) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval =  setInterval(() => {
      setTime(new Date(+new Date() - (+new Date().getTimezoneOffset() * -1 * 60000) + ((weather.timezone  / 60) * 60000)) )
    }, 1000)
  }, [weather])

  const getTime = () => {
    const interval =  setInterval(() => {
      setTime(new Date(+new Date() - (+new Date().getTimezoneOffset() * -1 * 60000) + ((weather.timezone  / 60) * 60000)) )
    }, 1000)
    return time
  }

  return getTime
}