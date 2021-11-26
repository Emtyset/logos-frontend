import React from "react";
import ExerciseList from "./Exercise/ExerciseList";
import ExerciseFull from "./Exercise/ExerciseFull";
import exercises from "./dataExample";
import Header from "./Common/Header";

function App() {
  return (
      <div style={{backgroundColor:'#D7FBE8'}}>
          <div style={{display:'flex'}}>
              <Header/>
          </div>
          <div style={{display:'flex'}}>
              <ExerciseList exercises = {exercises}></ExerciseList>
              <ExerciseFull/>
          </div>
      </div>
  );
}

export default App;
