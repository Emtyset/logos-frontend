import styles from "../../styles/exId.module.scss"
import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link';
import Navbar from "../../components/Navbar"
import ExerciseItem from "../../components/Exercise/ExerciseItem";
import ExerciseText from "../../components/Exercise/ExerciseText"
import ExerciseButton from "../../components/Exercise/ExerciseButton"
import Timer from "../../components/Exercise/Timer";

import { useState } from "react"
import { useRouter } from "next/router";

import axios from "axios"

const orderToTitle = [
    "Гимнастика", "Упражнение 1", "Упражнение 2", "Упражнение 3", "Контрольная точка"
]


export default function ExercisePage({ oneSession }) {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    // LOGIC PART
    const times = oneSession.map(x => x.time);
    let [idx, setIdx] = useState(0)
    let router = useRouter()
    
    
    const finishExercise = async () => {
        await axios.post("http://localhost:5000/api/user/finish-session/", { "username": session.user.name })
        .then(() => {
            axios.post("http://localhost:5000/api/user/add-done", {
                "username": session.user.name,
                "exerciseIds": oneSession.map(x => x._id)
            })
        }).then(() => {
            router.push('/')
        })
    }

    // RENDER PART


    return <>
        <Navbar />
        <div className={styles.exercise_page}>
            <div className={styles.exercise_page__list}>
                {
                    oneSession.map((x, i) => {
                        return <ExerciseItem title={orderToTitle[i]} exercise={x} itemHeight={150} onClick={() => { setIdx(i) }} focus={idx === i}/>
                    })
                }
            </div>
            <div className={styles.exercise_page__content}>
                <ExerciseText title={orderToTitle[idx]} exercise={oneSession[idx]} content={<>
                    <div className={styles.exercise_page__button_group}>
                        <div className={styles.exercise_page__button_wrapper}>
                            {idx > 0 ? 
                                <ExerciseButton text={"←"} onClick={() => setIdx(idx - 1)} /> 
                                : null}
                        </div>
                        <div className={styles.exercise_page__button_wrapper}>
                            <Timer idx={idx} times={times} />
                        </div>
                        <div className={styles.exercise_page__button_wrapper}>
                            {idx < oneSession.length - 1 ? 
                                <ExerciseButton text={"→"} onClick={() => setIdx(idx + 1)} /> 
                                : <ExerciseButton text={"✓"} onClick={finishExercise} />}
                        </div>
                    </div>
                </>} />
            </div>
        </div>
    </>
}


export async function getServerSideProps(context) {
    // const exerciseDataMethods = require('../../utils/exerciseDataMethods')
    let session = await getSession(context)
    let { intro, main, end } = await (await fetch(`http://localhost:5000/api/exercise/${session.user.name}/get-session`)).json()
    //textData = jsonEscapeForAll(textData)
    const oneSession = [intro, ...main, end]
    return {
        props: {
            session: session,
            oneSession: oneSession
        }
    }
}
