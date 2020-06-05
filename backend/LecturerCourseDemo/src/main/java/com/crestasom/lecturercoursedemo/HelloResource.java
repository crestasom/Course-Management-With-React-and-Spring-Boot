package com.crestasom.lecturercoursedemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crestasom.lecturercoursedemo.jwt.JwtUtil;
import com.crestasom.lecturercoursedemo.security.AuthRequest;
import com.crestasom.lecturercoursedemo.security.AuthResponse;

@RestController
public class HelloResource {

	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	UserDetailsService userdetailService;
	@Autowired
	JwtUtil jUtil;

	@RequestMapping({ "/hello" })
	public String hello() {
		return "Hello world";
	}

	@PostMapping("/auth")
	public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest) throws Exception {
		try {
			authManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
		} catch (BadCredentialsException ex) {
			throw new Exception("Incorrect username or password", ex);
		}
		final UserDetails userDetails = userdetailService.loadUserByUsername(authRequest.getUserName());
		final String jwt = jUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthResponse(jwt));
	}
}
