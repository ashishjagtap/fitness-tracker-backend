package com.example.myfitnesstracker.repositories;

import com.example.myfitnesstracker.models.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Long> {
}
