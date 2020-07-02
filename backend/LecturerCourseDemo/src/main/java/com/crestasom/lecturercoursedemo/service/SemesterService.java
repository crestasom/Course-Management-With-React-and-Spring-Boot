package com.crestasom.lecturercoursedemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crestasom.lecturercoursedemo.model.Course;
import com.crestasom.lecturercoursedemo.model.Semester;
import com.crestasom.lecturercoursedemo.repo.SemesterRepo;

@Service
public class SemesterService {
	@Autowired
	SemesterRepo repo;

	public void save(Semester sem) {
		repo.save(sem);
	}

	public Semester findById(int id) {
		Optional<Semester> sem = repo.findById(id);
		return sem.isEmpty() ? null : sem.get();
	}

	public List<Semester> getAll() {
		return repo.findAll();
	}

}
