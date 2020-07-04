package com.crestasom.lecturercoursedemo.resource;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.crestasom.lecturercoursedemo.model.Course;
import com.crestasom.lecturercoursedemo.service.CourseService;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
@RequestMapping("courses")
public class CourseResource {

	@Autowired
	private CourseService courseManagementService;

	@GetMapping("")
	public List<Course> getAllCourses() {
		return courseManagementService.findAll();
	}

	@GetMapping("/sem/{id}")
	public List<Course> getAllCoursesWithSemMapping(@PathVariable int id) {
		return courseManagementService.findAll(id);
	}

	@GetMapping("/list/{username}")
	public List<Course> getAllCoursesInstr(@PathVariable String username) {
		return courseManagementService.findCoursesByLecturerUserName(username);
	}

	@GetMapping("/search/{value}")
	public List<Integer> searchCourse(@PathVariable String value) {
		return courseManagementService.searchCourses(value);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCourse(@PathVariable long id) {
		courseManagementService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/{id}")
	public Course getCourse(@PathVariable long id) {
		return courseManagementService.findById(id);
	}

	@PutMapping("update/{userName}")
	public ResponseEntity<Course> updateCourse(@PathVariable String userName, @RequestBody Course course) {
		Course courseUpdated = courseManagementService.saveCourse(course, userName);
		return new ResponseEntity<Course>(courseUpdated, HttpStatus.OK);
	}

	@PostMapping("/save/{userName}")
	public ResponseEntity<Course> createCourse(@PathVariable String userName, @RequestBody Course course) {

		Course createdCourse = courseManagementService.saveCourse(course, userName);
		return new ResponseEntity<Course>(createdCourse, HttpStatus.OK);
	}

	@PostMapping("/save")
	public ResponseEntity<Course> createCourseWithOutInstructor(@RequestBody Course course) {

		Course createdCourse = courseManagementService.saveCourse(course);
		return new ResponseEntity<Course>(createdCourse, HttpStatus.OK);
	}
}
