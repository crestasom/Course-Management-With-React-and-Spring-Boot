package com.crestasom.lecturercoursedemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crestasom.lecturercoursedemo.model.Instructor;
import com.crestasom.lecturercoursedemo.repo.InstructorRepo;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RequestMapping("instructor/")
public class InstructorResource {

	@Autowired
	InstructorRepo repo;

	@PostMapping("/save")
	public void save(@RequestBody Instructor instructor) {
		repo.save(instructor);
	}
}
