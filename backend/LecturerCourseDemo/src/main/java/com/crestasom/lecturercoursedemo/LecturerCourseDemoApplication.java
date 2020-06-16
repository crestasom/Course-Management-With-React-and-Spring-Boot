package com.crestasom.lecturercoursedemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.crestasom.lecturercoursedemo.model.Instructor;
import com.crestasom.lecturercoursedemo.repo.InstructorRepo;

@SpringBootApplication
public class LecturerCourseDemoApplication implements CommandLineRunner {

	@Autowired
	InstructorRepo repo;

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

	}

	
}
