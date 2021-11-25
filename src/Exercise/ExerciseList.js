import React from "react"
import PropTypes from "prop-types"
import ExerciseItem from "./ExerciseItem"
import './Exercise.css'


function ExerciseList(props) {
    return (
        <ul className='exercise-list'>
            {props.exercises.map(exercise => {
                return <ExerciseItem exercise = {exercise} key = {exercise.id}></ExerciseItem>
            })}
        </ul>
    )
}

ExerciseList.propTypes = {
    exercises: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ExerciseList