import ExerciseList from '../../components/Exercise/ExerciseList'
import styles from "../../styles/Exercise/exId.module.scss"
import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link';
import ExerciseFull from '../../components/Exercise/ExerciseFull';


export default function ExercisePage({exSet, tiSet}) {
    const { data: session, status } = useSession()
	const loading = status === 'loading'
    return <>
        <div className={styles.exercise_part}>
            <ExerciseList exSet={exSet} tiSet={tiSet}/>
            <ExerciseFull exSet={exSet} tiSet={tiSet} username={session.user.name}/>
        </div>
    </>
}

function jsonEscapeForAll(exSet){
    function jsonEscape(str)  {
        return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
    }
    
    let intro = exSet.intro
    let main = exSet.main
    let ending = exSet.ending

    //console.log(intro, main, ending)

    let mapper = x => {
        return x.map(y => {
            return jsonEscape(y)
        })
    }

    //intro = intro.map(mapper)
    main = main.map(x => x.map(mapper))
    ending = ending.map(mapper)

    return {
        intro,
        main,
        ending
    }
}


export async function getServerSideProps(context) {
    // const exerciseDataMethods = require('../../utils/exerciseDataMethods')
    let session = await getSession(context)
    let {textData, timeData} = await (await fetch("http://localhost:5000/api/exercise/getOneSession")).json()
    textData = jsonEscapeForAll(textData)
    
    return {
        props: {
            session: session,
            exSet: textData,
            tiSet: timeData
        }
    }
}
