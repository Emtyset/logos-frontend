import React from "react";
import './Exercise.css'
import exercises from "../dataExample";

function ExerciseFull(){
    let [idEx, setIdEx] = React.useState(0)
    let exercise = exercises[idEx]
    return (
        <div className='exercise-full'>
            <h1>{exercise.title}</h1>
            <p>{exercise.text}</p>
            <div className='button-group'>
                {idEx > 0 ? <button onClick={() => setIdEx(idEx - 1)}>Предыдущий</button> : null}
                <span>{exercise.time + 's'}</span>
                {idEx < exercises.length - 1 ? <button onClick={() => setIdEx(idEx + 1)}>Следующий</button> : null}
            </div>
        </div>
    )
}

export default ExerciseFull