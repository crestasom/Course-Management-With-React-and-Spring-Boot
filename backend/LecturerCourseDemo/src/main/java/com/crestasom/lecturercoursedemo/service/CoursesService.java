package com.crestasom.lecturercoursedemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crestasom.lecturercoursedemo.model.Course;
import com.crestasom.lecturercoursedemo.repo.CourseRepo;

@Service
public class CoursesService {
	@Autowired
	CourseRepo repo;

	@Autowired
	InstructorService iService;

	public void deleteById(long id) {
		repo.deleteById(id);
	}

	public List<Course> findAll() {
			return repo.findAll();
	}
	
	public List<Course> findCoursesByInstructorUserName(String userName) {
			return repo.findByInstructorUserName(userName);
		
	}
	
	public Course findById(long id) {
		return repo.findById(id).get();
	}

	public Course saveCourse(Course c, String userName) {
		c.setInstructor(iService.findInstByUserName(userName));
		repo.save(c);
		return c;
	}
}