package com.crestasom.lecturercoursedemo.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crestasom.lecturercoursedemo.model.Semester;
import com.crestasom.lecturercoursedemo.service.SemesterService;

@RestController
@RequestMapping("semester")
public class SemesterResource {
	@Autowired
	private SemesterService service;

	@GetMapping
	public List<Semester> getAll() {
		return service.getAll();
	}

	@PostMapping("")
	public void save(@RequestBody Semester sem) {
		service.save(sem);
	}

	@GetMapping("/{id}")
	public Semester getById(@PathVariable int id) {
		return service.findById(id);
	}
	

	@PostMapping("/map")
	public void mapSubject(@RequestBody Semester sem) {
		System.out.println(sem);
		service.save(sem);
	}

}
