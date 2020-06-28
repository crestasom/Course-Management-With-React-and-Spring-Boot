package com.crestasom.lecturercoursedemo.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.crestasom.lecturercoursedemo.jwt.JwtUtil;
import com.crestasom.lecturercoursedemo.model.User;
import com.crestasom.lecturercoursedemo.security.AuthRequest;
import com.crestasom.lecturercoursedemo.security.AuthResponse;
import com.crestasom.lecturercoursedemo.service.UserService;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
public class UserResource {

	@Autowired
	UserService userService;
	@Autowired
	JwtUtil jUtil;

	@PostMapping("/auth")
	public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest) throws Exception {
		User userDetails = userService.findByUserName(authRequest.getUsername(), authRequest.getPassword());
		if (userDetails != null) {
			final String jwt = jUtil.generateToken(userDetails);
			AuthResponse res = new AuthResponse(jwt, userDetails.getUsername(), userDetails.isAdmin());
			System.out.println(res);
			return ResponseEntity.ok(res);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid Username or password");
		}
	}

	@PostMapping("/auth/check-password")
	public boolean checkPassword(@RequestBody AuthRequest authRequest) {
		return userService.checkPassword(authRequest);
	}

	@GetMapping("/users")
	public List<User> getUsers() {
		return userService.getAllUsers();
	}

	@PostMapping("/users")
	public User save(@RequestBody User user) {
		return userService.save(user);
	}

	@GetMapping("/users/{id}")
	public User getUserById(@PathVariable int id) {
		return userService.getUserById(id);
	}
	
	@DeleteMapping("/users/{id}")
	public void delete(@PathVariable int id) {
		 userService.delete(id);
	}
}
