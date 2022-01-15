import styles from "./Timer.module.scss"
import { useState, useEffect } from "react"

export default function Timer({idx, times}) {
    let [time, setTime] = useState(times[idx])
    let [timerRunning, setTimerRunning] = useState(false)

    useEffect(() => {
        setTime(times[idx])
    }, [idx])

    useEffect(() => {
        let timer = setTimeout(() => {
            if (time && timerRunning) {
                setTime(time - 1)
            }
            else {
                setTime(times[idx]);
                setTimerRunning(false);
            }
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [time, timerRunning])
    return <>
        <div className={styles.timer} onClick={() => timerRunning ? setTimerRunning(false) : setTimerRunning(true)}>
            {time}с
        </div>
    </>
}