package com.crestasom.lecturercoursedemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crestasom.lecturercoursedemo.model.Course;
import com.crestasom.lecturercoursedemo.model.Instructor;
import com.crestasom.lecturercoursedemo.repo.InstructorRepo;

@Service
public class InstructorService {
	@Autowired
	InstructorRepo iRepo;
	@Autowired
	CoursesService cService;

	public List<Course> findCoursesByInstructorUserName(String userName) {
		return cService.findCoursesByInstructorUserName(userName);
	}

	public Instructor findInstByUserName(String userName) {
		return iRepo.findByUserName(userName);
	}

	public List<Instructor> getInstructors() {
		List<Instructor> instructors = iRepo.findAll();
		return instructors;
	}

	public Instructor save(Instructor instructor) {

		Instructor tempInst = findInstByUserName(instructor.getUserName());
		if (tempInst != null && tempInst.getId() != instructor.getId()) {
			return null;
		}
		return iRepo.save(instructor);
	}

	public void delete(int id) {
		iRepo.deleteById(id);
	}

	public Instructor findInstById(int id) {
		// TODO Auto-generated method stub
		return iRepo.findById(id).get();
	}

}
