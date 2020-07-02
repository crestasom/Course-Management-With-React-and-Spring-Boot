package com.crestasom.lecturercoursedemo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crestasom.lecturercoursedemo.model.Semester;

public interface SemesterRepo extends JpaRepository<Semester, Integer> {

}
