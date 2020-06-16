package com.crestasom.lecturercoursedemo.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crestasom.lecturercoursedemo.model.Course;

public interface CourseRepo extends JpaRepository<Course, Long> {
	Optional<Course> findById(Long id);
	void deleteById(Long id);
	List<Course> findByInstructorUserName(String userName);
}
