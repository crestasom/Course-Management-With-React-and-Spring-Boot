package com.crestasom.lecturercoursedemo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crestasom.lecturercoursedemo.model.Course;
import com.crestasom.lecturercoursedemo.model.Instructor;
import com.crestasom.lecturercoursedemo.service.InstructorService;

@RestController
@RequestMapping("instructors")
public class InstructorResource {

	@Autowired
	InstructorService iService;

	@GetMapping("")
	public List<Instructor> getAllInstructors() {
		return iService.getInstructors();
	}

	@PostMapping("/save")
	public ResponseEntity<Instructor> save(@RequestBody Instructor instructor) {
		
		Instructor i = iService.save(instructor);
		if (i != null) {
			return ResponseEntity.ok().body(i);
		} else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteInstructor(@PathVariable int id) {
		iService.delete(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/{username}")
	public Instructor getInstructor(@PathVariable String username) {
		return iService.findInstByUserName(username);
	}
	@GetMapping("/id/{id}")
	public Instructor getInstructorByID(@PathVariable int id) {
		return iService.findInstById(id);
	}
}
