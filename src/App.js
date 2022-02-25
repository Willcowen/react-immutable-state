import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [checked, setChecked] = useState(true)
  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    setWorkouts([...workouts, newWorkout]);
  };

  const deleteWorkout = (target) => {
    const workoutsWithoutDeleted = workouts.filter(function (workout) {
      return workout !== target;
    });
    setWorkouts(workoutsWithoutDeleted);
  };

  const completeWorkout = (target) => {
    const completedWorkouts = workouts.map(function (workout) {
      if (workout === target) {
        return { ...workout, done: (workout.done = true) };
      }

      return workout;
    });
    setWorkouts(completedWorkouts);
  };

  const handleChange = () => {
    const allworkouts = [...workouts]
    const completedWorkouts = workouts.filter(workout => workout.done)
    if(!checked) {
    setWorkouts(allworkouts)
    setChecked(true)
    
    }
    else {
      setWorkouts(completedWorkouts)
      setChecked(false)
    }
    console.log(checked)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <div>
        <input type="checkbox" name="toggle" onChange={handleChange}/>
        <label for="toggle">Show Done Only</label>
      </div>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of{" "}
              <strong>
                {workout.reps}x{workout.exercise}
              </strong>{" "}
              with {workout.rest} seconds rest
            </p>
            {!workout.done && (
              <button onClick={(e) => completeWorkout(workout)}>Done</button>
            )}
            {workout.done && <p>✅</p>}
            <button onClick={(e) => deleteWorkout(workout)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
