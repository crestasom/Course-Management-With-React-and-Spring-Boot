package com.crestasom.lecturercoursedemo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crestasom.lecturercoursedemo.model.Lecturer;

public interface LecturerRepo extends JpaRepository<Lecturer, Integer> {
	Lecturer findByUserUsername(String userName);
}
