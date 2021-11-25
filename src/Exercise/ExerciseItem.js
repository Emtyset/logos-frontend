import React from "react";
import PropTypes from "prop-types";
import './Exercise.css'

function ExerciseItem({ exercise }) {
    return (
        <li className='exercise-item'> 
            {exercise.title}<br/>

            <span className = "exText">
                {exercise.text}
                <br/><br/>
            </span>

            <span className = "exTime">
                {'≤ ' + exercise.time + ' sec'}
            </span>
        </li>
    )
}

ExerciseItem.propTypes = {
    exercise: PropTypes.object.isRequired
}

export default ExerciseItem