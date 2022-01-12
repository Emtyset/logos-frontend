import styles from "../../styles/Exercise/ExerciseFull.module.scss"
import {useState, useEffect} from "react"
import timerStyles from "../../styles/Exercise/Timer.module.scss"
import RightArrowSVG from '../../public/arrow-circle-right.svg';
import LeftArrowSVG from '../../public/arrow-circle-left.svg';
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/router";
import axios from "axios";

export default function ExerciseFull({exSet, tiSet, username}) {
    let intro = exSet.intro
    let main = exSet.main
    let ending = exSet.ending

    let introTi = tiSet.intro
    let mainTi = tiSet.main
    let endingTi = tiSet.ending

    let exercises = [intro, ...main, ending]
    let times = [introTi, ...mainTi, endingTi]
    let titles = ["Гимнастика", "Упражнение 1", "Упражнение 2", "Упражнение 3", "Контрольная точка"]
    // Old Way Implementation

    let [idEx, setIdEx] = useState(0)
    let exercise = exercises[idEx]
    let [time, setTime] = useState(times[idEx])
    let [timerRunning, setTimerRunning] = useState(false)

    let router = useRouter()
    const finishExercise = async() => {
        await axios.post("http://localhost:5000/api/user/finishSession/", { username }).then(() =>{
            router.push('/learn')
        })
    }

    useEffect(() => {
        setTime(times[idEx])
    }, [idEx])

    useEffect(() => {
        let timer = setTimeout(() => {
            if (time && timerRunning) {
                setTime(time - 1)
            }
            else {
                setTime(times[idEx]);
                setTimerRunning(false);
            }
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [time, timerRunning])
    
    // 0_0

    return <>
    <div className={styles.exercise_full}>
        <div className={styles.exercise__text}>
            <h1 className={styles.exercise_full__header}>{titles[idEx]}</h1>
            {
                // since textblocks are nested we need to use map twice
                exercise.map(subarray => {
                    return subarray.map((textblock, idx) => {
                        console.log(textblock)
                        if (idx % 2){
                            return <pre className={styles.exercise_full__p_center}>
                                {textblock.replace(/\\\\n/g, 
`
`)}
                            </pre>
                        }
                        return <p className={styles.exercise_full__p}>
                            {textblock}
                            </p>
                    })
                })
                
            }
        </div>
            <div className={styles.exercise_full__button_group}>
                <div className={styles.exercise_full__button_wrapper}>{idEx > 0 ?
                    <button className={styles.exercise_full__button} onClick={() => {setIdEx(idEx - 1); setTimerRunning(false)}}><Image src={LeftArrowSVG} className='arrow' width={100} height={100}/></button>
                    : null}
                </div>
                <div className={timerStyles.timer} onClick={() => timerRunning ? setTimerRunning(false) : setTimerRunning(true)}><div className={timerStyles.timer__seconds}>{time}c</div></div>
                <div className={styles.exercise_full__button_wrapper}>{idEx < exercises.length - 1 ?
                    <button className={styles.exercise_full__button} onClick={() => {setIdEx(idEx + 1); setTimerRunning(false)}}><Image src={RightArrowSVG}  className='arrow' width={100} height={100}/></button>
                    : 
                    <button className={styles.exercise_full__button_finish} onClick={finishExercise}><Link href="/"><a className={styles.exercise_full__link}>✓</a></Link></button>
                    }
                </div>
            </div>
        </div>
    </>
}