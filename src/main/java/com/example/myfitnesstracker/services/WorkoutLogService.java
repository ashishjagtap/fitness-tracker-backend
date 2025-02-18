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
}
