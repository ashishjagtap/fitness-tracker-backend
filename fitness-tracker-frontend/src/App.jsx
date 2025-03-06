import { useEffect, useState } from "react";
import { API_URL } from "./api";

function App() {
    const [workouts, setWorkouts] = useState([]);
    const [formData, setFormData] = useState({
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
        date: ""
    });
    const [editingWorkout, setEditingWorkout] = useState(null);


    // Fetch workouts when the component loads
    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = () => {
        fetch(`${API_URL}/api/workouts`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Workouts:", data);
                setWorkouts(data);
            })
            .catch((error) => console.error("Error fetching workouts:", error));
    };

    // Handle form input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingWorkout) {
                // Update existing workout
                fetch(`${API_URL}/api/workouts/${editingWorkout.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                })
                .then(response => response.json())
                .then(updatedWorkout => {
                    setWorkouts(workouts.map(w => w.id === updatedWorkout.id ? updatedWorkout : w));
                    setEditingWorkout(null);
                    setFormData({ exercise: "", sets: "", reps: "", weight: "", date: "" });
                })
                .catch(error => console.error("Error updating workout:", error));
            } else {

                fetch(`${API_URL}/api/workouts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Workout added:", data);
                    setFormData({ exercise: "", sets: "", reps: "", weight: "", date: "" }); // Reset form
                    fetchWorkouts(); // Refresh workout list
                })
                .catch((error) => console.error("Error adding workout:", error));
                }

    };
    const handleEdit = (workout) => {
        setEditingWorkout(workout);
        setFormData({
            exercise: workout.exercise,
            sets: workout.sets,
            reps: workout.reps,
            weight: workout.weight,
            date: workout.date,
        });
    };

    return (
        <div>
            <h1>Fitness Tracker</h1>

            {/* Workout Form */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="exercise"
                    placeholder="Exercise Name"
                    value={formData.exercise}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="sets"
                    placeholder="Sets"
                    value={formData.sets}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="reps"
                    placeholder="Reps"
                    value={formData.reps}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight (kg)"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <button type="submit">
                    {editingWorkout ? "Update Workout" : "Add Workout"}
                </button>

            </form>

            {/* Workout List */}
            <ul>
                {workouts.length === 0 ? (
                    <p>No workouts logged yet.</p>
                ) : (
                    workouts.map((workout) => (
                        <li key={workout.id}>
                            {workout.exercise} - {workout.sets} sets x {workout.reps} reps
                            <button onClick={() => handleEdit(workout)}>Edit</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default App;
