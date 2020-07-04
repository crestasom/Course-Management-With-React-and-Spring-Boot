package com.crestasom.lecturercoursedemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.crestasom.lecturercoursedemo.model.Student;
import com.crestasom.lecturercoursedemo.model.User;
import com.crestasom.lecturercoursedemo.repo.StudentRepo;
import com.crestasom.lecturercoursedemo.service.StudentService;
import com.crestasom.lecturercoursedemo.service.UserService;

@SpringBootApplication
public class LecturerCourseDemoApplication implements CommandLineRunner {

	@Autowired
	StudentService service;
	@Autowired
	UserService uService;

	public static void main(String[] args) {
		SpringApplication.run(LecturerCourseDemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		// TODO Auto-generated method stub
		/*
		 * repo.save(new Instructor("som", "Som Shrestha")); repo.save(new
		 * Instructor("ram", "Ram Sharma"));
		 */
		uService.save(new User("som123", "som123", "som@gmail.com", false, "ROLE_LECTURER"));
		uService.save(new User("gita", "gita", "gita@gmail.com", false, "ROLE_LECTURER"));
		uService.save(new User("anu", "anu", "anu@gmail.com", false, "ROLE_LECTURER"));
//		service.saveStudent(new Student("Hari Shrestha", "1", "hari", "hari", "hari@gmail.com"));
//		service.saveStudent(new Student("Sita Sharma", "2", "sita", "sita", "hari@gmail.com"));

	}

}
