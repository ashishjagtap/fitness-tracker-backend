package com.example.myfitnesstracker.controllers;

import com.example.myfitnesstracker.models.WorkoutLog;
import com.example.myfitnesstracker.services.WorkoutLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
//@CrossOrigin(origins = "*")
public class WorkoutLogController {

    @Autowired
    private WorkoutLogService workoutLogService;

    // GET all workout logs
    @GetMapping
    public List<WorkoutLog> getAllWorkouts() {
        return workoutLogService.getAllWorkouts();
    }

    // POST a new workout log
    @PostMapping
    public WorkoutLog addWorkout(@RequestBody WorkoutLog workoutLog) {
        return workoutLogService.saveWorkout(workoutLog);
    }

    // PUT - Update an existing workout log
    @PutMapping("/{id}")
    public WorkoutLog updateWorkout(@PathVariable Long id, @RequestBody WorkoutLog workoutDetails) {
        return workoutLogService.updateWorkout(id, workoutDetails);
    }


}
