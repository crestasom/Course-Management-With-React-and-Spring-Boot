package com.crestasom.lecturercoursedemo.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
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
	@Autowired
	PasswordEncoder en;

	@PostMapping("/auth")
	public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest) throws Exception {
		User userDetails = userService.findByUserName(authRequest.getUsername(), authRequest.getPassword());
		if (userDetails != null) {
			final String jwt = jUtil.generateToken(userDetails);
			AuthResponse res = new AuthResponse(jwt, userDetails.getUsername(), userDetails.getRole());
			// AuthResponse res = new AuthResponse(jwt, userDetails.getUsername(), false);
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

	@GetMapping("/users/get/{username}")
	public User getUserByUserName(@PathVariable String username) {
		return userService.findByUserName(username);
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> delete(@PathVariable int id) {
		if (userService.delete(id)) {
			return ResponseEntity.ok(null);
		} else {
			return ResponseEntity.ok("cannot delete admin account");
		}
	}

	@GetMapping("users/en-pass")
	@ResponseBody
	public String encryptPassword() {
		userService.getAllUsers().forEach(user -> {
			user.setPassword(en.encode(user.getPassword()));
			System.out.println(user);
			userService.save(user);
		});

		return "All Password encoded successfully";
	}
}
