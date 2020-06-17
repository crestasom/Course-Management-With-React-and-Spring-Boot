package com.crestasom.lecturercoursedemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crestasom.lecturercoursedemo.jwt.JwtUtil;
import com.crestasom.lecturercoursedemo.model.User;
import com.crestasom.lecturercoursedemo.security.AuthRequest;
import com.crestasom.lecturercoursedemo.security.AuthResponse;
import com.crestasom.lecturercoursedemo.service.UserService;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
public class HelloResource {

	@Autowired
	UserService userService;
	@Autowired
	JwtUtil jUtil;

	@RequestMapping({ "/hello" })
	public String hello() {
		return "Hello world";
	}

	@PostMapping("/auth")
	public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest) throws Exception {

		User userDetails = userService.findByUserName(authRequest.getUsername(), authRequest.getPassword());
		if (userDetails != null) {
			final String jwt = jUtil.generateToken(userDetails);
			return ResponseEntity.ok(new AuthResponse(jwt, userDetails.getUsername(), userDetails.isAdmin()));
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid Username or password");
		}
	}
}
