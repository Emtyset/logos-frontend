import React from "react";
import PropTypes from "prop-types";

const styles = {
    li: {
        position: 'relative',
        width: '30%',
        height: 'auto',
        padding: '1rem 1rem .7rem 1rem',
        //border: '1px solid #9DF3C4',
        borderRadius: '20px',
        marginBottom: '.5rem',
        marginLeft: '1rem',
        backgroundColor: '#9DF3C4',
        fontWeight: 'bolder'
    }
}

function ExerciseItem({ exercise}) {
    return (
        <li style = {styles.li}> 
            {exercise.title}<br/>

            <span className = "exText">
                {exercise.text}
                <br/><br/>
            </span>

            <span className = "exTime">
                {exercise.time}
            </span>
        </li>
    )
}

ExerciseItem.propTypes = {
    exercise: PropTypes.object.isRequired
}

export default ExerciseItem