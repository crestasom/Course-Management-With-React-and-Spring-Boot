package com.crestasom.lecturercoursedemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crestasom.lecturercoursedemo.model.User;
import com.crestasom.lecturercoursedemo.repo.UserRepo;

@Service
public class UserService {
	@Autowired
	UserRepo repo;

	public User findByUserName(String userName) {
		return repo.findByUserName(userName);
	}
}
