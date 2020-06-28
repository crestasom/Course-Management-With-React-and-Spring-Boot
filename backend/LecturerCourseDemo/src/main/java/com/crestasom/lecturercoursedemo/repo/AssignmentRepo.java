package com.crestasom.lecturercoursedemo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crestasom.lecturercoursedemo.model.Assignment;

public interface AssignmentRepo extends JpaRepository<Assignment, Integer> {

}
