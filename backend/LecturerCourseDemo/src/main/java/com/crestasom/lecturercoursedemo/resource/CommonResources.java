package com.crestasom.lecturercoursedemo.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crestasom.lecturercoursedemo.model.Course;
import com.crestasom.lecturercoursedemo.model.Lecturer;
import com.crestasom.lecturercoursedemo.service.CourseService;
import com.crestasom.lecturercoursedemo.service.LecturerService;

@RestController
public class CommonResources {
	@Autowired
	CourseService cService;
	@Autowired
	LecturerService lService;

	@GetMapping("/get-all-courses")
	public List<Course> getCourseList() {
		return cService.findAll();
	}

	@GetMapping("/get-all-lecturers")
	public List<Lecturer> getLecturerList() {
		return lService.getLecturers();
	}
}
