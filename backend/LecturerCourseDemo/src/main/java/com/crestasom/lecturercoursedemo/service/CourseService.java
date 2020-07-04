package com.crestasom.lecturercoursedemo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crestasom.lecturercoursedemo.model.Course;
import com.crestasom.lecturercoursedemo.model.Semester;
import com.crestasom.lecturercoursedemo.repo.CourseRepo;

@Service
public class CourseService {
	@Autowired
	CourseRepo repo;
	@Autowired
	SemesterService semService;

	@Autowired
	LecturerService iService;

	public void deleteById(long id) {
		repo.deleteById(id);
	}

	public List<Course> findAll() {
		return repo.findAll();
	}

	public List<Course> findAll(int semId) {
		List<Course> cList = findAll();
		final List<Course> data = new ArrayList<>();
		Semester sem = semService.findById(semId);
		if (sem == null) {
			return cList;
		} else {
			cList.forEach(c -> {
				if (sem.getCourseList().contains(c)) {
					c.setSelected(true);
				}
				data.add(c);
			});
		}
		return data;

	}

	public List<Course> findCoursesByLecturerUserName(String userName) {
		return repo.findByLecturerUserUsername(userName);

	}

	public Course findById(long id) {
		return repo.findById(id).get();
	}

	public Course saveCourse(Course c, String userName) {
		c.setLecturer(iService.findInstByUserName(userName));
		repo.save(c);
		return c;
	}

	public Course saveCourse(Course c) {
		repo.save(c);
		return c;
	}

	public List<Integer> searchCourses(String value) {
		// TODO Auto-generated method stub
		return repo.searchCoursesByDescription(value);
	}
}