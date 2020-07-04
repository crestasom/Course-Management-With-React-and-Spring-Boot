package com.crestasom.lecturercoursedemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.crestasom.lecturercoursedemo.model.Student;
import com.crestasom.lecturercoursedemo.repo.StudentRepo;
import com.crestasom.lecturercoursedemo.repo.UserRepo;

@Service
public class StudentService {
	@Autowired
	StudentRepo repo;

	@Autowired
	PasswordEncoder encoder;
	@Autowired
	UserService uService;

	public void saveStudent(Student s) {
		uService.save(s.getUser());
		repo.save(s);
	}
}
