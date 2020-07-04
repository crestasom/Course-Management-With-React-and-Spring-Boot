package com.crestasom.lecturercoursedemo.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.NumberUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.crestasom.lecturercoursedemo.model.Assignment;
import com.crestasom.lecturercoursedemo.repo.AssignmentRepo;

@Service
public class AssignmentService {
	@Autowired
	private AssignmentRepo repo;
	@Autowired
	HttpServletRequest request;
	@Value("${app.upload.dir:${user.home}}")
	public String uploadDir;
	@Autowired
	CourseService cService;

	@Autowired
	FileStorageService fileService;

	public void save(MultipartFile assignmentFile) {
		Assignment assignment = new Assignment();
		if (!request.getParameter("id").isBlank())
			assignment.setId(Integer.parseInt(request.getParameter("id")));
		assignment.setName(request.getParameter("name"));
		assignment.setDescription(request.getParameter("description"));
		assignment.setDueDate(Date.valueOf(request.getParameter("dueDate")));
		assignment.setFilePath(fileService.storeFile(assignmentFile, "assignments"));
		assignment.setCourse(cService.findById(Integer.parseInt(request.getParameter("courseid"))));
		repo.save(assignment);

	}

	public List<Assignment> getAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	public void deleteById(int id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
	}

}
