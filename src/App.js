import React from "react";
import ExerciseList from "./Exercise/ExerciseList";
import ExerciseFull from "./Exercise/ExerciseFull";
import exercises from "./dataExample";

function App() {
  return (
    <div style={{display:'flex'}}>
      <ExerciseList exercises = {exercises}></ExerciseList>
      <ExerciseFull/>
    </div>
  );
}

export default App;
