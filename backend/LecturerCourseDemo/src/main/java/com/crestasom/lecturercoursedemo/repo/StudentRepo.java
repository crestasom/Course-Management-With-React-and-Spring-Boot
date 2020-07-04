package com.crestasom.lecturercoursedemo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crestasom.lecturercoursedemo.model.Student;

public interface StudentRepo extends JpaRepository<Student, Integer> {

}
