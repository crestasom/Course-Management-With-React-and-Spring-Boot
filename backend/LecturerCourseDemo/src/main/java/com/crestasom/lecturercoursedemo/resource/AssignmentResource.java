package com.crestasom.lecturercoursedemo.resource;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.crestasom.lecturercoursedemo.model.Assignment;
import com.crestasom.lecturercoursedemo.service.AssignmentService;
import com.crestasom.lecturercoursedemo.service.FileStorageService;

@RestController
@RequestMapping("assignments")
public class AssignmentResource {
	private static Logger log = LoggerFactory.getLogger(AssignmentResource.class);
	@Autowired
	AssignmentService service;
	@Autowired
	FileStorageService fileService;

	@GetMapping("")
	public List<Assignment> getAll() {
		return service.getAll();
	}

	@PostMapping(value = "/add")
	public void addAssignment(@RequestBody MultipartFile file) {
		service.save(file);
	}

	@GetMapping("/getfile")
	public ResponseEntity<Resource> downloadFile(@RequestParam("path") String filePath,
			HttpServletRequest request) {
		// Load file as Resource
		Resource resource = fileService.loadFileAsResource(filePath);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			log.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
}