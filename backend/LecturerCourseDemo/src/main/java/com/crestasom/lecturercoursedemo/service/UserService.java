package com.crestasom.lecturercoursedemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.crestasom.lecturercoursedemo.model.User;
import com.crestasom.lecturercoursedemo.repo.UserRepo;

@Service
public class UserService {
	@Autowired
	UserRepo repo;
	@Autowired
	PasswordEncoder encoder;

	public User findByUserName(String userName, String password) {
		User user = repo.findByUserName(userName);
		if (user != null && encoder.matches(password, user.getPassword())) {
			return user;
		} else {
			return null;
		}
	}

	public User findByUserName(String userName) {
		return repo.findByUserName(userName);

	}
}
