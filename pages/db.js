import { getSession } from "next-auth/react"

import ExerciseItem from "../components/Exercise/ExerciseItem"
import Navbar from "../components/Navbar"
import FormCenter from "../components/FormCenter"

import styled from "styled-components"

const Wrapper = styled.div`
    margin-top: 1rem;
`

const orderToTitle = [
    "Гимнастика", "Упражнение", "Контрольная точка"
]

export default function DataBasePage({ exercises }) {
    if (exercises && exercises.length > 0) {
        return <>
            <Navbar />

            <div className="container">
                <Wrapper>
                    {
                        exercises.map(exercise => {
                            return <ExerciseItem title={orderToTitle[exercise.order]} exercise={exercise} />
                        })
                    }
                </Wrapper>
            </div>
        </>
    }

    return <>
        <Navbar />
        <FormCenter content={<>
            <div>
                Похоже здесь пока ничего нет.
            </div>
        </>} />
    </>
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session || !session.user) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    //const exercises = await (await fetch("http://localhost:5000/api/exercise/get-all")).json()

    const user = session.user
    const { exerciseIds } = await (await fetch(`http://localhost:5000/api/user/${user.name}/get-exercises`)).json()

    console.log(exerciseIds)
    if (!exerciseIds) {
        return {
            props: {

            }
        }
    }

    const exercises = []
    for (const exerciseId of exerciseIds) {
        try {
            const exercise = await (await fetch(`http://localhost:5000/api/exercise/${exerciseId}`)).json()
            exercises.push(exercise)
        } catch {

        }
    }

    return {
        props: {
            exercises
        }
    }
}