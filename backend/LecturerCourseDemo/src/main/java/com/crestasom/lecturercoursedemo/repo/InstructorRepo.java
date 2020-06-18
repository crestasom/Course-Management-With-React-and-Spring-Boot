package com.crestasom.lecturercoursedemo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crestasom.lecturercoursedemo.model.Instructor;

public interface InstructorRepo extends JpaRepository<Instructor, Integer> {
	Instructor findByUserName(String userName);
}
