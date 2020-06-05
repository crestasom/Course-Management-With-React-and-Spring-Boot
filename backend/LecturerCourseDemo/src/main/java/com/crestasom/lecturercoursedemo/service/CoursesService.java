package com.crestasom.lecturercoursedemo.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crestasom.lecturercoursedemo.model.Instructor;
import com.crestasom.lecturercoursedemo.model.Course;
import com.crestasom.lecturercoursedemo.repo.CourseRepo;
import com.crestasom.lecturercoursedemo.repo.InstructorRepo;

@Service
public class CoursesService {
	@Autowired
	CourseRepo repo;
	@Autowired
	InstructorRepo iRepo;

	public void deleteById(long id) {
		repo.deleteById(id);
	}

	public List<Course> findAll(String userName) {
		if (!userName.isBlank()) {
			return repo.findByInstructorUserName(userName);
		} else {
			return repo.findAll();
		}
	}

	public Course findById(long id) {
		return repo.findById(id).get();
	}

	public Instructor findInstByUserName(String userName) {
		return iRepo.findByUserName(userName);
	}

	public List<Instructor> getInstructors() {
		List<Instructor> instructors = iRepo.findAll();
		return instructors;
	}

	public Course saveCourse(Course c, String userName) {
		c.setInstructor(findInstByUserName(userName));
		repo.save(c);
		return c;
	}
}