import React from "react"
import PropTypes from "prop-types"
import ExerciseItem from "./ExerciseItem"

const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0

    }
}

function ExerciseList(props) {
    return (
        <ul style = {styles.ul} >
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