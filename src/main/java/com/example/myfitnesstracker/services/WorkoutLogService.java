package com.example.myfitnesstracker.services;

import com.example.myfitnesstracker.models.WorkoutLog;
import com.example.myfitnesstracker.repositories.WorkoutLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutLogService {

    @Autowired
    private WorkoutLogRepository workoutLogRepository;

    // Get all workout logs
    public List<WorkoutLog> getAllWorkouts() {
        return workoutLogRepository.findAll();
    }

    // Save a new workout log
    public WorkoutLog saveWorkout(WorkoutLog workoutLog) {
        return workoutLogRepository.save(workoutLog);
    }

    // Update an existing workout log
    public WorkoutLog updateWorkout(Long id, WorkoutLog updatedWorkout) {
        return workoutLogRepository.findById(id).map(workout -> {
            workout.setExercise(updatedWorkout.getExercise());
            workout.setSets(updatedWorkout.getSets());
            workout.setReps(updatedWorkout.getReps());
            workout.setWeight(updatedWorkout.getWeight());
            workout.setDate(updatedWorkout.getDate());
            return workoutLogRepository.save(workout);
        }).orElseThrow(() -> new RuntimeException("Workout not found with id: " + id));
    }
    // Delete a workout log by ID
    public void deleteWorkout(Long id) {
        workoutLogRepository.deleteById(id);
    }


}
