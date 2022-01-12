import ExerciseItem from "./ExerciseItem"
import styles from '../../styles/Exercise/ExerciseList.module.scss'



export default function ExerciseList({exSet, tiSet}) {
    let intro = exSet.intro
    let main = exSet.main
    let ending = exSet.ending

    let introTi = tiSet.intro
    let mainTi = tiSet.main
    let endingTi = tiSet.ending
    return (
        <ul className={styles.exercise_list}>
            <ExerciseItem title={"Гимнастика"} text={intro[0][0]} time={introTi}/>
            {
                main.map((x, idx) => {
                    return <ExerciseItem title={`Упражнение ${idx + 1}`} text={x[0][0]} time={mainTi[idx]}/>
                })
            }
            <ExerciseItem title={"Контрольная точка"} text={ending[0][0]} time={endingTi}/>
        </ul>
    )
}
