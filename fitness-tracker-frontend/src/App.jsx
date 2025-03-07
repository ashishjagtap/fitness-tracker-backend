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

    const handleDelete = (id) => {
        fetch(`${API_URL}/api/workouts/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            setWorkouts(workouts.filter(workout => workout.id !== id));
        })
        .catch((error) => console.error("Error deleting workout:", error));
    };

return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <h1 className="text-2xl font-bold text-green-500">Fitness Tracker</h1>

        {/* Workout Form */}
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mb-6"
        >
            <div className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    name="exercise"
                    placeholder="Exercise Name"
                    value={formData.exercise}
                    onChange={handleChange}
                    required
                    className="border rounded-lg px-4 py-2 w-full"
                />
                <input
                    type="number"
                    name="sets"
                    placeholder="Sets"
                    value={formData.sets}
                    onChange={handleChange}
                    required
                    className="border rounded-lg px-4 py-2 w-full"
                />
                <input
                    type="number"
                    name="reps"
                    placeholder="Reps"
                    value={formData.reps}
                    onChange={handleChange}
                    required
                    className="border rounded-lg px-4 py-2 w-full"
                />
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight (kg)"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    className="border rounded-lg px-4 py-2 w-full"
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="border rounded-lg px-4 py-2 w-full"
                />
            </div>

            <button
                type="submit"
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
            >
                {editingWorkout ? "Update Workout" : "Add Workout"}
            </button>
        </form>

        {/* Workout List */}
        <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Workout Log</h2>
            {workouts.length === 0 ? (
                <p className="text-gray-500">No workouts logged yet.</p>
            ) : (
                <ul className="space-y-4">
                    {workouts.map((workout) => (
                        <li
                            key={workout.id}
                            className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center"
                        >
                            <div>
                                <p className="text-lg font-semibold">{workout.exercise}</p>
                                <p className="text-gray-600">
                                    {workout.sets} sets x {workout.reps} reps
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(workout)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(workout.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);
}

export default App;
