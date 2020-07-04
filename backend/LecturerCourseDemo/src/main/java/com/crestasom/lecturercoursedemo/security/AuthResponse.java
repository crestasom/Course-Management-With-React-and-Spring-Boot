package com.crestasom.lecturercoursedemo.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
	private final String jwt;
	private String username;
	private String role;
}
