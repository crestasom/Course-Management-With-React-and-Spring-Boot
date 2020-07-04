package com.crestasom.lecturercoursedemo.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;

import com.crestasom.lecturercoursedemo.model.Course;

public interface CourseRepo extends JpaRepository<Course, Long> {
	Optional<Course> findById(Long id);

	void deleteById(Long id);

	List<Course> findByLecturerUserUsername(String userName);

	@Query(value = "select id from course where description like %:value%", nativeQuery = true)
	List<Integer> searchCoursesByDescription(@PathVariable String value);
}
