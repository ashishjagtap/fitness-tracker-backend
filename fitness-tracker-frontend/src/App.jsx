import { useEffect, useState } from "react";
import { API_URL } from "./api";

function App() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/workouts`)
            .then((response) => response.json())
            .then((data) => setWorkouts(data))
            .catch((error) => console.error("Error fetching workouts:", error));
    }, []);

    return (
        <div>
            <h1>Fitness Tracker</h1>
            <ul>
                {workouts.length === 0 ? (
                    <p>No workouts logged yet.</p>
                ) : (
                    workouts.map((workout) => (
                        <li key={workout.id}>
                            {workout.name} - {workout.duration} mins
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default App;