package com.crestasom.lecturercoursedemo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.crestasom.lecturercoursedemo.model.Course;
import com.crestasom.lecturercoursedemo.model.Instructor;
import com.crestasom.lecturercoursedemo.service.CoursesService;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class CourseResource {

	@Autowired
	private CoursesService courseManagementService;

	@GetMapping("/instructors/{username}/courses")
	public List<Course> getAllCoursesInstr(@PathVariable String username) {
		return courseManagementService.findAll(username);
	}

	@GetMapping("/courses")
	public List<Course> getAllCourses() {
		return courseManagementService.findAll("");
	}

	@GetMapping("instructors")
	public List<Instructor> getAllInstructors() {
		return courseManagementService.getInstructors();
	}

	@DeleteMapping("/courses/{id}")
	public ResponseEntity<Void> deleteCourse(@PathVariable long id) {
		courseManagementService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/courses/{id}")
	public Course getCourse(@PathVariable long id) {
		return courseManagementService.findById(id);
	}

	@PutMapping("/instructors/{userName}/courses/{id}")
	public ResponseEntity<Course> updateCourse(@PathVariable String userName, @PathVariable long id,
			@RequestBody Course course) {
		Course courseUpdated = courseManagementService.saveCourse(course, userName);
		return new ResponseEntity<Course>(courseUpdated, HttpStatus.OK);
	}

	@PostMapping("/instructors/{userName}/courses")
	public ResponseEntity<Course> createCourse(@PathVariable String userName, @RequestBody Course course) {

		Course createdCourse = courseManagementService.saveCourse(course, userName);
		return new ResponseEntity<Course>(createdCourse, HttpStatus.OK);
	}
}
